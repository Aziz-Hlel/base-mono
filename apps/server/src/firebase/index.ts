import logServiceConnect from '@/bootstrap/utils/logServiceConnect';
import ENV from '@/env';
import { type App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { getMessaging, Messaging } from 'firebase-admin/messaging';

class FirebaseProvider {
  private firebaseApp: App;
  private firebaseAuth: Auth;
  private firebaseMessaging: Messaging;

  private initFirebaseApp = (): App => {
    try {
      const serviceAccount = JSON.parse(ENV.FIREBASE_CERT);
      const app = initializeApp({ credential: cert(serviceAccount) });
      return app;
    } catch (err) {
      throw new Error(`❌ ERROR : Firebase initialization failed`, { cause: err });
    }
  };

  public async checkConnection(): Promise<void> {
    try {
      await this.firebaseApp.options.credential?.getAccessToken();
      logServiceConnect('Firebase');
    } catch (err) {
      throw new Error(`❌ ERROR : Firebase check failed`, { cause: err });
    }
  }

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

export const firebaseProvider = new FirebaseProvider();
