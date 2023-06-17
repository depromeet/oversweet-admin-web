// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oversweet.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
    ],
  },
};
