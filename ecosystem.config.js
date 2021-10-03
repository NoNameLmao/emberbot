module.exports = {
  apps : [{
    name: 'esbot',
    script: 'server.js',
    watch: 'true',
    env_hook: {
      command: 'git pull && npm i && npm test && pm2 restart esbot'
    }
  }]
};
