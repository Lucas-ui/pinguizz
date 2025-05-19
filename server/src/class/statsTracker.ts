import { type MiddlewareHandler } from 'hono';
import { MetricsCollector } from './metricsCollector';

export function StatsTracker(collector: MetricsCollector): MiddlewareHandler {
  return async (c, next) => {
    const start = performance.now();

    await next();

    const duration = performance.now() - start;
    const path = c.req.path;
    const status = c.res.status;

    collector.track(path, duration, status);
  };
}
