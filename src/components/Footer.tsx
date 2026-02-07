import type { FC } from "react";
import { Github, Phone } from "lucide-react";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <a
              href="#home"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              AHUNAO
              <span className="text-orange-600 dark:text-orange-400">
                Caribe
              </span>
            </a>
            <p className="text-slate-300 mb-6 max-w-md">
              Empresa de construcción especializada en proyectos residenciales y
              comerciales. Calidad, cumplimiento y seguridad en cada obra.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Github size={20} className="text-slate-300" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Phone size={20} className="text-slate-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-slate-300">
                <span className="block">La Habana, Cuba</span>
              </li>
              <li>
                <a
                  href="mailto:info@ahunaocaribe.com"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  info@ahunaocaribe.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+53 53724241"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  +53 53724241
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} AHUNAOCaribe. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
