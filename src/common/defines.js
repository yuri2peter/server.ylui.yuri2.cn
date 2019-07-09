const isProduction = process.env.NODE_ENV === 'production';
export default {
  IS_PRODUCTION: isProduction,
  CLOUD_HOME: 'https://cloud.ylui.yuri2.cn',
  CLOUD_API: 'https://mongo.yuri2.cn/api/oss',
  COLOR: {
    THEME: '#6b96cf',
  },
};
