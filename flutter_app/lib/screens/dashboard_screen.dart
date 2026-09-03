import 'package:flutter/material.dart';
import '../services/api_service.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  Map<String, dynamic>? _dashboardData;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadDashboard();
  }

  void _loadDashboard() async {
    final data = await ApiService.getDashboard();
    setState(() {
      _dashboardData = data;
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF080C16),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: const Color(0xFF2563EB),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(Icons.emoji_events, color: Colors.amberAccent, size: 20),
            ),
            const SizedBox(width: 10),
            RichText(
              text: const TextSpan(
                text: 'AllCollegeEvent',
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
                children: [
                  TextSpan(text: '.com', style: TextStyle(color: Color(0xFF60A5FA), fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: Color(0xFF60A5FA)),
            onPressed: () {
              setState(() => _loading = true);
              _loadDashboard();
            },
          )
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: Color(0xFF2563EB)))
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // AllCollegeEvent Official Banner Card
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: const Color(0xFF2563EB).withOpacity(0.4)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.amber.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: Colors.amber.withOpacity(0.3)),
                          ),
                          child: const Text('🏆 India #1 College AI Event Discovery',
                              style: TextStyle(color: Colors.amberAccent, fontSize: 11, fontWeight: FontWeight.bold)),
                        ),
                        const SizedBox(height: 12),
                        const Text('Aarav Sharma', style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold)),
                        const Text('IIT Bombay • Computer Science', style: TextStyle(color: Colors.grey, fontSize: 13)),
                        const SizedBox(height: 8),
                        const Text('Target Goal: AI Research Scientist', style: TextStyle(color: Color(0xFF60A5FA), fontSize: 13, fontWeight: FontWeight.w600)),
                      ],
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Quick Stats Row
                  Row(
                    children: [
                      Expanded(child: _buildStatCard('Saved Events', '4', const Color(0xFF60A5FA), Icons.bookmark)),
                      const SizedBox(width: 10),
                      Expanded(child: _buildStatCard('Registered', '2', Colors.purpleAccent, Icons.check_circle)),
                      const SizedBox(width: 10),
                      Expanded(child: _buildStatCard('AI Matches', '8', Colors.cyanAccent, Icons.auto_awesome)),
                    ],
                  ),

                  const SizedBox(height: 24),
                  const Text('AllCollegeEvent Registration Deadlines',
                      style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),

                  // Deadlines List
                  ...((_dashboardData?['upcomingDeadlines'] as List<dynamic>?) ?? []).map(
                    (dl) => Container(
                      margin: const EdgeInsets.only(bottom: 10),
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: const Color(0xFF1E293B).withOpacity(0.6),
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: Colors.white10),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(dl['title'] ?? '', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                              Text(dl['category'] ?? 'Event', style: const TextStyle(color: Colors.grey, fontSize: 12)),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.redAccent.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(dl['deadline'] ?? 'Soon', style: const TextStyle(color: Colors.redAccent, fontSize: 11, fontWeight: FontWeight.bold)),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }

  Widget _buildStatCard(String label, String value, Color color, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withOpacity(0.6),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(height: 8),
          Text(value, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
          Text(label, style: const TextStyle(color: Colors.grey, fontSize: 11)),
        ],
      ),
    );
  }
}
