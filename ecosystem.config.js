module.exports = {
  apps: [{
    name: 'emberbot',
    script: 'node --trace-warnings index.js',
    watch: 'true',
    env_hook: {
      command: 'git pull && npm i && npm test && pm2 restart esbot'
    },
  }]
};
