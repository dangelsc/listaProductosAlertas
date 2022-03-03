// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAUfmfj0_2_XiRPRYQOCKihvmxKWbu53t0',
    authDomain: 'borrareproy.firebaseapp.com',
    databaseURL: 'https://borrareproy-default-rtdb.firebaseio.com',
    projectId: 'borrareproy',
    storageBucket: 'borrareproy.appspot.com',
    messagingSenderId: '643375976817',
    appId: '1:643375976817:web:98a9f016acc251d6aea6d0',
    measurementId: 'G-98WPD3RTNC',
  },
  cantidadMinimaProd: 3,
  fechaMinimaSemana: 2, //14 dias
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
