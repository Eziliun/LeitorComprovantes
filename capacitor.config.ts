import { CapacitorConfig } from '@capacitor/cli';


const config: CapacitorConfig = {
  appId: 'com.br',
  appName: 'Leitor Cupons',
  webDir: 'dist',
  server :{
    url: 'http://192.168.203.37:4200',
    cleartext: true,
        allowNavigation: [
      '*'
    ]
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: '#ffffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      layoutName: 'launch_screen',
      showSpinner: true,
      splashFullScreen: true,
      splashImmersive: true,
      useDialog: true,
    },

  },
  
};

export default config;
