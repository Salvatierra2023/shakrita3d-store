"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const figures = [
    {
        id: 1,
        name: "Zorrito Gamer",
        image: "/shakrita-hero.png",
        description: "Figura kawaii 3D estilo gamer",
    },
    {
        id: 2,
        name: "Zorrito Mágico",
        image: "/shakrita-hero.png",
        description: "Edición especial con efectos mágicos",
    },
    {
        id: 3,
        name: "Zorrito Aventurero",
        image: "/shakrita-hero.png",
        description: "Ideal para regalo personalizado",
    },
    ];

    export default function Gallery() {
    return (
        <section
        id="galeria"
        className="mx-auto max-w-7xl px-6 py-32"
        >
        {/* TÍTULO */}
        <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Galería de Figuras ✨
            </h2>
            <p className="mt-4 text-zinc-300 max-w-2xl mx-auto">
            Algunas de las figuras kawaii 3D que he diseñado e impreso.
            Cada pieza puede personalizarse a tu estilo.
            </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {figures.map((figure, index) => (
            <motion.div
                key={figure.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-3xl bg-white/5 backdrop-blur border border-white/10 overflow-hidden hover:border-pink-400/40 transition"
            >
                {/* IMAGEN */}
                <div className="relative h-72">
                <Image
                    src={figure.image}
                    alt={figure.name}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                </div>

                {/* INFO */}
                <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-white">
                    {figure.name}
                </h3>
                <p className="text-sm text-zinc-300">
                    {figure.description}
                </p>

                <button className="mt-4 w-full rounded-full bg-pink-500 px-5 py-3 text-base font-semibold text-white hover:bg-pink-400 transition shadow-lg">
                    Encargar figura
                </button>
                </div>
            </motion.div>
            ))}
        </div>
        </section>
    );
}
