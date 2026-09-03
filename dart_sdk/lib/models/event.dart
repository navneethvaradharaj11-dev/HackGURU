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
  final List<String>? domainTags;
  final List<String>? skillsRequired;
  final List<String>? targetAudience;
  final String? difficultyLevel;
  final List<String>? careerPathMatch;
  final List<String>? learningOutcomes;
  final String? analyzedAt;

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
    this.domainTags,
    this.skillsRequired,
    this.targetAudience,
    this.difficultyLevel,
    this.careerPathMatch,
    this.learningOutcomes,
    this.analyzedAt,
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
      domainTags: (json['domainTags'] as List<dynamic>?)?.map((e) => e.toString()).toList(),
      skillsRequired: (json['skillsRequired'] as List<dynamic>?)?.map((e) => e.toString()).toList(),
      targetAudience: (json['targetAudience'] as List<dynamic>?)?.map((e) => e.toString()).toList(),
      difficultyLevel: json['difficultyLevel'] as String?,
      careerPathMatch: (json['careerPathMatch'] as List<dynamic>?)?.map((e) => e.toString()).toList(),
      learningOutcomes: (json['learningOutcomes'] as List<dynamic>?)?.map((e) => e.toString()).toList(),
      analyzedAt: json['analyzedAt'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'category': category,
      'location': location,
      'organizer': organizer,
      'startDate': startDate,
      'endDate': endDate,
      'registrationDeadline': registrationDeadline,
      if (domainTags != null) 'domainTags': domainTags,
      if (skillsRequired != null) 'skillsRequired': skillsRequired,
      if (targetAudience != null) 'targetAudience': targetAudience,
      if (difficultyLevel != null) 'difficultyLevel': difficultyLevel,
      if (careerPathMatch != null) 'careerPathMatch': careerPathMatch,
      if (learningOutcomes != null) 'learningOutcomes': learningOutcomes,
      if (analyzedAt != null) 'analyzedAt': analyzedAt,
    };
  }
}
