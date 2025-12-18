"use client";

import Image from "next/image";

export default function Footer() {
    return (
        <footer
        id="contacto"
        className="mt-32 border-t border-white/10 bg-black/30 backdrop-blur"
        >
        <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* MARCA */}
            <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Image
                src="/logo-shakrita.png"
                alt="Shakrita3D Store"
                width={40}
                height={40}
                className="rounded-full"
                />
                <span className="text-white font-semibold text-lg">
                Shakrita3D Store
                </span>
            </div>

            <p className="text-sm text-zinc-400 max-w-sm">
                Figuras kawaii 3D diseñadas e impresas en Perú con amor,
                tecnología y un estilo único.
            </p>
            </div>

            {/* NAVEGACIÓN */}
            <div className="space-y-3 text-sm">
            <h4 className="text-white font-semibold mb-2">Navegación</h4>
            <ul className="space-y-2 text-zinc-400">
                <li><a href="#galeria" className="hover:text-white transition">Galería</a></li>
                <li><a href="#encargos" className="hover:text-white transition">Encargos</a></li>
                <li><a href="#sobre-mi" className="hover:text-white transition">Sobre mí</a></li>
            </ul>
            </div>

            {/* CONTACTO */}
            <div className="space-y-3 text-sm">
            <h4 className="text-white font-semibold mb-2">Contacto</h4>
            <ul className="space-y-2 text-zinc-400">
                <li>📍 Perú</li>
                <li>
                📲{" "}
                <a
                    href="https://wa.me/51999999999"
                    target="_blank"
                    className="hover:text-white transition"
                >
                    WhatsApp
                </a>
                </li>
                <li>
                📸{" "}
                <a
                    href="https://instagram.com/"
                    target="_blank"
                    className="hover:text-white transition"
                >
                    Instagram
                </a>
                </li>
                <li>
                🎵{" "}
                <a
                    href="https://tiktok.com/"
                    target="_blank"
                    className="hover:text-white transition"
                >
                    TikTok
                </a>
                </li>
            </ul>
            </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 py-6 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Shakrita3D Store · Hecho con 💖 en Perú
        </div>
        </footer>
    );
}
