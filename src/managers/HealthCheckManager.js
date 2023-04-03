class HealthCheckManager {
  constructor() {}

  getAppHealth() {
    return {
      uptimeInSeconds: process.uptime(),
      responseTime: process.hrtime(),
      message: 'OK',
      timestamp: process.hrtime(),
      nodeVersion: process.version
    };
  }
}

export default HealthCheckManager;