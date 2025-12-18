"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
        initial={{ backgroundColor: "rgba(0,0,0,0)" }}
        animate={{
            backgroundColor: scrolled ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0)",
            boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.2)" : "none",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md"
        >
        <div className={`mx-auto max-w-7xl px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
            
            {/* LOGO */}
            <div className="flex items-center gap-3">
            <Image
                src="/logo-shakrita.png"
                alt="Shakrita3D Store"
                width={36}
                height={36}
                className="rounded-full"
            />
            <span className="text-white font-semibold tracking-wide">
                Shakrita3D Store
            </span>
            </div>

            {/* MENU */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-200">
            <a href="#galeria" className="hover:text-white transition">Galería</a>
            <a href="#encargos" className="hover:text-white transition">Encargos</a>
            <a href="#sobre-mi" className="hover:text-white transition">Sobre mí</a>
            <a href="#contacto" className="hover:text-white transition">Contacto</a>
            </nav>

            {/* CTA */}
            <a
            href="#encargos"
            className="hidden md:inline-block rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white hover:bg-pink-400 transition shadow-lg"
            >
            Encargar
            </a>
        </div>
        </motion.header>
    );
}
