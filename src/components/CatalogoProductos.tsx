import React, { useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import imgageP from "/ProductoImage.jpg";

type Product = {
  id: number;
  title: string;
  brand: string;
  price: number;
  image: string;
  short: string;
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
    specs: {
      Storage: "Tanqueta 10L",
    },
    inStock: true,
  },
];

const CatalogoProductos: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleDetails = (product: Product) => {
    // Mostrar información del producto; no se realiza venta desde la landing
    alert(
      `Producto: ${product.title}\nMarca: ${product.brand}\n\nPara más información o presupuesto, contáctenos.`,
    );
  };

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
                      onClick={() => handleDetails(product)}
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
    </section>
  );
};

export default CatalogoProductos;
