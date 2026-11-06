import ENV from '@/env';
import { type App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { getMessaging, Messaging } from 'firebase-admin/messaging';

class FirebaseService {
  private firebaseApp: App;
  private firebaseAuth: Auth;
  private firebaseMessaging: Messaging;

  private initFirebaseApp = (): App => {
    try {
      const serviceAccount = JSON.parse(ENV.FIREBASE_CERT);
      const app = initializeApp({ credential: cert(serviceAccount) });
      console.log(`✅ SUCCESS : Firebase initialized successfully`);
      return app;
    } catch (err) {
      throw new Error(`Firebase initialization failed`, { cause: err });
    }
  };

  constructor() {
    const isFirebaseInitialized = getApps().length > 0;
    this.firebaseApp = isFirebaseInitialized ? getApp() : this.initFirebaseApp();
    this.firebaseAuth = getAuth(this.firebaseApp);
    this.firebaseMessaging = getMessaging(this.firebaseApp);
  }

  public getAuth(): Auth {
    return this.firebaseAuth;
  }

  public getMessaging(): Messaging {
    return this.firebaseMessaging;
  }
}

export const firebaseService = new FirebaseService();
