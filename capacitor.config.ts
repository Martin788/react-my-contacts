import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'react-my-contacts',
  webDir: 'build',
  server: {
    hostname: '192.168.1.39:3000/react-my-contacts',
    cleartext: true,
    allowNavigation: ['*']
  }
};

export default config;
