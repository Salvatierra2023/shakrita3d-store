"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

type Historial = {
    id: string;
    estado_anterior: string;
    estado_nuevo: string;
    cambiado_por: string;
    created_at: string;
};

export default function HistorialEncargo({ encargoId }: { encargoId: string }) {
    const [historial, setHistorial] = useState<Historial[]>([]);

    useEffect(() => {
        const fetchHistorial = async () => {
        const { data } = await supabase
            .from("encargo_historial")
            .select("*")
            .eq("encargo_id", encargoId)
            .order("created_at", { ascending: false });

        if (data) setHistorial(data);
        };

        fetchHistorial();
    }, [encargoId]);

    if (!historial.length) return null;

    return (
        <div className="mt-4 border-l border-white/10 pl-4 space-y-2">
        <p className="text-xs text-zinc-400">Historial</p>

        {historial.map((h) => (
            <div key={h.id} className="text-xs text-zinc-300">
            <span className="text-zinc-500">
                {new Date(h.created_at).toLocaleString()}
            </span>{" "}
            → <b>{h.estado_anterior}</b> → <b>{h.estado_nuevo}</b>{" "}
            <span className="text-zinc-500">
                ({h.cambiado_por})
            </span>
            </div>
        ))}
        </div>
    );
}
