"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Parse from "@/lib/back4app";

export default function LoginPage() {

  const router = useRouter();

  // estados
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // login
  async function handleLogin() {

    try {

      setLoading(true);

      setMessage("");

      // login Parse
      await Parse.User.logIn(
        username,
        password
      );

      // redireciona
      router.push("/dashboard");

    } catch {

      setMessage("Usuário ou senha inválidos");

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

        <h1 className="text-4xl font-bold text-center mb-6">
          Login
        </h1>

        {/* usuário */}

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-zinc-800 border border-zinc-700"
        />

        {/* senha */}

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-6 rounded-xl bg-zinc-800 border border-zinc-700"
        />

        {/* botão */}

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 transition p-4 rounded-xl font-bold"
        >

          {loading
            ? "Entrando..."
            : "Entrar"}

        </button>

        {/* mensagem */}

        {message && (

          <p className="mt-4 text-center text-red-400">
            {message}
          </p>

        )}

      </div>

    </main>

  );

}