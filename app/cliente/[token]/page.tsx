"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/src/lib/supabaseClient";

type Encargo = {
    id: string;
    nombre: string;
    idea: string;
    estado: string;
};

type Historial = {
    id: string;
    estado_anterior: string;
    estado_nuevo: string;
    created_at: string;
};

export default function ClienteEncargo() {
    const params = useParams();
    const token = params.token as string;

    const [encargo, setEncargo] = useState<Encargo | null>(null);
    const [historial, setHistorial] = useState<Historial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
        // 1️⃣ ENCARGO
        const { data: encargoData } = await supabase
            .from("encargos")
            .select("id,nombre,idea,estado")
            .eq("cliente_token", token)
            .single();

        if (!encargoData) {
            setEncargo(null);
            setLoading(false);
            return;
        }

        setEncargo(encargoData);

        // 2️⃣ HISTORIAL
        const { data: historialData } = await supabase
            .from("encargo_historial")
            .select("id,estado_anterior,estado_nuevo,created_at")
            .eq("encargo_id", encargoData.id)
            .order("created_at", { ascending: false });

        setHistorial(historialData || []);
        setLoading(false);
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <p className="p-10 text-white">Cargando estado del encargo...</p>;
    }

    if (!encargo) {
        return (
        <p className="p-10 text-red-500">
            Encargo no encontrado o enlace inválido.
        </p>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f0f15] text-white p-10">
        <h1 className="text-2xl font-bold mb-4">
            📦 Estado de tu encargo
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <p><b>Cliente:</b> {encargo.nombre}</p>
            <p><b>Idea:</b> {encargo.idea}</p>
            <p>
            <b>Estado actual:</b>{" "}
            <span className="text-green-400 font-semibold">
                {encargo.estado}
            </span>
            </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="font-semibold mb-3">🕒 Historial</h2>

            {historial.length === 0 && (
            <p className="text-sm text-zinc-400">
                Aún no hay cambios registrados.
            </p>
            )}

            <ul className="space-y-2 text-sm">
            {historial.map((h) => (
                <li key={h.id} className="text-zinc-300">
                {new Date(h.created_at).toLocaleString()} →{" "}
                <b>{h.estado_anterior}</b> →{" "}
                <b>{h.estado_nuevo}</b>
                </li>
            ))}
            </ul>
        </div>
        </main>
    );
}
