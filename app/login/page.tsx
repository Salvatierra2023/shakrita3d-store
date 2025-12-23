"use client";

import { useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

        if (error) {
        setError("Credenciales incorrectas");
        setLoading(false);
        return;
        }

        router.push("/admin");
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0f0f15] text-white">
        <form
            onSubmit={handleLogin}
            className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-8 space-y-6"
        >
            <h1 className="text-2xl font-bold text-center">
            🔐 Acceso Administrador
            </h1>

            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-black/40 border border-white/10"
            />

            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-black/40 border border-white/10"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
            disabled={loading}
            className="w-full py-3 rounded bg-pink-500 hover:bg-pink-400 font-semibold"
            >
            {loading ? "Ingresando..." : "Ingresar"}
            </button>
        </form>
        </main>
    );
}
