"use client";

import { useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

export default function Encargos() {
    const [nombre, setNombre] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [idea, setIdea] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const { error } = await supabase.from("encargos").insert([
        {
            nombre: nombre,
            whatsapp: whatsapp, // 👈 En SQL tiene que ser las columnas en minusculas
            idea: idea,
            estado: "pendiente",
        },
        ]);

        if (error) {
        console.error(error);
        setError("Ocurrió un error al enviar tu encargo 😥");
        } else {
        setSuccess(true);
        setNombre("");
        setWhatsapp("");
        setIdea("");
        }

        setLoading(false);
    };

    return (
        <section id="encargos" className="mx-auto max-w-7xl px-6 py-32">
        <form
            onSubmit={handleSubmit}
            className="relative rounded-3xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-400/20 border border-white/10 p-12 text-center"
        >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Encarga tu figura personalizada 💖
            </h2>

            <div className="space-y-4 max-w-xl mx-auto">
            <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full rounded-xl p-4"
            />

            <input
                type="text"
                placeholder="Tu WhatsApp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
                className="w-full rounded-xl p-4"
            />

            <textarea
                placeholder="Cuéntame tu idea ✨"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                required
                rows={4}
                className="w-full rounded-xl p-4"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-pink-500 py-4 text-lg font-semibold text-white hover:bg-pink-400 transition"
            >
                {loading ? "Enviando..." : "Enviar encargo"}
            </button>

            {success && (
                <p className="text-green-400">
                ¡Encargo enviado correctamente! 🎉
                </p>
            )}

            {error && <p className="text-red-400">{error}</p>}
            </div>
        </form>
        </section>
    );
}
