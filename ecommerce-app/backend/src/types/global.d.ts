declare namespace Express {
  export interface UserTokenClaims {
    userId?: string;
    email?: string;
    role?: string;
    guestId?: string;
  }

  // Make Express.User (used by passport types) include our claims
  // so req.user has these fields
  export interface User extends UserTokenClaims {}

  export interface Request {
    user?: UserTokenClaims;
  }
}


declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET?: string;
      CORS_ORIGIN?: string;
      PORT?: string;
      GITHUB_CLIENT_ID?: string;
      GITHUB_CLIENT_SECRET?: string;
      GITHUB_CALLBACK_URL?: string;
      DB_HOST?: string;
      DB_PORT?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_NAME?: string;
    }
  }
}

// export {}

// Minimal typings for passport-github2 to avoid compile issues if @types not installed
declare module "passport-github2" {
  export interface Profile {
    id: string;
    username?: string | null;
    displayName?: string | null;
    emails?: Array<{ value: string }> | null;
  }

  export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: string[];
  }

  export class Strategy {
    name: string;
    constructor(
      options: StrategyOptions,
      verify: (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any) => void
      ) => void
    );
  }
}

// Minimal typings for bcryptjs to avoid compile issues if @types not installed
declare module "bcryptjs" {
  export function hash(data: string, saltOrRounds: number | string): Promise<string>;
  export function compare(data: string, encrypted: string): Promise<boolean>;
  const bcryptDefault: {
    hash: typeof hash;
    compare: typeof compare;
  };
  export default bcryptDefault;
}


