"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Encargo, FiltroEstado, EstadoEncargo } from "@/src/types/encargo";
import HistorialEncargo from "@/components/HistorialEncargo";
import ComentariosEncargo from "@/components/ComentariosEncargo";
import SubirImagenEncargo from "@/components/SubirImagenEncargo";
import ImagenesEncargo from "@/components/ImagenesEncargo";

/* =====================
    COMPONENTE
===================== */
export default function AdminPage() {
    const router = useRouter();

/*    const [filtro, setFiltro] = useState<"Todos" | "En proceso" | "Listo">("Todos");

    const filtros: ("Todos" | "En proceso" | "Listo")[] = [
        "Todos",
        "En proceso",
        "Listo",
    ]; */

    const filtros: FiltroEstado[] = ["Todos", "En proceso", "Listo"];
    const [filtro, setFiltro] = useState<FiltroEstado>("Todos");

    const [encargos, setEncargos] = useState<Encargo[]>([]);
    const [loading, setLoading] = useState(true);
    const [checkingSession, setCheckingSession] = useState(true);

    const total = encargos.length;
    const enProceso = encargos.filter(e => e.estado === "En proceso").length;
    const listos = encargos.filter(e => e.estado === "Listo").length;

    /* =====================
        PROTEGER RUTA /admin
    ===================== */
    useEffect(() => {
        const checkSession = async () => {
        const { data } = await supabase.auth.getSession();

        if (!data.session) {
            router.push("/login");
        } else {
            setCheckingSession(false);
        }
        };

        checkSession();
    }, [router]);

    /* =====================
        OBTENER ENCARGOS
    ===================== */
    useEffect(() => {
        const fetchEncargos = async () => {
        const { data, error } = await supabase
            .from("encargos")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setEncargos(data);
        }

        setLoading(false);
        };

        fetchEncargos();
    }, []);

    /* =====================
        ACTUALIZAR ESTADO
    ===================== */
    const updateEstado = async (
        encargo: Encargo,
        nuevoEstado: EstadoEncargo
        ) => {
        const { data: session } = await supabase.auth.getUser();

        // 1️⃣ Actualizar estado del encargo
        const { error } = await supabase
            .from("encargos")
            .update({ estado: nuevoEstado })
            .eq("id", encargo.id);

        if (error) return;

        // 2️⃣ Guardar historial
        await supabase.from("encargo_historial").insert({
            encargo_id: encargo.id,
            estado_anterior: encargo.estado,
            estado_nuevo: nuevoEstado,
            cambiado_por: session.user?.email ?? "admin",
        });

        // 3️⃣ Actualizar UI
        setEncargos((prev) =>
            prev.map((e) =>
            e.id === encargo.id ? { ...e, estado: nuevoEstado } : e
            )
        );
    };


    /* =====================
        ABRIR WHATSAPP
    ===================== */
    const abrirWhatsApp = (
        nombre: string,
        whatsapp: string,
        estado: string
    ) => {
        const numero = whatsapp.replace(/\D/g, "");

        const mensaje = `
    Hola ${nombre} 👋
    Soy Shakrita3D ✨

    Tu encargo está ahora en estado: *${estado}* 💖

    Cualquier duda escríbeme por aquí 😊
        `.trim();

        const url = `https://wa.me/51${numero}?text=${encodeURIComponent(
        mensaje
        )}`;
        window.open(url, "_blank");
    };

    /* =====================
        ESTADOS DE CARGA
    ===================== */
    if (checkingSession) {
        return <p className="p-10 text-white">🔐 Verificando sesión...</p>;
    }

    if (loading) {
        return <p className="p-10 text-white">📦 Cargando encargos...</p>;
    }

    /* =====================
        UI
    ===================== */
    const encargosFiltrados = encargos.filter(
        (e) => filtro === "Todos" || e.estado === filtro
    );

    return (
        <main className="min-h-screen bg-[#0f0f15] text-white p-10">
        <h1 className="text-3xl font-bold mb-8">📋 Panel de Encargos</h1>

        <div className="flex gap-3 mb-6">
            {filtros.map((f) => (
                <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 rounded-lg text-sm
                    ${filtro === f ? "bg-pink-500 text-white" : "bg-white/5 text-zinc-300"}
                `}
                >
                {f}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                <p className="text-zinc-400 text-sm">Total encargos</p>
                <p className="text-3xl font-bold">{total}</p>
            </div>

            <div className="rounded-xl bg-yellow-400/20 border border-yellow-400/40 p-5">
                <p className="text-yellow-300 text-sm">En proceso</p>
                <p className="text-3xl font-bold text-yellow-300">{enProceso}</p>
            </div>

            <div className="rounded-xl bg-green-500/20 border border-green-500/40 p-5">
                <p className="text-green-300 text-sm">Listos</p>
                <p className="text-3xl font-bold text-green-300">{listos}</p>
            </div>
        </div>

        <div className="space-y-6">
            {encargosFiltrados.map((e) => (
            <div
                key={e.id}
                className="rounded-xl bg-white/5 border border-white/10 p-6"
            >
                <p><b>Nombre:</b> {e.nombre}</p>
                <p><b>WhatsApp:</b> {e.whatsapp}</p>
                <p><b>Idea:</b> {e.idea}</p>
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                        ${e.estado === "En proceso" && "bg-yellow-400 text-black"}
                        ${e.estado === "Listo" && "bg-green-500 text-black"}
                    `}
                    >
                    {e.estado}
                </span>

                <div className="flex flex-wrap gap-3 mt-4">
                <button
                    onClick={() => updateEstado(e, "En proceso")}
                    className="px-4 py-2 rounded-lg bg-yellow-400 text-black text-sm hover:bg-yellow-300"
                >
                    En proceso
                </button>

                <button
                    onClick={() => updateEstado(e, "Listo")}
                    className="px-4 py-2 rounded-lg bg-green-500 text-black text-sm hover:bg-green-400"
                >
                    Listo
                </button>

                <button
                    onClick={() =>
                    abrirWhatsApp(e.nombre, e.whatsapp, e.estado)
                    }
                    className="px-4 py-2 rounded-lg bg-pink-500 text-white text-sm hover:bg-pink-400"
                >
                    💬 Responder por WhatsApp
                </button>
                                
                </div>

                {/* 🖼️ VER AVANCES */}
                <div className="mt-4">
                <ImagenesEncargo encargoId={e.id} />
                </div>

                <HistorialEncargo encargoId={e.id} />
                <ComentariosEncargo encargoId={e.id} />

                <p className="text-sm text-zinc-400 mt-3">
                {new Date(e.created_at).toLocaleString()}
                </p>
            </div>
            
            ))}
        </div>
        </main>
    );
}
