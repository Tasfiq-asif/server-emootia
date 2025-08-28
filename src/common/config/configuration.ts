export interface DatabaseConfig {
  url: string;
}

export interface AppConfig {
  port: number;
  nodeEnv: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface Configuration {
  database: DatabaseConfig;
  app: AppConfig;
  jwt: JwtConfig;
}

export default (): Configuration => ({
  database: {
    url: process.env.DATABASE_URL || '',
  },
  app: {
    port: parseInt(process.env.PORT, 10) || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
});
