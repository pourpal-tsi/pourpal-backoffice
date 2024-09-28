/** This module contains type-declarations for the .env files. */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BACKEND_API_URL: string;
    }
  }
}

export {};
