"use client";

import Link from "next/link";

import { useState } from "react";

import { ShieldAlert } from "lucide-react";

import { checkDomain } from "@/services/checkDomain";

export default function Home() {

  // input
  const [url, setUrl] = useState("");

  // loading
  const [loading, setLoading] = useState(false);

  // resultado
  const [result, setResult] = useState<null | {
    official?: boolean;
    company?: string;
    domain?: string;
    error?: string;
  }>(null);

  // verificar link
  async function handleCheck() {

    setLoading(true);

    const response =
      await checkDomain(url);

    console.log(response);

    setResult(response);

    setLoading(false);

  }

  return (

    <main className="min-h-screen bg-black text-white">

      {/* navbar */}

      <header className="border-b border-zinc-800">

        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* logo */}

          <div className="flex items-center gap-3">

            <ShieldAlert
              size={32}
              className="text-red-500"
            />

            <h1 className="text-2xl md:text-3xl font-bold">
              LinkShield
            </h1>

          </div>

          {/* navegação */}

          <div className="flex flex-wrap items-center justify-center gap-3">

            <Link
              href="/login"
              className="px-5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition"
            >

              Login

            </Link>

            <Link
              href="/register"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition font-bold"
            >

              Registrar

            </Link>

            <Link
              href="/phones"
              className="px-5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition"
            >

              Consultar Telefones

            </Link>

          </div>

        </div>

      </header>

      {/* conteúdo */}

      <section className="flex items-center justify-center px-4 py-16">

        <div className="w-full max-w-3xl">

          {/* título */}

          <div className="text-center mb-10">

            <div className="flex items-center justify-center gap-3 mb-4">

              <ShieldAlert
                size={48}
                className="text-red-500"
              />

              <h2 className="text-4xl md:text-6xl font-bold">
                LinkShield
              </h2>

            </div>

            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
              Verifique se um link pode ser golpe,
              phishing ou tentativa de fraude.
            </p>

          </div>

          {/* card principal */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-8">

            {/* input */}

            <input
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              type="text"
              placeholder="Cole um link suspeito aqui"
              className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-700 focus:outline-none focus:border-red-500"
            />

            {/* botão */}

            <button
              onClick={handleCheck}
              disabled={loading}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 transition p-4 rounded-xl font-bold"
            >

              {loading
                ? "Analisando..."
                : "Verificar Link"}

            </button>

            {/* resultado */}

            {result && (

              <div className="mt-8 bg-black border border-zinc-800 rounded-xl p-6">

                {/* erro */}

                {result.error && (

                  <p className="text-red-500 font-bold">
                    {result.error}
                  </p>

                )}

                {/* oficial */}

                {result.official && (

                  <>

                    <p className="text-green-500 font-bold text-2xl">
                      ✅ Site Oficial
                    </p>

                    <p className="mt-3">
                      Empresa detectada:
                      {" "}
                      {result.company}
                    </p>

                    <p className="mt-2 text-zinc-400 break-all">
                      Domínio:
                      {" "}
                      {result.domain}
                    </p>

                  </>

                )}

                {/* suspeito */}

                {!result.official && !result.error && (

                  <>

                    <p className="text-red-500 font-bold text-2xl">
                      ⚠️ Site Suspeito
                    </p>

                    <p className="mt-3">
                      Esse domínio não está
                      na lista oficial.
                    </p>

                    <p className="mt-2 text-zinc-400 break-all">
                      Domínio:
                      {" "}
                      {result.domain}
                    </p>

                  </>

                )}

              </div>

            )}

          </div>

          {/* cards inferiores */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">

            {/* consulta */}

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <h3 className="text-xl font-bold mb-3">
                Consulta Pública
              </h3>

              <p className="text-zinc-400 text-sm">
                Pesquise links e números
                suspeitos gratuitamente.
              </p>

            </div>

            {/* denúncias */}

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <h3 className="text-xl font-bold mb-3">
                Denúncias
              </h3>

              <p className="text-zinc-400 text-sm">
                Usuários podem registrar
                tentativas de golpe.
              </p>

            </div>

            {/* segurança */}

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <h3 className="text-xl font-bold mb-3">
                Segurança
              </h3>

              <p className="text-zinc-400 text-sm">
                Sistema focado em detectar
                phishing e fraudes digitais.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}