import 'event.dart';

class RecommendationItem {
  final String eventId;
  final double score;
  final String matchReason;
  final String? recommendedRole;
  final List<String>? suggestedPrep;
  final String? estimatedDifficulty;
  final EventItem event;

  RecommendationItem({
    required this.eventId,
    required this.score,
    required this.matchReason,
    this.recommendedRole,
    this.suggestedPrep,
    this.estimatedDifficulty,
    required this.event,
  });

  factory RecommendationItem.fromJson(Map<String, dynamic> json) {
    return RecommendationItem(
      eventId: json['eventId'] as String? ?? '',
      score: (json['score'] as num? ?? json['matchScore'] as num? ?? 0).toDouble(),
      matchReason: json['matchReason'] as String? ?? json['reason'] as String? ?? '',
      recommendedRole: json['recommendedRole'] as String?,
      suggestedPrep: (json['suggestedPrep'] as List<dynamic>?)?.map((e) => e.toString()).toList(),
      estimatedDifficulty: json['estimatedDifficulty'] as String?,
      event: EventItem.fromJson(json['event'] is Map<String, dynamic> ? json['event'] : json),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'eventId': eventId,
      'score': score,
      'matchReason': matchReason,
      if (recommendedRole != null) 'recommendedRole': recommendedRole,
      if (suggestedPrep != null) 'suggestedPrep': suggestedPrep,
      if (estimatedDifficulty != null) 'estimatedDifficulty': estimatedDifficulty,
      'event': event.toJson(),
    };
  }
}
