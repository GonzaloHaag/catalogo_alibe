/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BEARER_TOKEN: string
    // more env variables...
    readonly VITE_SUPABASE_ANON_KEY: string
    readonly VITE_SUPABASE_SECRET: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
