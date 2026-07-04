import { createClient } from "@supabase/supabase-js";

/**
 * Cliente do Supabase usando a chave secreta (service role). Só pode ser
 * chamado de código que roda no servidor (Route Handlers) — nunca em
 * componentes marcados "use client", senão a chave vazaria pro navegador.
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase não configurado: defina SUPABASE_URL e SUPABASE_SECRET_KEY nas variáveis de ambiente do projeto."
    );
  }

  return createClient(url, key, { auth: { persistSession: false } });
}
