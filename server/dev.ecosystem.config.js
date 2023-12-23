module.exports = {
  apps: [
    {
      name: 'server api',
      script: 'npm run dev',
      exec_mode: 'cluster',
      // watch: true,
      // restart_delay: 30000,
      // max_memory_restart: '1G',
      // max_restarts: 5,
      // exp_backoff_restart_delay: 500,
    },
  ],
};
