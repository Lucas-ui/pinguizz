type EndpointStats = {
  count: number;
  totalTime: number;
  errors: number;
};

export class MetricsCollector {
  private stats: Record<string, EndpointStats> = {};

  track(endpoint: string, duration: number, status: number) {
    if (!this.stats[endpoint]) {
      this.stats[endpoint] = {
        count: 0,
        totalTime: 0,
        errors: 0,
      };
    }

    const endpointStats = this.stats[endpoint];
    endpointStats.count += 1;
    endpointStats.totalTime += duration;

    if (status >= 400) {
      endpointStats.errors += 1;
    }
  }

  getStats() {
    const summary: Record<string, any> = {};

    for (const [endpoint, data] of Object.entries(this.stats)) {
      summary[endpoint] = {
        count: data.count,
        averageTime: parseFloat((data.totalTime / data.count).toFixed(2)),
        errorRate: parseFloat((data.errors / data.count).toFixed(2)),
      };
    }

    return summary;
  }

  reset() {
    this.stats = {};
  }
}
