import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/student_profile.dart';
import '../models/event.dart';
import '../models/recommendation.dart';
import '../models/ai_usage_stats.dart';

class AceApiClient {
  final String baseUrl;
  String? _jwtToken;

  AceApiClient({this.baseUrl = 'http://localhost:5000/api', String? initialToken}) {
    _jwtToken = initialToken;
  }

  void setAuthToken(String token) {
    _jwtToken = token;
  }

  Map<String, String> _headers() {
    return {
      'Content-Type': 'application/json',
      if (_jwtToken != null) 'Authorization': 'Bearer $_jwtToken',
    };
  }

  // Auth: Login
  Future<Map<String, dynamic>> login(String email, String password) async {
    final res = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: _headers(),
      body: jsonEncode({'email': email, 'password': password}),
    );
    final data = jsonDecode(res.body);
    if (res.statusCode == 200 && data['token'] != null) {
      setAuthToken(data['token']);
    }
    return data;
  }

  // Auth: Register Student
  Future<Map<String, dynamic>> register(StudentProfile profile, String password) async {
    final payload = profile.toJson();
    payload['password'] = password;
    final res = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: _headers(),
      body: jsonEncode(payload),
    );
    final data = jsonDecode(res.body);
    if (res.statusCode == 201 && data['token'] != null) {
      setAuthToken(data['token']);
    }
    return data;
  }

  // Dashboard Aggregated Payload
  Future<Map<String, dynamic>> getDashboard() async {
    final res = await http.get(Uri.parse('$baseUrl/dashboard'), headers: _headers());
    return jsonDecode(res.body);
  }

  // Recommendations: Get AI feed
  Future<List<RecommendationItem>> getRecommendations() async {
    final res = await http.get(Uri.parse('$baseUrl/recommendations'), headers: _headers());
    final data = jsonDecode(res.body);
    final list = (data['data'] is List ? data['data'] : data) as List;
    return list.map((item) => RecommendationItem.fromJson(item)).toList();
  }

  // Recommendations: Trigger LLM Refresh
  Future<Map<String, dynamic>> refreshRecommendations() async {
    final res = await http.post(Uri.parse('$baseUrl/recommendations/refresh'), headers: _headers());
    return jsonDecode(res.body);
  }

  // Events: Get Catalog
  Future<List<EventItem>> getEvents({String? category, String? search}) async {
    final uri = Uri.parse('$baseUrl/events').replace(queryParameters: {
      if (category != null) 'category': category,
      if (search != null) 'search': search,
    });
    final res = await http.get(uri, headers: _headers());
    final data = jsonDecode(res.body);
    final list = (data['data'] is List ? data['data'] : data) as List;
    return list.map((item) => EventItem.fromJson(item)).toList();
  }

  // Events: Trigger Agent 2 LLM Re-Analysis
  Future<EventItem> analyzeEvent(String eventId) async {
    final res = await http.post(Uri.parse('$baseUrl/events/$eventId/analyze'), headers: _headers());
    final data = jsonDecode(res.body);
    return EventItem.fromJson(data['data'] ?? data);
  }

  // Interactions: Log Telemetry
  Future<Map<String, dynamic>> logInteraction(String eventId, String action, {Map<String, dynamic>? metadata}) async {
    final res = await http.post(
      Uri.parse('$baseUrl/interactions'),
      headers: _headers(),
      body: jsonEncode({
        'eventId': eventId,
        'action': action,
        if (metadata != null) 'metadata': metadata,
      }),
    );
    return jsonDecode(res.body);
  }

  // AI Usage & Telemetry
  Future<AIUsageStats> getAIUsage() async {
    final res = await http.get(Uri.parse('$baseUrl/ai/usage'), headers: _headers());
    final data = jsonDecode(res.body);
    return AIUsageStats.fromJson(data['data'] ?? data);
  }
}
