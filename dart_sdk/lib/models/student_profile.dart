class StudentProfile {
  final String? id;
  final String email;
  final String fullName;
  final String? collegeName;
  final String? branch;
  final int? yearOfStudy;
  final String? degree;
  final String? location;
  final String? careerGoal;
  final String? bio;

  StudentProfile({
    this.id,
    required this.email,
    required this.fullName,
    this.collegeName,
    this.branch,
    this.yearOfStudy,
    this.degree,
    this.location,
    this.careerGoal,
    this.bio,
  });

  factory StudentProfile.fromJson(Map<String, dynamic> json) {
    return StudentProfile(
      id: json['id'] as String?,
      email: json['email'] as String? ?? '',
      fullName: json['fullName'] as String? ?? '',
      collegeName: json['collegeName'] as String?,
      branch: json['branch'] as String?,
      yearOfStudy: json['yearOfStudy'] != null ? (json['yearOfStudy'] as num).toInt() : null,
      degree: json['degree'] as String?,
      location: json['location'] as String?,
      careerGoal: json['careerGoal'] as String?,
      bio: json['bio'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      if (id != null) 'id': id,
      'email': email,
      'fullName': fullName,
      if (collegeName != null) 'collegeName': collegeName,
      if (branch != null) 'branch': branch,
      if (yearOfStudy != null) 'yearOfStudy': yearOfStudy,
      if (degree != null) 'degree': degree,
      if (location != null) 'location': location,
      if (careerGoal != null) 'careerGoal': careerGoal,
      if (bio != null) 'bio': bio,
    };
  }
}
