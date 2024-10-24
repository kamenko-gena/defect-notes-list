import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import {
    ApplicationConfig,
    provideZoneChangeDetection,
    importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
// import 'dotenv/config';

const firebaseConfig = {
    apiKey: 'AIzaSyDcueZQtZ8_EHxnzPTisM2xFMgIsqAUHpQ',
    authDomain: 'notes-list-f57e1.firebaseapp.com',
    projectId: 'notes-list-f57e1',
    storageBucket: 'notes-list-f57e1.appspot.com',
    messagingSenderId: '779322589328',
    appId: '1:779322589328:web:682460d4cabda684665815',
};

// const firebaseConfig = {
//   apiKey: process.env['API_KEY'],
//   authDomain: process.env['AUTH_DOMAIN'],
//   projectId: process.env['PROJECT_ID'],
//   storageBucket: process.env['STORAGE_BUCKET'],
//   messagingSenderId: process.env['MESSAGING_SENDER_ID'],
//   appId: process.env['APP_ID']
// };

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth()),
        importProvidersFrom([TuiRootModule]),
    ],
};
