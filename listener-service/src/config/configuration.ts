export default () => ({
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://mongodb:27017/listener',
  },
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
}); 