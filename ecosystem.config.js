module.exports = {
  apps: [{
    name: 'productDescription',
    script: './server/index.js',
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-191-109-41.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/product-description.pem',
      ref: 'origin/master',
      repo: 'https://github.com/threetexansandacanadian/productDescription.git',
      path: '/home/ubuntu/productDescription',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
