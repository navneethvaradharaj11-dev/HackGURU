import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/student_profile.dart';
import '../models/event.dart';
import '../models/recommendation.dart';

class ApiService {
  // Use http://10.0.2.2:5000/api for Android Emulator, http://localhost:5000/api for Desktop/Web
  static const String baseUrl = 'http://localhost:5000/api';
  static String? _token;

  static void setToken(String token) {
    _token = token;
  }

  static Map<String, String> get _headers => {
        'Content-Type': 'application/json',
        if (_token != null) 'Authorization': 'Bearer $_token',
      };

  static Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final res = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: _headers,
        body: jsonEncode({'email': email, 'password': password}),
      );
      final data = jsonDecode(res.body);
      if (data['token'] != null) setToken(data['token']);
      return data;
    } catch (e) {
      return {
        'token': 'demo-flutter-jwt-token',
        'student': {
          'fullName': 'Aarav Sharma',
          'collegeName': 'IIT Bombay',
          'branch': 'Computer Science',
          'careerGoal': 'AI Research Scientist',
        }
      };
    }
  }

  static Future<Map<String, dynamic>> getDashboard() async {
    try {
      final res = await http.get(Uri.parse('$baseUrl/dashboard'), headers: _headers);
      return jsonDecode(res.body);
    } catch (e) {
      return {
        'stats': {'savedEvents': 4, 'registeredEvents': 2, 'recommendationsCount': 8},
        'upcomingDeadlines': [
          {'title': 'Smart India Hackathon 2026', 'deadline': 'In 2 days', 'category': 'Hackathon'},
          {'title': 'Generative AI Masterclass', 'deadline': 'In 5 days', 'category': 'Workshop'}
        ]
      };
    }
  }

  static Future<List<RecommendationItem>> getRecommendations() async {
    try {
      final res = await http.get(Uri.parse('$baseUrl/recommendations'), headers: _headers);
      final data = jsonDecode(res.body);
      final list = (data['data'] is List ? data['data'] : data) as List;
      return list.map((e) => RecommendationItem.fromJson(e)).toList();
    } catch (e) {
      return [
        RecommendationItem(
          eventId: 'rec-1',
          score: 98.0,
          matchReason: 'Matched with your AI Research goal & Python proficiency.',
          recommendedRole: 'Lead AI Engineer',
          event: EventItem(
            id: 'rec-1',
            title: 'IIT Bombay TechFest Hackathon 2026',
            description: '48-hour national AI hackathon building autonomous agent workflows.',
            category: 'Hackathon',
            location: 'Mumbai, India',
            organizer: 'IIT Bombay',
            startDate: '2026-09-20',
            endDate: '2026-09-22',
            registrationDeadline: '2026-09-15',
            domainTags: ['Generative AI', 'Agentic Workflows'],
            skillsRequired: ['Python', 'PyTorch', 'LangChain'],
            difficultyLevel: 'ADVANCED',
          ),
        )
      ];
    }
  }

  static Future<List<EventItem>> getEvents() async {
    try {
      final res = await http.get(Uri.parse('$baseUrl/events'), headers: _headers);
      final data = jsonDecode(res.body);
      final list = (data['data'] is List ? data['data'] : data) as List;
      return list.map((e) => EventItem.fromJson(e)).toList();
    } catch (e) {
      return [
        EventItem(
          id: 'ev-1',
          title: 'Smart India Hackathon Regional Round',
          description: 'Nationwide competition solving societal problem statements.',
          category: 'Hackathon',
          location: 'Bengaluru, India',
          organizer: 'Ministry of Education',
          startDate: '2026-10-05',
          endDate: '2026-10-07',
          registrationDeadline: '2026-09-25',
          domainTags: ['Smart Cities', 'AgriTech'],
          skillsRequired: ['Full Stack', 'Cloud'],
          difficultyLevel: 'INTERMEDIATE',
        )
      ];
    }
  }

  static Future<void> logInteraction(String eventId, String action) async {
    try {
      await http.post(
        Uri.parse('$baseUrl/interactions'),
        headers: _headers,
        body: jsonEncode({'eventId': eventId, 'action': action}),
      );
    } catch (_) {}
  }
}
