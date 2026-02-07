import React, { useEffect, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import imgageP from "/ProductoImage.jpg";

type Product = {
  id: number;
  title: string;
  brand: string;
  price: number;
  image: string;
  short: string;
  usage: string;
  specs: Record<string, string>;
  inStock: boolean;
};

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Imprimante",
    brand: "Impermeabilizante",
    price: 799,
    image: imgageP,
    short: "Preparacion de superficies",
    usage:
      "Se aplica como base antes del impermeabilizante para mejorar la adherencia y sellar poros en techos o muros.",
    specs: {
      Storage: "Tanqueta 10L",
    },
    inStock: true,
  },
  {
    id: 2,
    title: "Acabado",
    brand: "Impermeabilizante",
    price: 599,
    image: imgageP,
    short: "Presenta alta adherencia a las superficies después de imprimadas.",
    usage:
      "Capa final para proteger y prolongar la vida útil de la superficie impermeabilizada ante sol y lluvia.",
    specs: {
      Storage: "Tanqueta 10L",
    },
    inStock: true,
  },
  {
    id: 3,
    title: "Masilla Asfáltica",
    brand: "Impermeabilizante",
    price: 349,
    image: imgageP,
    short: "Para sellar juntas y grietas",
    usage:
      "Se usa para rellenar fisuras y juntas antes de aplicar el sistema impermeabilizante.",
    specs: {
      Storage: "Tanqueta 10L",
    },
    inStock: true,
  },
];

const CatalogoProductos: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detailsId, setDetailsId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
    setDetailsId((prev) => (prev === id ? null : prev));
  };

  const toggleDetails = (id: number) => {
    setDetailsId((prev) => (prev === id ? null : id));
  };

  const selectedProduct =
    detailsId === null
      ? null
      : mockProducts.find((product) => product.id === detailsId) || null;

  useEffect(() => {
    if (selectedProduct) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [selectedProduct]);

  return (
    <section id="catalogo" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Catálogo de productos"
          subtitle="Materiales y equipos para construcción (muestra)"
        />

        {/* Catálogo de productos, sin filtros ni precios destacados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {mockProducts.map((product) => {
            const expanded = expandedId === product.id;
            return (
              <article
                key={product.id}
                className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(product.id)}
                  className="w-full text-left"
                >
                  <div className="relative h-56 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full object-contain"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {product.brand}
                    </p>
                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                      {product.short}
                    </p>
                  </div>
                </button>

                {/* Área expandible con detalles */}
                <div
                  className={`${expanded ? "max-h-96 py-4" : "max-h-0"} overflow-hidden transition-all duration-300 border-t border-slate-100 dark:border-slate-700 px-4`}
                >
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="font-medium">{k}</span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => toggleDetails(product.id)}
                      className={`px-4 py-2 rounded-md font-medium bg-orange-600 text-white hover:bg-orange-700`}
                    >
                      Ver detalles
                    </button>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Ref: {product.id}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="producto-detalle-titulo"
          onClick={() => toggleDetails(selectedProduct.id)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-56 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="max-h-full object-contain"
              />
              <button
                type="button"
                onClick={() => toggleDetails(selectedProduct.id)}
                className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white text-slate-700 px-3 py-1 text-sm font-semibold shadow"
              >
                Cerrar
              </button>
            </div>
            <div className="p-6">
              <h3
                id="producto-detalle-titulo"
                className="text-xl font-semibold text-slate-900 dark:text-white"
              >
                {selectedProduct.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {selectedProduct.brand}
              </p>
              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                {selectedProduct.usage}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CatalogoProductos;
