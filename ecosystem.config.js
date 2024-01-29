module.exports = {
  apps : [{
    name: 'backend',
    script: './backend/index.js',

    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    restart_delay: 500,

    // restart
    exp_backoff_restart_delay: 20,
    max_memory_restart: '500M',
    max_restarts: 10,

    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }, {
    name: 'bot',
    script: './bot/dist/app.js',

    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    restart_delay: 500,

    // restart
    exp_backoff_restart_delay: 20,
    max_memory_restart: '500M',
    max_restarts: 10,
  },
  {
    name: 'front',
    script: 'npm run preview',
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
