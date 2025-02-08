"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [apiKey, setApiKey] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!apiKey.trim()) return alert("Por favor, ingresa una API Key");

    // Guardamos la API Key en localStorage
    localStorage.setItem("FLEXHIRE_API_KEY", apiKey);
    router.push("/profile"); // Redirigir al perfil
  };

  return (
    <div className="container">
      <h1 className="title">Login con API Key</h1>
      <input
        type="text"
        placeholder="Ingresa tu API Key"
        className="input"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={handleLogin} className="button">
        Iniciar sesión
      </button>
    </div>
  );
}
