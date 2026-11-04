// Simple Google Auth Service without complex type imports
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult
} from 'firebase/auth';
import { auth } from '../config/firebase';
import type { GoogleUserData } from '../types/auth';

export class GoogleAuthService {
  private provider: GoogleAuthProvider;
  private isPopupOpen: boolean = false;

  constructor() {
    this.provider = new GoogleAuthProvider();
    this.provider.addScope('email');
    this.provider.addScope('profile');
    
    // Set custom parameters for better user experience
    this.provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    console.log('✅ Google Auth Provider initialized with client ID:', '1024746152320-gtvf37pthnj4o1u6cunmbr8q0lk09804.apps.googleusercontent.com');
  }

  async signInWithPopup(): Promise<{ success: boolean; user?: GoogleUserData; error?: string }> {
    try {
      console.log('🔄 Starting Google Sign-in with popup...');
      
      // Check if there's already a pending popup
      if (this.isPopupOpen) {
        throw new Error('A sign-in popup is already open');
      }
      
      this.isPopupOpen = true;
      
      const result = await signInWithPopup(auth, this.provider);
      const user = result.user;
      
      console.log('✅ Google Sign-in successful');

      const userData: GoogleUserData = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        idToken: await user.getIdToken(),
        photoURL: user.photoURL || undefined,
        phoneNumber: user.phoneNumber || undefined
      };

      return {
        success: true,
        user: userData
      };
    } catch (error: any) {
      console.error('❌ Google Sign-in failed:', error);
      
      let errorMessage = 'Google Sign-in failed';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Sign-in popup was blocked by browser';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Sign-in was cancelled';
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage
      };
    } finally {
      this.isPopupOpen = false;
    }
  }

  async signInWithRedirect(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔄 Starting Google Sign-in with redirect...');
      await signInWithRedirect(auth, this.provider);
      return { success: true };
    } catch (error: any) {
      console.error('❌ Google Sign-in redirect failed:', error);
      return {
        success: false,
        error: error.message || 'Google Sign-in redirect failed'
      };
    }
  }

  async getRedirectResult(): Promise<{ success: boolean; user?: GoogleUserData; error?: string }> {
    try {
      console.log('🔄 Getting Google Sign-in redirect result...');
      const result = await getRedirectResult(auth);
      
      if (result) {
        const user = result.user;
        console.log('✅ Google Sign-in redirect successful');

        const userData: GoogleUserData = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          idToken: await user.getIdToken(),
          photoURL: user.photoURL || undefined,
          phoneNumber: user.phoneNumber || undefined
        };

        return { success: true, user: userData };
      } else {
        return { success: false, error: 'No redirect result found' };
      }
    } catch (error: any) {
      console.error('❌ Failed to get Google Sign-in redirect result:', error);
      return {
        success: false,
        error: error.message || 'Failed to get redirect result'
      };
    }
  }

  isGoogleSignInAvailable(): boolean {
    try {
      if (typeof window === 'undefined') return false;
      if (!auth) return false;
      if (!this.provider) return false;
      return true;
    } catch (error) {
      console.error('❌ Google Sign-in not available:', error);
      return false;
    }
  }

  getCurrentUser() {
    return auth.currentUser;
  }

  async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔄 Signing out from Google...');
      await auth.signOut();
      console.log('✅ Google Sign-out successful');
      return { success: true };
    } catch (error: any) {
      console.error('❌ Google Sign-out failed:', error);
      return {
        success: false,
        error: error.message || 'Google Sign-out failed'
      };
    }
  }
}

// Export singleton instance
export const googleAuthService = new GoogleAuthService();