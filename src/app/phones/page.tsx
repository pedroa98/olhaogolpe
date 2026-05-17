"use client";

import { useState } from "react";

import Link from "next/link";

import { ShieldAlert } from "lucide-react";

import { searchPhone } from "@/services/searchPhone";

type Report = {

  id: string;

  phoneNumber: string;

  description: string;

  createdAt: Date;

};

export default function PhonesPage() {

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [reports, setReports] =
    useState<Report[]>([]);

  const [searched, setSearched] =
    useState(false);

  // pesquisar
  async function handleSearch() {

    setLoading(true);

    const response =
      await searchPhone(
        phoneNumber
      );

    if (
      response.success
      &&
      response.found
    ) {

      setReports(
        response.reports
      );

    } else {

      setReports([]);

    }

    setSearched(true);

    setLoading(false);

  }

  return (

    <main className="min-h-screen bg-black text-white">

      {/* topo */}

      <header className="border-b border-zinc-800">

        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <ShieldAlert
              className="text-red-500"
              size={32}
            />

            <h1 className="text-2xl font-bold">
              LinkShield
            </h1>

          </div>

          <div className="flex gap-3">

            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700"
            >

              Início

            </Link>

            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl bg-red-600"
            >

              Dashboard

            </Link>

          </div>

        </div>

      </header>

      {/* conteúdo */}

      <section className="max-w-3xl mx-auto px-4 py-12">

        <h2 className="text-4xl font-bold mb-3">

          Consulta Pública
          de Telefones

        </h2>

        <p className="text-zinc-400 mb-8">

          Pesquise números denunciados
          por golpes, fraudes ou phishing.

        </p>

        {/* input */}

        <input
          type="text"
          placeholder="Digite o telefone"
          value={phoneNumber}
          onChange={(e) =>
            setPhoneNumber(
              e.target.value
            )
          }
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        {/* botão */}

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 transition p-4 rounded-xl font-bold"
        >

          {loading
            ? "Pesquisando..."
            : "Consultar Número"}

        </button>

        {/* resultado */}

        {searched && (

          <div className="mt-10">

            {/* sem denúncias */}

            {reports.length === 0 && (

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                <p className="text-green-500 font-bold text-2xl">

                  ✅ Nenhuma denúncia encontrada

                </p>

              </div>

            )}

            {/* denúncias */}

            {reports.length > 0 && (

              <>

                <div className="mb-6">

                  <p className="text-red-500 font-bold text-2xl">

                    ⚠️ Número denunciado

                  </p>

                  <p className="text-zinc-400 mt-2">

                    Total de denúncias:
                    {" "}
                    {reports.length}

                  </p>

                </div>

                <div className="space-y-4">

                  {reports.map((report) => (

                    <div
                      key={report.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                    >

                      <p className="text-zinc-300">

                        {report.description}

                      </p>

                      <p className="text-zinc-500 text-sm mt-4">

                        {new Date(
                          report.createdAt
                        ).toLocaleDateString()}

                      </p>

                    </div>

                  ))}

                </div>

              </>

            )}

          </div>

        )}

      </section>

    </main>

  );

}