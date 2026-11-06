import ENV from '@/env';
import { type App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging, Messaging } from 'firebase-admin/messaging';

class FirebaseService {
  private firebaseApp: App;
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
    this.firebaseMessaging = getMessaging(this.firebaseApp);
  }

  public getMessaging(): Messaging {
    return this.firebaseMessaging;
  }
}

export const firebaseMessagingService = new FirebaseService().getMessaging();
