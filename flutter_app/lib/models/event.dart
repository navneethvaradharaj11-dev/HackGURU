class EventItem {
  final String id;
  final String title;
  final String description;
  final String category;
  final String location;
  final String organizer;
  final String startDate;
  final String endDate;
  final String registrationDeadline;
  final List<String> domainTags;
  final List<String> skillsRequired;
  final String difficultyLevel;

  EventItem({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.location,
    required this.organizer,
    required this.startDate,
    required this.endDate,
    required this.registrationDeadline,
    required this.domainTags,
    required this.skillsRequired,
    required this.difficultyLevel,
  });

  factory EventItem.fromJson(Map<String, dynamic> json) {
    return EventItem(
      id: json['id'] as String? ?? json['eventId'] as String? ?? '',
      title: json['title'] as String? ?? '',
      description: json['description'] as String? ?? '',
      category: json['category'] as String? ?? 'General',
      location: json['location'] as String? ?? 'Online',
      organizer: json['organizer'] as String? ?? 'ACE Organizer',
      startDate: json['startDate'] as String? ?? '',
      endDate: json['endDate'] as String? ?? '',
      registrationDeadline: json['registrationDeadline'] as String? ?? '',
      domainTags: (json['domainTags'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      skillsRequired: (json['skillsRequired'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      difficultyLevel: json['difficultyLevel'] as String? ?? 'INTERMEDIATE',
    );
  }
}
