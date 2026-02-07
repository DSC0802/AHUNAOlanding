import { useEffect, useRef, type FC } from "react";
import hammerIcon from "/hammer.svg";
import helmetIcon from "/hard-hat.svg";
import shovelIcon from "/shovel.svg";

const servicesData = [
  {
    icon: <img src={hammerIcon} className="w-10 h-10" />,
    title: "Construcción Residencial",
    description:
      "Diseño y ejecución de viviendas con acabados de calidad y cumplimiento normativo.",
  },
  {
    icon: <img src={helmetIcon} className="w-10 h-10" />,
    title: "Obras Comerciales e Industriales",
    description:
      "Proyectos a gran escala, coordinación técnica y control de calidad en cada fase.",
  },
  {
    icon: <img src={shovelIcon} className="w-10 h-10" />,
    title: "Remodelaciones y Mantenimiento",
    description:
      "Renovaciones integrales, rehabilitación estructural y planes de mantenimiento preventivo.",
  },
];

const Services: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.remove("opacity-0", "translate-y-6");
          el.classList.add("opacity-100", "translate-y-0");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      itemsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section
      id="services"
      className="py-20 bg-white text-slate-900 md:bg-slate-900 md:text-white"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div
          className="text-center mb-16 transition-opacity duration-700 ease-out"
          style={{ transitionDelay: "100ms" }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-yellow-500 mb-2">
            SERVICIOS
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 md:text-white">
            Servicios: Construcción, reparaciones y accesorios
          </h2>
          <p className="mt-3 text-slate-600 md:text-slate-300">
            Servicio personalizado, producto de calidad y garantía en todas las
            reparaciones.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {servicesData.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="text-center px-6 py-8 opacity-0 translate-y-6 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-center mb-6">{service.icon}</div>
              <h4 className="text-xl font-semibold text-slate-900 md:text-white mb-3">
                {service.title}
              </h4>
              <p className="text-slate-600 md:text-slate-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
