declare namespace NodeJS {
  interface ProcessEnv {
    readonly HUME_API_KEY: string;
    readonly HUME_CLIENT_SECRET: string;
  }
}
