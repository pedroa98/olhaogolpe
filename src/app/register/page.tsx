"use client";

import { useState } from "react";
import Parse from "@/lib/back4app";

export default function RegisterPage() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister() {

    try {

      setLoading(true);

      setMessage("");

      const user = new Parse.User();

      user.set("username", username);

      user.set("email", email);

      user.set("password", password);

      user.set("role", "user");

      await user.signUp();

      setMessage("Conta criada com sucesso!");

    } catch (error: unknown) {

      if (error instanceof Error) {

        setMessage(error.message);

      } else {

        setMessage("Erro ao criar conta");

      }

    } finally {

      setLoading(false);

    }

  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

        <h1 className="text-4xl font-bold text-center mb-6">
          Criar Conta
        </h1>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-zinc-800 border border-zinc-700"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-zinc-800 border border-zinc-700"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-6 rounded-xl bg-zinc-800 border border-zinc-700"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-red-600 hover:bg-red-700 transition p-4 rounded-xl font-bold"
        >

          {loading
            ? "Criando..."
            : "Criar Conta"}

        </button>

        {message && (

          <p className="mt-4 text-center text-zinc-300">
            {message}
          </p>

        )}

      </div>

    </main>
  );

}