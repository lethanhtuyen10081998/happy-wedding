module.exports = {
  apps: [
    {
      name: 'admin-sim-partner',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env_prod: {
        APP_ENV: 'prod',
        PORT: '3012',
      },
    },
  ],
};
