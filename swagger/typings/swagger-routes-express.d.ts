declare module 'swagger-routes-express' {
  import { Handler, Router } from "express";

  interface Controllers {
    [key: string]: Handler;
  }

  interface Options {
    security?: {
      [key: string]: Handler;
    };

    middleware?: {
      [key: string]: Handler;
    };

    onCreateRoute?: (method: string, descriptor: any[]) => void;

    apiSeparator?: string;
    notImplemented?: Handler;
    notFound?: Handler;
    rootTag?: string;
    variables?: object;
  }

  export function connector(api: Controllers, apiDefinition: object, options?: Options): (router: Router) => void;
}