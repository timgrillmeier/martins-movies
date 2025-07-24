module.exports = {
  apps: [
    {
      name: 'martins-movies',
      cwd: '/home/ubuntu/app',
      script: 'npm',
      args: 'run start',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};