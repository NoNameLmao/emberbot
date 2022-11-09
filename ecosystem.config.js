module.exports = {
  apps: [{
    name: 'esbot',
    script: 'ts-node index.ts',
    watch: 'true',
    env_hook: {
      command: 'git pull && npm i && npm test && pm2 restart esbot'
    },
  }]
};
