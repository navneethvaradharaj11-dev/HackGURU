class AIUsageStats {
  final int totalTokensConsumed;
  final int totalRequestsServed;
  final double estimatedCostUSD;
  final double cacheHitRatio;
  final int avgLatencyMs;
  final Map<String, dynamic> activeProviderPools;
  final List<Map<String, dynamic>> recentLogs;

  AIUsageStats({
    required this.totalTokensConsumed,
    required this.totalRequestsServed,
    required this.estimatedCostUSD,
    required this.cacheHitRatio,
    required this.avgLatencyMs,
    required this.activeProviderPools,
    required this.recentLogs,
  });

  factory AIUsageStats.fromJson(Map<String, dynamic> json) {
    return AIUsageStats(
      totalTokensConsumed: (json['totalTokensConsumed'] as num? ?? 0).toInt(),
      totalRequestsServed: (json['totalRequestsServed'] as num? ?? 0).toInt(),
      estimatedCostUSD: (json['estimatedCostUSD'] as num? ?? 0).toDouble(),
      cacheHitRatio: (json['cacheHitRatio'] as num? ?? 0).toDouble(),
      avgLatencyMs: (json['avgLatencyMs'] as num? ?? 0).toInt(),
      activeProviderPools: json['activeProviderPools'] is Map<String, dynamic>
          ? json['activeProviderPools'] as Map<String, dynamic>
          : {},
      recentLogs: (json['recentLogs'] as List<dynamic>?)
              ?.map((e) => e is Map<String, dynamic> ? e : <String, dynamic>{})
              .toList() ??
          [],
    );
  }
}
