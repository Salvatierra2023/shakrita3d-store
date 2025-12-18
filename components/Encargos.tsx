export default function Encargos() {
    const whatsappNumber = "51927802124"; // <-- cambia por tu número real
    const message =
        "Hola ✨ Vi tus figuras kawaii 3D y me gustaría encargar una figura personalizada.";

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
    )}`;

    return (
        <section
        id="encargos"
        className="mx-auto max-w-7xl px-6 py-32"
        >
        <div className="relative rounded-3xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-400/20 border border-white/10 p-12 text-center overflow-hidden">
            
            {/* Glow */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-pink-400/30 via-purple-400/20 to-cyan-300/20 blur-3xl"></div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Descarga tu figura personalizada 💖
            </h2>

            <p className="text-lg text-zinc-200">
                ¿Tienes una idea, personaje o regalo especial en mente?
                Escríbeme por WhatsApp y creemos juntos tu figura kawaii 3D.
            </p>

            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-pink-500 px-8 py-4 text-lg font-semibold text-white hover:bg-pink-400 transition shadow-xl"
            >
                📲 Escribirme por WhatsApp
            </a>

            <p className="text-sm text-zinc-300">
                Atención personalizada · Envíos a nivel nacional 🇵🇪
            </p>
            </div>
        </div>
        </section>
    );
}
