import 'package:flutter/material.dart';
import 'screens/dashboard_screen.dart';
import 'screens/recommendations_screen.dart';
import 'screens/events_screen.dart';

void main() {
  runApp(const AllCollegeEventFlutterApp());
}

class AllCollegeEventFlutterApp extends StatelessWidget {
  const AllCollegeEventFlutterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AllCollegeEvent.com',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF080C16),
        primaryColor: const Color(0xFF2563EB),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF2563EB),
          secondary: Color(0xFF06B6D4),
          surface: Color(0xFF0F172A),
        ),
      ),
      home: const MainNavigationShell(),
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    DashboardScreen(),
    RecommendationsScreen(),
    EventsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: Colors.white10)),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) => setState(() => _currentIndex = index),
          backgroundColor: const Color(0xFF0F172A),
          selectedItemColor: const Color(0xFF60A5FA),
          unselectedItemColor: Colors.grey,
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.dashboard_customize), label: 'ACE Dashboard'),
            BottomNavigationBarItem(icon: Icon(Icons.auto_awesome), label: 'AI Feed'),
            BottomNavigationBarItem(icon: Icon(Icons.emoji_events), label: 'Events'),
          ],
        ),
      ),
    );
  }
}
