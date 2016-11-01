declare module 'passport-http' {
  import passport = require('passport');
  import express = require('express');

  interface IBasicStrategyOptions {
    realm?: string
  }

  interface IAuthenticateOptions {
    session: boolean;
  }

  interface IVerifyOptions {
    message: string;
  }

  interface IBasicVerifyFunctionWithRequest {
    (req: express.Request, username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void): void;
  }

  interface IBasicVerifyFunction {
    (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void): void;
  }

  class BasicStrategy implements passport.Strategy {
    constructor(options: IBasicStrategyOptions, verify: IBasicVerifyFunctionWithRequest);
    constructor(options: IBasicStrategyOptions, verify: IBasicVerifyFunction);
    constructor(verify: IBasicVerifyFunction);

    name: string;
    authenticate: (req: express.Request, options: IAuthenticateOptions) => void;
  }

// -------------------------- Digest --------------------------

  interface IDigestStrategyOptions {
    realm?: string;
    domain?: string;
    algorithm?: string;
    qop?: string;
  }

  interface IDigestValidate {
    nonce?: string;
    cnonce?: string;
    nc?: number;
    opaque?: string;
  }

  interface IDigestSecretFunctionWithRequest {
    (req: express.Request, done: (error: any, user?: any, password?: any) => void): void;
  }

  interface IDigestSecretFunction {
    (done: (error: any, user?: any, password?: any) => void): void;
  }

  class DigestStrategy implements passport.Strategy {
    constructor(options: IDigestStrategyOptions, secret: IDigestSecretFunction, validate: IDigestValidate);
    constructor(options: IDigestStrategyOptions, secret: IDigestSecretFunctionWithRequest, validate: IDigestValidate);
    constructor(secret: IDigestSecretFunction);
    constructor(secret: IDigestSecretFunctionWithRequest);

    authenticate: (req: express.Request, options: IAuthenticateOptions) => void;
  }
}
