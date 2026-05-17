"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Parse from "@/lib/back4app";

import { reportPhone } from "@/services/reportPhone";

export default function DashboardPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(true);

  // denúncia
  const [phoneNumber, setPhoneNumber] = useState("");

  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");

  // verifica login
  useEffect(() => {

    async function checkUser() {

      const currentUser = Parse.User.current();

      if (!currentUser) {

        router.push("/login");

        return;

      }

      setUsername(
        currentUser.get("username")
      );

      setLoading(false);

    }

    checkUser();

  }, [router]);

  // logout
  async function handleLogout() {

    await Parse.User.logOut();

    router.push("/login");

  }

  // denunciar
  async function handleReport() {

    const response =
      await reportPhone(
        phoneNumber,
        description
      );

    setMessage(
      response.message
    );

    // limpa campos
    if (response.success) {

      setPhoneNumber("");

      setDescription("");

    }

  }

  // loading
  if (loading) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <p>
          Carregando...
        </p>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white p-8">

      {/* topo */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-zinc-400 mt-2">
            Bem-vindo,
            {" "}
            {username}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-bold"
        >

          Logout

        </button>

      </div>

      {/* denúncia */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Denunciar Telefone
        </h2>

        {/* telefone */}

        <input
          type="text"
          placeholder="Número suspeito"
          value={phoneNumber}
          onChange={(e) =>
            setPhoneNumber(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-zinc-800 border border-zinc-700"
        />

        {/* descrição */}

        <textarea
          placeholder="Descreva o golpe"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-zinc-800 border border-zinc-700 h-40"
        />

        {/* botão */}

        <button
          onClick={handleReport}
          className="w-full bg-red-600 hover:bg-red-700 transition p-4 rounded-xl font-bold"
        >

          Enviar Denúncia

        </button>

        {/* mensagem */}

        {message && (

          <p className="mt-4 text-zinc-300">
            {message}
          </p>

        )}

      </div>

    </main>

  );

}