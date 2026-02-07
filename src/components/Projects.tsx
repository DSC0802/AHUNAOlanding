import React, { useMemo, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
//import LoginModal from "./LoginModal";
//import RegisterModal from "./RegisterModal";
import Hotel from "/hotel.webp";
import PuenGrandes from "/PuentesGrandes.jpg";
import Colonial from "/HotelColonial.jpg";

type Project = {
  id: number;
  title: string;
  location: string;
  budget: number;
  image: string;
  short: string;
  specs: Record<string, string>;
  status: "Completado" | "En curso" | "Planeado";
};

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Residencial Sol y Mar",
    location: "Varadero, Cuba",
    budget: 120000,
    image: Hotel,
    short:
      "Conjunto de viviendas con acabados modernos y eficiencia energética.",
    specs: { Superficie: "3,200 m²", Unidades: "24", Estado: "Completado" },
    status: "Completado",
  },
  {
    id: 2,
    title: "Centro Comercial Puentes Grandes",
    location: "La Habana, Cuba",
    budget: 450000,
    image: PuenGrandes,
    short: "Desarrollo comercial con zonas de retail, oficinas y parqueos.",
    specs: { Área: "12,000 m²", Niveles: "3", Estado: "En curso" },
    status: "En curso",
  },
  {
    id: 3,
    title: "Remodelación Hotel Colonial",
    location: "Trinidad, Cuba",
    budget: 80000,
    image: Colonial,
    short: "Rehabilitación integral preservando valor patrimonial.",
    specs: { Habitaciones: "48", Área: "4,500 m²", Estado: "Planeado" },
    status: "Planeado",
  },
];

const Projects: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return mockProjects.filter((p) => {
      if (
        query &&
        !p.title.toLowerCase().includes(query.toLowerCase()) &&
        !p.short.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query]);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleInquiry = (project: Project) => {
    const ok = window.confirm(`Solicitar información para ${project.title}?`);
    if (ok) {
      console.log("Solicitud enviada para proyecto", project);
      alert(
        "Gracias. Su solicitud ha sido recibida. Nos comunicaremos pronto.",
      );
    }
  };

  return (
    <section id="projects" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Proyectos"
          subtitle="Algunos trabajos destacados"
        />

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <input
              placeholder="Buscar proyectos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map((project) => {
            const expanded = expandedId === project.id;
            return (
              <article
                key={project.id}
                className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(project.id)}
                  className="w-full text-left"
                >
                  <div className="relative h-56 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {project.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                          ${project.budget.toLocaleString()}
                        </div>
                        <div
                          className={`text-xs ${project.status === "Completado" ? "text-green-600" : project.status === "En curso" ? "text-yellow-500" : "text-sky-500"}`}
                        >
                          {project.status}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                      {project.short}
                    </p>
                  </div>
                </button>

                <div
                  className={`${expanded ? "max-h-96 py-4" : "max-h-0"} overflow-hidden transition-all duration-300 border-t border-slate-100 dark:border-slate-700 px-4`}
                >
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                    {Object.entries(project.specs).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="font-medium">{k}</span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => handleInquiry(project)}
                      className={`px-4 py-2 rounded-md font-medium bg-orange-600 text-white hover:bg-orange-700`}
                    >
                      Solicitar info
                    </button>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      ID: {project.id}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Login/register modals hidden for now */}
    </section>
  );
};

export default Projects;
