const isProduction = process.env.NODE_ENV === 'production';
export default {
  IS_PRODUCTION: isProduction,
  CLOUD_HOME: 'https://cloud.ylui.yuri2.cn',
  CLOUD_API: 'https://now-express.yuri2peter.now.sh/api/oss',
  COLOR: {
    THEME: '#6b96cf',
  },
};
