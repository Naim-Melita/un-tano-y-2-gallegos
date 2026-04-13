/**
 * DESIGN SYSTEM: "Fuego y Brasas" — Un Tano y Dos Gallegos
 * Fondo negro cálido (#0f0a05), CTA rojo único, Oswald para títulos,
 * fotografía inmersiva full-bleed, layout asimétrico con drama de luz baja.
 */

import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Users, Clock, Star, Flame, ChevronDown, AlertTriangle } from "lucide-react";

// CDN URLs de imágenes generadas
const IMGS = {
  heroParrilla: "https://d2xsxph8kpxj0f.cloudfront.net/310519663552262366/hXVyt2kNowWD8cgPauvQGX/hero_parrilla_1b27321f.jpg",
  milanesa: "https://d2xsxph8kpxj0f.cloudfront.net/310519663552262366/hXVyt2kNowWD8cgPauvQGX/milanesa_nap_ba7a3fcf.jpg",
  mesaFamiliar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663552262366/hXVyt2kNowWD8cgPauvQGX/mesa_familiar_8c3fe64e.jpg",
  pastas: "https://d2xsxph8kpxj0f.cloudfront.net/310519663552262366/hXVyt2kNowWD8cgPauvQGX/pastas_caseras_a593b178.jpg",
  empanadas: "https://d2xsxph8kpxj0f.cloudfront.net/310519663552262366/hXVyt2kNowWD8cgPauvQGX/empanadas_fritas_c436a1c6.jpg",
};

// ─── Componente CTA Button ─────────────────────────────────────────────────
function CTAButton({ text = "Reservá tu mesa ahora", className = "", size = "lg" }: {
  text?: string;
  className?: string;
  size?: "lg" | "xl";
}) {
  const scrollToForm = () => {
    document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <button
      onClick={scrollToForm}
      className={`btn-cta btn-cta-pulse ${size === "xl" ? "text-xl py-5 px-10" : ""} ${className}`}
    >
      {text}
    </button>
  );
}

// ─── Stars ─────────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? "star-gold fill-current" : "text-gray-600"}
        />
      ))}
    </div>
  );
}

// ─── Scroll reveal hook ────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Sección Hero ──────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Imagen de fondo con Ken Burns */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMGS.heroParrilla}
          alt="Parrilla argentina humeante"
          className="w-full h-full object-cover ken-burns"
        />
        {/* Overlay oscuro dramático */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container py-24 md:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-amber-500/40 bg-amber-500/10 rounded-sm">
            <Flame size={14} className="text-amber-400" />
            <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">
              Bodegón Argentino · Berazategui
            </span>
          </div>

          {/* Headline */}
          <h1 className="fade-up fade-up-delay-1 text-white font-bold leading-none mb-4"
            style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
            Comé como en casa,<br />
            <span style={{ color: 'oklch(0.52 0.22 25)' }}>pero mejor.</span>
          </h1>

          {/* Subheadline */}
          <p className="fade-up fade-up-delay-2 text-gray-200 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Porciones gigantes para compartir. Parrilla, pastas y platos caseros en un auténtico bodegón de barrio donde nadie se queda con hambre.
          </p>

          {/* Beneficios */}
          <ul className="fade-up fade-up-delay-3 grid grid-cols-2 gap-2 mb-10 max-w-md">
            {[
              { icon: "🍖", text: "Porciones abundantes para compartir" },
              { icon: "👨‍👩‍👧", text: "Ideal para familia y amigos" },
              { icon: "🔥", text: "Parrilla al punto justo" },
              { icon: "🥟", text: "Recetas caseras tradicionales" },
            ].map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-200 text-sm">
                <span className="text-base leading-5">{b.icon}</span>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="fade-up fade-up-delay-4">
            <CTAButton size="xl" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60">
        <span className="text-white text-xs tracking-widest uppercase">Ver más</span>
        <ChevronDown size={20} className="text-white animate-bounce" />
      </div>
    </section>
  );
}

// ─── Sección Visual / Social Proof ────────────────────────────────────────
function VisualSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="py-20 overflow-hidden" style={{ background: 'oklch(0.13 0.018 45)' }}>
      <div className="container">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: 'Oswald, sans-serif' }}>
            Platos pensados para compartir
          </h2>
          <div className="flame-divider mx-auto" />
          <p className="text-gray-400 text-lg mt-4">Vení con hambre.</p>
        </div>

        {/* Grid asimétrico de imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Imagen grande — milanesa */}
          <div className={`md:col-span-7 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="menu-card h-72 md:h-[420px]">
              <img src={IMGS.milanesa} alt="Milanesa napolitana gigante" className="w-full h-full object-cover" />
              <div className="overlay" />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <p className="text-white font-bold text-2xl" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Milanesa Napolitana
                </p>
                <p className="text-gray-300 text-sm">Gigante · Para compartir</p>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className={`md:col-span-5 flex flex-col gap-3 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="menu-card h-52 md:h-[200px]">
              <img src={IMGS.mesaFamiliar} alt="Mesa familiar en el bodegón" className="w-full h-full object-cover" />
              <div className="overlay" />
              <div className="absolute bottom-0 left-0 p-4 z-10">
                <p className="text-white font-bold text-xl" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Ambiente Familiar
                </p>
                <p className="text-gray-300 text-xs">Bodegón de barrio auténtico</p>
              </div>
            </div>
            <div className="menu-card h-52 md:h-[207px]">
              <img src={IMGS.heroParrilla} alt="Parrilla argentina" className="w-full h-full object-cover" />
              <div className="overlay" />
              <div className="absolute bottom-0 left-0 p-4 z-10">
                <p className="text-white font-bold text-xl" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Parrilla al Punto
                </p>
                <p className="text-gray-300 text-xs">Vacío, costillas, chorizo y más</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA repetido */}
        <div className={`text-center mt-12 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <CTAButton />
        </div>
      </div>
    </section>
  );
}

// ─── Sección Testimonios ───────────────────────────────────────────────────
function TestimonialsSection() {
  const { ref, visible } = useScrollReveal();
  const testimonios = [
    { stars: 5, text: "Porciones enormes y muy ricas. Ideal para ir con amigos.", autor: "Martín G." },
    { stars: 4, text: "Comida casera, abundante y buen precio. Volvería sin dudar.", autor: "Claudia R." },
    { stars: 5, text: "Pedimos parrilla y sobró. Excelente para compartir.", autor: "Diego F." },
  ];
  return (
    <section ref={ref} className="py-20 relative overflow-hidden" style={{ background: 'oklch(0.11 0.018 45)' }}>
      {/* Fondo sutil con imagen de mesa */}
      <div className="absolute inset-0 opacity-5">
        <img src={IMGS.mesaFamiliar} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 container">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-2">Lo que dicen nuestros clientes</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
            4.3 ★ en Google
          </h2>
          <div className="flame-divider mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className={`p-6 rounded-sm transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                background: 'oklch(0.16 0.02 45)',
                border: '1px solid oklch(0.25 0.02 45)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <Stars count={t.stars} />
              <p className="text-gray-200 mt-4 mb-5 leading-relaxed italic"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                "{t.text}"
              </p>
              <p className="text-amber-400 text-sm font-semibold">— {t.autor}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sección Menú Destacado ────────────────────────────────────────────────
function MenuSection() {
  const { ref, visible } = useScrollReveal();
  const platos = [
    { img: IMGS.heroParrilla, nombre: "Parrilla", desc: "Vacío, parrillada completa, costillas y más. Para los que saben comer.", emoji: "🔥" },
    { img: IMGS.milanesa, nombre: "Milanesas Gigantes", desc: "Napolitana, a la portuguesa, con papas fritas. Tamaño familiar.", emoji: "🍖" },
    { img: IMGS.pastas, nombre: "Pastas Caseras", desc: "Tallarines, ñoquis y ravioles. Hechos en casa, como los de la abuela.", emoji: "🍝" },
    { img: IMGS.empanadas, nombre: "Empanadas Fritas", desc: "Criollas, jugosas, con repulgue. La entrada perfecta para arrancar.", emoji: "🥟" },
  ];
  return (
    <section ref={ref} className="py-20" style={{ background: 'oklch(0.14 0.018 45)' }}>
      <div className="container">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-2">Qué podés comer</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Todo hecho para que te vayas satisfecho
          </h2>
          <div className="flame-divider mx-auto mt-3" />
          <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
            Desde parrilla hasta pastas, todo hecho para que te vayas satisfecho.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platos.map((p, i) => (
            <div
              key={i}
              className={`menu-card rounded-sm transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="h-56 overflow-hidden">
                <img src={p.img} alt={p.nombre} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="overlay absolute inset-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <p className="text-2xl mb-1">{p.emoji}</p>
                <h3 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {p.nombre}
                </h3>
                <p className="text-gray-300 text-xs mt-1 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <CTAButton />
        </div>
      </div>
    </section>
  );
}

// ─── Sección Urgencia ─────────────────────────────────────────────────────
function UrgencyBanner() {
  return (
    <div className="py-5" style={{ background: 'oklch(0.52 0.22 25)' }}>
      <div className="container flex items-center justify-center gap-3 flex-wrap text-center">
        <AlertTriangle size={20} className="text-white flex-shrink-0" />
        <p className="text-white font-semibold text-base md:text-lg" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.04em' }}>
          Los fines de semana se llena rápido — asegurá tu lugar
        </p>
        <AlertTriangle size={20} className="text-white flex-shrink-0" />
      </div>
    </div>
  );
}

// ─── Sección Ubicación ────────────────────────────────────────────────────
function LocationSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="py-20" style={{ background: 'oklch(0.12 0.018 45)' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-2">Dónde estamos</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              En el corazón de Berazategui
            </h2>
            <div className="flame-divider mb-6" />
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Estamos en Berazategui, a metros del centro. Un lugar de barrio donde la comida habla por sí sola.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Berazategui, Buenos Aires</p>
                  <p className="text-gray-400 text-sm">A metros del centro</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Martes a Domingo</p>
                  <p className="text-gray-400 text-sm">Almuerzo y cena</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Reservas por WhatsApp</p>
                  <p className="text-gray-400 text-sm">Respondemos rápido</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/GYqmMGHvTSMaLyUv9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 transition-colors rounded-sm font-semibold"
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.06em' }}
            >
              <MapPin size={18} />
              Cómo llegar
            </a>
          </div>

          {/* Imagen de ambiente */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="menu-card rounded-sm h-80 md:h-96">
              <img src={IMGS.mesaFamiliar} alt="Interior del bodegón" className="w-full h-full object-cover" />
              <div className="overlay" />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center p-6">
                  <div className="flex justify-center mb-3">
                    <Stars count={4} />
                    <Star size={16} className="star-gold fill-current" style={{ opacity: 0.5 }} />
                  </div>
                  <p className="text-white text-5xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>4.3</p>
                  <p className="text-gray-300 text-sm mt-1">en Google Maps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sección Formulario de Reserva ────────────────────────────────────────
function ReservaSection() {
  const { ref, visible } = useScrollReveal();
  const [form, setForm] = useState({ nombre: "", telefono: "", personas: "", dia: "", horario: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular envío — en producción conectar con WhatsApp/email
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="reserva" ref={ref} className="py-20 relative overflow-hidden">
      {/* Fondo con imagen */}
      <div className="absolute inset-0 z-0">
        <img src={IMGS.heroParrilla} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 container">
        <div className="max-w-2xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-2">Reservas</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Reservá tu mesa en segundos
            </h2>
            <div className="flame-divider mx-auto mt-3" />
          </div>

          {submitted ? (
            <div className={`text-center p-10 rounded-sm transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ background: 'oklch(0.16 0.02 45)', border: '1px solid oklch(0.52 0.22 25 / 0.5)' }}>
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white text-3xl font-bold mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
                ¡Reserva recibida!
              </h3>
              <p className="text-gray-300 text-lg">
                Te contactamos por WhatsApp para confirmar tu mesa. ¡Nos vemos pronto!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={`p-8 rounded-sm transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ background: 'oklch(0.14 0.018 45 / 0.95)', border: '1px solid oklch(0.28 0.02 45)' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nombre */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wide">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="input-dark"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wide">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="11 1234-5678"
                    required
                    className="input-dark"
                  />
                </div>

                {/* Personas */}
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wide">
                    Cantidad de personas
                  </label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      name="personas"
                      value={form.personas}
                      onChange={handleChange}
                      required
                      className="input-dark pl-9 appearance-none"
                      style={{ background: 'oklch(0.18 0.018 45)' }}
                    >
                      <option value="">Seleccioná</option>
                      {["1-2", "3-4", "5-6", "7-8", "9 o más"].map(v => (
                        <option key={v} value={v}>{v} personas</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Día */}
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wide">
                    Día
                  </label>
                  <input
                    type="date"
                    name="dia"
                    value={form.dia}
                    onChange={handleChange}
                    required
                    className="input-dark"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>

                {/* Horario */}
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wide">
                    Horario preferido
                  </label>
                  <select
                    name="horario"
                    value={form.horario}
                    onChange={handleChange}
                    required
                    className="input-dark appearance-none"
                    style={{ background: 'oklch(0.18 0.018 45)' }}
                  >
                    <option value="">Seleccioná</option>
                    <option value="almuerzo-12">Almuerzo 12:00</option>
                    <option value="almuerzo-13">Almuerzo 13:00</option>
                    <option value="almuerzo-14">Almuerzo 14:00</option>
                    <option value="cena-20">Cena 20:00</option>
                    <option value="cena-21">Cena 21:00</option>
                    <option value="cena-22">Cena 22:00</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-cta w-full mt-6 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Reservar ahora"
                )}
              </button>

              <p className="text-gray-500 text-xs text-center mt-4">
                Te confirmamos por WhatsApp. Sin cargo hasta el día de la reserva.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Sección CTA Final ────────────────────────────────────────────────────
function FinalCTASection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={IMGS.mesaFamiliar} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      <div className="relative z-10 container text-center">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">¿Esperando qué?</p>
          <h2 className="text-white font-bold mb-4 leading-tight"
            style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            No vengas con hambre…<br />
            <span style={{ color: 'oklch(0.52 0.22 25)' }}>vení con amigos.</span>
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-lg mx-auto">
            Una mesa llena de platos, risas y vino. Así se come en Un Tano y Dos Gallegos.
          </p>
          <CTAButton size="xl" />
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 border-t" style={{ background: 'oklch(0.09 0.015 45)', borderColor: 'oklch(0.22 0.02 45)' }}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-2xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Un Tano y Dos Gallegos
            </h3>
            <p className="text-gray-500 text-sm mt-1">Bodegón Argentino · Berazategui, Buenos Aires</p>
          </div>
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <a
              href="https://maps.app.goo.gl/GYqmMGHvTSMaLyUv9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <MapPin size={14} />
              Cómo llegar
            </a>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Star size={14} className="star-gold fill-current" />
              4.3 en Google
            </span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-gray-600 text-xs" style={{ borderColor: 'oklch(0.18 0.018 45)' }}>
          © {new Date().getFullYear()} Un Tano y Dos Gallegos. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'oklch(0.11 0.018 45 / 0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid oklch(0.22 0.02 45)' : 'none',
      }}
    >
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Flame size={22} className="text-amber-400" />
          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.04em' }}>
            Un Tano y Dos Gallegos
          </span>
        </div>
        <CTAButton text="Reservar" className="text-sm py-2 px-5" />
      </div>
    </nav>
  );
}

// ─── Página Principal ─────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.11 0.018 45)' }}>
      <Navbar />
      <HeroSection />
      <VisualSection />
      <TestimonialsSection />
      <UrgencyBanner />
      <MenuSection />
      <LocationSection />
      <ReservaSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
