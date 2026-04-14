/**
 * Componente QR del Menú
 * Muestra código QR escaneable que apunta a la página de menú digital
 */

import { Download, QrCode } from "lucide-react";
import { useLocation } from "wouter";
import QRCode from "react-qr-code";

const QR_URL = import.meta.env.VITE_PAGE_URL+"/menu";

export function QRMenu() {
  const [, navigate] = useLocation();

  const downloadQR = () => {
    const svg = document.querySelector("svg") as SVGElement;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "menu-qr-tano-dos-gallegos.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="flex flex-col items-center gap-4 p-6 rounded-sm"
      style={{
        background: "oklch(0.16 0.02 45)",
        border: "1px solid oklch(0.25 0.02 45)",
      }}
    >
      {/* Icono */}
      <div
        className="flex items-center justify-center w-16 h-16 rounded-sm"
        style={{ background: "oklch(0.18 0.02 45)" }}
      >
        <QrCode size={32} className="text-amber-400" />
      </div>

      {/* Texto */}
      <div className="text-center">
        <h3
          className="text-white font-bold text-lg mb-1"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          Escanea el menú
        </h3>
        <p className="text-gray-400 text-sm">
          Accedé al menú digital desde tu teléfono
        </p>
      </div>

      {/* QR con la nueva librería */}
      <div className="p-3 rounded-sm bg-white">
        <QRCode value={QR_URL} size={192} bgColor="#ffffff" fgColor="#000000" />
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={() => navigate("/menu")}
          className="btn-cta w-full text-sm py-2"
        >
          Ver Menú Digital
        </button>
        <button
          onClick={downloadQR}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 rounded-sm transition-colors text-sm font-semibold"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          <Download size={16} />
          Descargar QR
        </button>
      </div>

      {/* Nota */}
      <p className="text-gray-500 text-xs text-center mt-2">
        O escanea con la cámara de tu teléfono
      </p>
    </div>
  );
}
