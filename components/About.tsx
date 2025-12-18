"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
    return (
        <section
        id="sobre-mi"
        className="mx-auto max-w-7xl px-6 py-32"
        >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* IMAGEN / ILUSTRACIÓN */}
            <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
            >
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-pink-400/30 via-purple-400/20 to-cyan-300/20 blur-3xl"></div>

            <Image
                src="/shakrita-about.png"
                alt="Creadora de Shakrita3D Store"
                width={360}
                height={360}
                className="relative rounded-3xl shadow-2xl"
            />
            </motion.div>

            {/* TEXTO */}
            <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 text-center md:text-left"
            >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Hola, soy <span className="text-pink-400">Emilia</span> 💖
            </h2>

            <p className="text-lg text-zinc-300 leading-relaxed">
                Soy egresada de Ingeniería de Sistemas y creadora de
                <span className="text-white font-semibold"> Shakrita3D Store</span>.
                Combino tecnología, diseño 3D y un estilo kawaii elegante
                para crear figuras únicas y personalizadas.
            </p>

            <p className="text-zinc-400 leading-relaxed">
                Cada figura es diseñada, impresa y acabada con dedicación,
                cuidando cada detalle para que no sea solo un objeto,
                sino una pieza especial pensada para regalar o coleccionar.
            </p>

            <p className="text-zinc-400 leading-relaxed">
                Mi objetivo es transformar ideas en figuras que transmitan
                ternura, personalidad y calidad profesional ✨
            </p>

            <div className="pt-4">
                <a
                href="#encargos"
                className="inline-flex items-center rounded-full bg-pink-500 px-8 py-4 text-sm font-semibold text-white hover:bg-pink-400 transition shadow-lg"
                >
                Encargar mi figura 💕
                </a>
            </div>
            </motion.div>
        </div>
        </section>
    );
}
