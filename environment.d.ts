/** This module contains type-declarations for the .env files. */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND_API_URL: string;
    }
  }
}

export {};
