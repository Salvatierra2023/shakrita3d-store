"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 items-center gap-16 relative"
        >
        {/* Glow fondo */}
        <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-pink-400/30 via-purple-400/20 to-cyan-300/20 blur-3xl"></div>

        {/* TEXTO */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6 relative z-10 text-center md:text-left"
        >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Figuras <span className="text-pink-400">Kawaii</span> 3D
            <br />
            hechas en Perú ✨
            </h1>

            <p className="text-lg md:text-xl text-zinc-300 max-w-xl leading-relaxed">
            Diseño, impresión y acabado artesanal de figuras kawaii 3D.
            Cada pieza es creada con amor, precisión y una identidad única.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="rounded-full bg-zinc-900 text-white px-8 py-4 text-sm font-semibold hover:bg-zinc-800 transition shadow-lg">
                Ver galería
            </button>

            <button className="rounded-full bg-white/80 backdrop-blur border border-zinc-300 px-8 py-4 text-sm font-semibold hover:bg-white transition shadow">
                Encargar figura
            </button>
            </div>
        </motion.div>

        {/* FIGURA */}
        <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex justify-center z-10"
        >
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-pink-400/40 to-purple-500/30 blur-3xl animate-pulse"></div>

            <Image
            src="/shakrita-hero.png"
            alt="Figura Kawaii 3D Shakrita"
            width={420}
            height={420}
            className="relative drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
            priority
            />
        </motion.div>
        </motion.section>
    );
}
