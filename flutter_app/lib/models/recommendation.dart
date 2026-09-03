import 'event.dart';

class RecommendationItem {
  final String eventId;
  final double score;
  final String matchReason;
  final String recommendedRole;
  final EventItem event;

  RecommendationItem({
    required this.eventId,
    required this.score,
    required this.matchReason,
    required this.recommendedRole,
    required this.event,
  });

  factory RecommendationItem.fromJson(Map<String, dynamic> json) {
    return RecommendationItem(
      eventId: json['eventId'] as String? ?? '',
      score: (json['score'] as num? ?? json['matchScore'] as num? ?? 90).toDouble(),
      matchReason: json['matchReason'] as String? ?? json['reason'] as String? ?? 'High alignment with your student profile.',
      recommendedRole: json['recommendedRole'] as String? ?? 'Team Lead',
      event: EventItem.fromJson(json['event'] is Map<String, dynamic> ? json['event'] : json),
    );
  }
}
