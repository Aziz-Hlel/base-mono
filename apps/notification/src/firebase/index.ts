import ENV from '@/env';
import { type App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging, Messaging } from 'firebase-admin/messaging';

export class FirebaseProvider {
  private firebaseApp: App;
  private firebaseMessaging: Messaging;

  public async checkConnection(): Promise<void> {
    try {
      await this.firebaseApp.options.credential?.getAccessToken();
    } catch (err) {
      throw new Error(`❌ ERROR : Firebase check failed`, { cause: err });
    }
  }

  private initFirebaseApp = (): App => {
    try {
      const serviceAccount = JSON.parse(ENV.FIREBASE_CERT);
      const app = initializeApp({ credential: cert(serviceAccount) });
      console.log(`✅ SUCCESS : Firebase initialized successfully`);
      return app;
    } catch (err) {
      throw new Error(`❌ ERROR : Firebase initialization failed`, { cause: err });
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
