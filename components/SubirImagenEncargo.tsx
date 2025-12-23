"use client";

import { useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

interface Props {
    encargoId: string;
    onUploadSuccess?: () => void;
}

export default function SubirImagenEncargo({
    encargoId,
    onUploadSuccess,
    }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const subirImagen = async () => {
        if (!file) return alert("Selecciona una imagen");

        setLoading(true);

        const filePath = `${encargoId}/${Date.now()}-${file.name}`;

        // 1️⃣ subir a storage
        const { error: uploadError } = await supabase.storage
        .from("encargos")
        .upload(filePath, file);

        if (uploadError) {
        alert("❌ Error subiendo imagen");
        console.error(uploadError);
        setLoading(false);
        return;
        }

        // 2️⃣ obtener url
        const { data } = supabase.storage
        .from("encargos")
        .getPublicUrl(filePath);

        // 3️⃣ guardar en BD
        const { error: insertError } = await supabase
        .from("encargo_imagenes")
        .insert({
            encargo_id: encargoId,
            image_url: data.publicUrl,
            creado_por: "admin",
        });

        if (insertError) {
        alert("❌ Error guardando en base de datos");
        console.error(insertError);
        setLoading(false);
        return;
        }

        alert("✅ Imagen subida correctamente");
        setFile(null);
        onUploadSuccess?.();
        setLoading(false);
    };

    return (
        <div className="mt-4 space-y-2">
        <label className="block text-sm font-medium">Subir avance</label>

        <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {file && (
            <p className="text-xs text-zinc-400">
            Archivo: {file.name}
            </p>
        )}

        <button
            onClick={subirImagen}
            disabled={loading || !file}
            className="bg-pink-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50"
        >
            {loading ? "Subiendo..." : "Subir imagen"}
        </button>
        </div>
    );
}
