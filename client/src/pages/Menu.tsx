/**
 * DESIGN SYSTEM: "Fuego y Brasas" — Página de Menú Digital
 * Menú completo con categorías, platos y precios.
 * Diseño responsive, fácil de leer en móvil.
 */

import { useState } from "react";
import { ChevronDown, Download, Home } from "lucide-react";
import { useLocation } from "wouter";

// Datos del menú
const MENU_DATA = {
  parrilla: {
    nombre: "🔥 Parrilla",
    platos: [
      { nombre: "Vacío (1/2 kg)", precio: 2800 },
      { nombre: "Parrillada Completa (2-3 pers)", precio: 4500 },
      { nombre: "Costillas (1/2 kg)", precio: 2600 },
      { nombre: "Chorizo (4 unidades)", precio: 1200 },
      { nombre: "Morcilla (4 unidades)", precio: 1000 },
      { nombre: "Tira de Asado (1/2 kg)", precio: 2400 },
      { nombre: "Pechuga de Pollo (1/2 kg)", precio: 1800 },
    ],
  },
  milanesas: {
    nombre: "🍖 Milanesas Gigantes",
    platos: [
      { nombre: "Milanesa Napolitana", precio: 1850 },
      { nombre: "Milanesa a la Portuguesa", precio: 1950 },
      { nombre: "Milanesa Completa (con huevo y jamón)", precio: 2100 },
      { nombre: "Milanesa Rellena de Queso", precio: 2050 },
      { nombre: "Milanesa con Salsa Champiñones", precio: 2000 },
    ],
  },
  pastas: {
    nombre: "🍝 Pastas Caseras",
    platos: [
      { nombre: "Tallarines a la Bolognesa", precio: 1450 },
      { nombre: "Tallarines a la Criolla", precio: 1400 },
      { nombre: "Ñoquis a la Sorrentina", precio: 1550 },
      { nombre: "Ravioles de Carne", precio: 1600 },
      { nombre: "Fideos Caseros con Tuco", precio: 1350 },
      { nombre: "Lasaña de la Casa", precio: 1700 },
    ],
  },
  empanadas: {
    nombre: "🥟 Empanadas Fritas",
    platos: [
      { nombre: "Empanada Criolla (1 unidad)", precio: 280 },
      { nombre: "Docena de Empanadas", precio: 3000 },
      { nombre: "Empanada de Jamón y Queso (1 unidad)", precio: 300 },
      { nombre: "Empanada de Verdura (1 unidad)", precio: 250 },
    ],
  },
  entrada: {
    nombre: "🍞 Entradas",
    platos: [
      { nombre: "Tabla de Quesos y Fiambres", precio: 2200 },
      { nombre: "Tabla de Verduras Grilladas", precio: 1800 },
      { nombre: "Tabla Mixta (quesos, fiambres, verduras)", precio: 3200 },
      { nombre: "Pan Casero (canasta)", precio: 400 },
      { nombre: "Provoleta", precio: 1200 },
    ],
  },
  bebidas: {
    nombre: "🍷 Bebidas",
    platos: [
      { nombre: "Vino Tinto (copa)", precio: 350 },
      { nombre: "Vino Blanco (copa)", precio: 350 },
      { nombre: "Cerveza Artesanal (botella)", precio: 450 },
      { nombre: "Gaseosa (botella)", precio: 200 },
      { nombre: "Agua Mineral (botella)", precio: 150 },
      { nombre: "Jugo Natural (vaso)", precio: 300 },
    ],
  },
  postres: {
    nombre: "🍰 Postres",
    platos: [
      { nombre: "Flan Casero", precio: 600 },
      { nombre: "Tiramisú", precio: 700 },
      { nombre: "Helado (3 sabores)", precio: 550 },
      { nombre: "Brownies Calientes", precio: 650 },
      { nombre: "Fruta de Estación", precio: 400 },
    ],
  },
};

function MenuCategory({ id, data }: { id: string; data: typeof MENU_DATA.parrilla }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mb-6 rounded-sm overflow-hidden" style={{ background: 'oklch(0.16 0.02 45)', border: '1px solid oklch(0.25 0.02 45)' }}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-opacity-80 transition-colors"
        style={{ background: 'oklch(0.18 0.02 45)' }}
      >
        <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
          {data.nombre}
        </h3>
        <ChevronDown
          size={20}
          className="text-amber-400 transition-transform"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </button>

      {/* Items */}
      {expanded && (
        <div className="px-6 py-4 space-y-3">
          {data.platos.map((plato, i) => (
            <div key={i} className="flex items-start justify-between gap-4 pb-3 border-b border-gray-700 last:border-b-0 last:pb-0">
              <div>
                <p className="text-gray-200 font-medium">{plato.nombre}</p>
              </div>
              <p className="text-amber-400 font-bold text-lg flex-shrink-0">
                ${plato.precio}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Menu() {
  const [, navigate] = useLocation();

  const downloadPDF = () => {
    // Generar PDF simple con los datos del menú
    const menuText = Object.entries(MENU_DATA)
      .map(([_, cat]) => {
        const items = cat.platos.map(p => `${p.nombre} .......................... $${p.precio}`).join('\n');
        return `${cat.nombre}\n${items}\n\n`;
      })
      .join('\n');

    const element = document.createElement('a');
    const file = new Blob([menuText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'menu-tano-dos-gallegos.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.11 0.018 45)' }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 py-4 border-b" style={{ background: 'oklch(0.12 0.018 45 / 0.98)', borderColor: 'oklch(0.22 0.02 45)' }}>
        <div className="container flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Home size={20} />
            <span className="font-semibold" style={{ fontFamily: 'Oswald, sans-serif' }}>Volver</span>
          </button>
          <h1 className="text-white text-2xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Menú Digital
          </h1>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 rounded-sm transition-colors border border-amber-500/50"
          >
            <Download size={18} />
            <span className="text-sm font-semibold" style={{ fontFamily: 'Oswald, sans-serif' }}>Descargar</span>
          </button>
        </div>
      </nav>

      {/* Contenido */}
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-white text-5xl font-bold mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Un Tano y Dos Gallegos
            </h2>
            <p className="text-gray-400 text-lg">Bodegón Argentino · Berazategui</p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="text-amber-400 text-sm font-semibold">4.3 ★</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400 text-sm">Todos los precios en pesos argentinos</span>
            </div>
          </div>

          {/* Categorías */}
          {Object.entries(MENU_DATA).map(([id, data]) => (
            <MenuCategory key={id} id={id} data={data} />
          ))}

          {/* Footer */}
          <div className="mt-12 p-6 rounded-sm text-center" style={{ background: 'oklch(0.16 0.02 45)', border: '1px solid oklch(0.25 0.02 45)' }}>
            <p className="text-gray-300 mb-4">¿Querés hacer una reserva?</p>
            <button
              onClick={() => navigate('/')}
              className="btn-cta"
            >
              Volver a la Landing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
