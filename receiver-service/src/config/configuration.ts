export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      uri: process.env.MONGO_URI || 'mongodb://mongodb:27017/pubsub',
    },
    redis: {
      host: process.env.REDIS_HOST || 'redis',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
  });