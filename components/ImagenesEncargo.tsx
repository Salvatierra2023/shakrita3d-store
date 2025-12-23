"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/src/lib/supabaseClient";
import SubirImagenEncargo from "./SubirImagenEncargo";

type Imagen = {
    id: string;
    image_url: string;
    created_at: string;
};

export default function ImagenesEncargo({
    encargoId,
}: {
    encargoId: string;
}) {
    const [imagenes, setImagenes] = useState<Imagen[]>([]);
    const [loading, setLoading] = useState(false);

    /* =====================
        CARGAR IMÁGENES
    ===================== */
    const cargarImagenes = useCallback(async () => {
        setLoading(true);

        const { data, error } = await supabase
        .from("encargo_imagenes")
        .select("*")
        .eq("encargo_id", encargoId)
        .order("created_at", { ascending: false });

        if (!error && data) {
        setImagenes(data);
        }

        setLoading(false);
    }, [encargoId]);

    /* =====================
        PRIMERA CARGA
        (sin warning ESLint)
    ===================== */
    useEffect(() => {
        cargarImagenes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mt-4 space-y-4">
        {/* 📤 SUBIR IMAGEN */}
        <SubirImagenEncargo
            encargoId={encargoId}
            onUploadSuccess={cargarImagenes}
        />

        {/* ⏳ CARGANDO */}
        {loading && (
            <p className="text-sm text-zinc-400">Cargando avances...</p>
        )}

        {/* 📭 SIN IMÁGENES */}
        {!loading && imagenes.length === 0 && (
            <p className="text-sm text-zinc-400">Aún no hay avances.</p>
        )}

        {/* 🖼️ GALERÍA */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagenes.map((img) => (
            <Image
                key={img.id}
                src={img.image_url}
                alt="Avance del encargo"
                width={400}
                height={400}
                className="rounded border border-white/10 object-cover"
            />
            ))}
        </div>
        </div>
    );
}
