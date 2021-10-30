module.exports = {
  apps : [{
    name: 'esbot',
    script: 'index.ts',
    watch: 'true',
    env_hook: {
      command: 'git pull && npm i && npm test && pm2 restart esbot'
    },
    interpreter: '/root/.nvm/versions/node/v16.9.1/bin/ts-node',
    interpreter_args: '--resolveJsonModule'
  }]
};
