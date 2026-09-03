import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../models/recommendation.dart';

class RecommendationsScreen extends StatefulWidget {
  const RecommendationsScreen({super.key});

  @override
  State<RecommendationsScreen> createState() => _RecommendationsScreenState();
}

class _RecommendationsScreenState extends State<RecommendationsScreen> {
  List<RecommendationItem> _recommendations = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadRecommendations();
  }

  void _loadRecommendations() async {
    final list = await ApiService.getRecommendations();
    setState(() {
      _recommendations = list;
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF080C16),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text('Agent 1 Opportunity Feed', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: const Icon(Icons.auto_awesome, color: Color(0xFF60A5FA)),
            onPressed: () {
              setState(() => _loading = true);
              _loadRecommendations();
            },
          )
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: Color(0xFF2563EB)))
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _recommendations.length,
              itemBuilder: (context, index) {
                final item = _recommendations[index];
                return Container(
                  margin: const EdgeInsets.only(bottom: 16),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B).withOpacity(0.7),
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: const Color(0xFF2563EB).withOpacity(0.4)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: const Color(0xFF2563EB).withOpacity(0.2),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(item.event.category, style: const TextStyle(color: Color(0xFF60A5FA), fontSize: 11, fontWeight: FontWeight.bold)),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.greenAccent.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text('🏆 ${item.score.toInt()}% ACE Match', style: const TextStyle(color: Colors.greenAccent, fontSize: 11, fontWeight: FontWeight.bold)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Text(item.event.title, style: const TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 6),
                      Text(item.event.description, style: const TextStyle(color: Colors.grey, fontSize: 12)),
                      const SizedBox(height: 12),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFF2563EB).withOpacity(0.1),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: const Color(0xFF2563EB).withOpacity(0.25)),
                        ),
                        child: Text('🧠 AllCollegeEvent AI Rationale: ${item.matchReason}', style: const TextStyle(color: Color(0xFF93C5FD), fontSize: 12)),
                      ),
                      const SizedBox(height: 14),
                      Row(
                        children: [
                          Expanded(
                            child: ElevatedButton.icon(
                              onPressed: () => ApiService.logInteraction(item.eventId, 'REGISTER'),
                              icon: const Icon(Icons.arrow_forward, size: 16),
                              label: const Text('Register via AllCollegeEvent'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF2563EB),
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.vertical(12),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}
