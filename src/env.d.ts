declare namespace NodeJS {
  interface ProcessEnv {
    readonly DEEPGRAM_API_KEY_OWNER_SCOPE: string;
    readonly DEEPGRAM_ENV: string;
    readonly LOGTAIL_SOURCE_TOKEN: string;
    readonly GOOGLE_GENERATIVE_AI_API_KEY: string;
  }
}
