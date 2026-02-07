import React, { useEffect, useRef } from "react";
import { Smartphone, Globe, Phone, Heart } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import ImageAbout from "/AboutImage.jpg";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add(
            "opacity-100",
            "translate-y-0",
            "transition-all",
            "duration-700",
            "ease-out",
          );
          el.classList.remove("opacity-0", "translate-y-6");
          if (observer) observer.unobserve(el);
        }
      });
    };

    observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

    const elementsToObserve = [
      titleRef.current,
      imageRef.current,
      contentRef.current,
      statsRef.current,
    ];
    elementsToObserve.forEach((el) => {
      if (el && observer) observer.observe(el);
    });

    return () => {
      if (observer) {
        elementsToObserve.forEach((el) => {
          if (el && observer) observer.unobserve(el);
        });
        observer.disconnect();
      }
    };
  }, []);

  const stats = [
    {
      id: 1,
      icon: <Smartphone size={24} />,
      value: "250+",
      label: "Proyectos completados",
    },
    {
      id: 2,
      icon: <Globe size={24} />,
      value: "15+",
      label: "Años de experiencia",
    },
    {
      id: 3,
      icon: <Phone size={24} />,
      value: "500+",
      label: "Clientes satisfechos",
    },
    {
      id: 4,
      icon: <Heart size={24} />,
      value: "ISO 9001",
      label: "Certificaciones",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-slate-900"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={titleRef}
          className="opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          <SectionTitle
            title="Sobre Nuestra Empresa"
            subtitle="Servicios de calidad"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-16">
          {/* Store Image */}
          <div
            ref={imageRef}
            className="lg:col-span-2 opacity-0 translate-y-6 transition-all duration-700 ease-out"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square max-w-md mx-auto">
              <img
                src={ImageAbout}
                alt="Proyecto de construcción"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Store Content */}
          <div
            ref={contentRef}
            className="lg:col-span-3 flex flex-col space-y-6 opacity-0 translate-y-6 transition-all duration-700 ease-out"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                AHUNAO Caribe se constituye como una Sociedad Unipersonal de
                Responsabilidad Limitada (SURL) de nacionalidad cubana
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                Contamos con equipos técnicos certificados, procesos de control
                de calidad y gestión de proyectos para cumplir plazos y
                presupuestos.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                Desarrollamos, producimos y comercializamos nuestros principales
                insumos. Además brindamos soluciones a nuestros clientes de
                protección contra humedades , de alto rendimiento y a precios
                atractivos.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="#projects"
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Ver proyectos
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-24 opacity-0 translate-y-6 transition-all duration-700 ease-out"
          style={{ transitionDelay: "400ms" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
