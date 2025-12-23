"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

type Comentario = {
    id: string;
    comentario: string;
    creado_por: string;
    created_at: string;
};

export default function ComentariosEncargo({
    encargoId,
    }: {
    encargoId: string;
    }) {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [nuevo, setNuevo] = useState("");

    useEffect(() => {
        const fetchComentarios = async () => {
        const { data } = await supabase
            .from("encargo_comentarios")
            .select("*")
            .eq("encargo_id", encargoId)
            .order("created_at", { ascending: false });

        if (data) setComentarios(data);
        };

        fetchComentarios();
    }, [encargoId]);

    const agregarComentario = async () => {
        if (!nuevo.trim()) return;

        const {
        data: { user },
        } = await supabase.auth.getUser();

        await supabase.from("encargo_comentarios").insert({
        encargo_id: encargoId,
        comentario: nuevo,
        creado_por: user?.email ?? "desconocido",
        });

        setNuevo("");
        location.reload(); // simple y efectivo por ahora
    };

    return (
        <div className="mt-6 space-y-3">
        <p className="text-xs text-zinc-400">Comentarios internos</p>

        <textarea
            value={nuevo}
            onChange={(e) => setNuevo(e.target.value)}
            placeholder="Nota interna (no visible para el cliente)"
            className="w-full rounded-lg bg-white/5 border border-white/10 p-3 text-sm"
        />

        <button
            onClick={agregarComentario}
            className="px-4 py-2 rounded-lg bg-pink-500 text-white text-sm"
        >
            Agregar comentario
        </button>

        <div className="space-y-2">
            {comentarios.map((c) => (
            <div
                key={c.id}
                className="text-xs bg-white/5 border border-white/10 rounded-lg p-3"
            >
                <p>{c.comentario}</p>
                <p className="text-zinc-400 mt-1">
                {c.creado_por} ·{" "}
                {new Date(c.created_at).toLocaleString()}
                </p>
            </div>
            ))}
        </div>
        </div>
    );
}
