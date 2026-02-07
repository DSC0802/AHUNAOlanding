import React, { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Solicitud de presupuesto",
    message: "",
    orderNumber: "",
    phone: "",
    projectReference: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    const elementsToObserve = [
      titleRef.current,
      infoRef.current,
      formContainerRef.current,
    ];
    elementsToObserve.forEach((el) => {
      if (el && observer) observer.observe(el);
    });

    return () => {
      if (observer) {
        elementsToObserve.forEach((el) => {
          if (el) observer!.unobserve(el);
        });
        observer.disconnect();
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) =>
    phone.replace(/[^0-9]/g, "").length >= 7;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const { name, email, subject, message, orderNumber, phone } = formState;

    if (!name || name.trim().length < 2)
      newErrors.name = "Por favor ingrese su nombre (al menos 2 caracteres).";
    if (!email || !validateEmail(email))
      newErrors.email = "Por favor ingrese un correo válido.";

    const allowedSubjects = [
      "Solicitud de presupuesto",
      "Consulta técnica",
      "Mantenimiento",
      "Proyecto existente",
      "Otros",
    ];
    if (!subject || !allowedSubjects.includes(subject))
      newErrors.subject = "Por favor seleccione un motivo válido.";

    if (!message || message.trim().length < 10)
      newErrors.message =
        "Por favor escriba un mensaje más detallado (al menos 10 caracteres).";

    if (subject === "Proyecto existente") {
      if (!orderNumber || orderNumber.trim().length < 4)
        newErrors.orderNumber =
          "Por favor indique el número o referencia del proyecto.";
    }

    if (subject === "Consulta técnica") {
      if (!phone || !validatePhone(phone))
        newErrors.phone = "Por favor ingrese un teléfono de contacto válido.";
    }

    if (subject === "Solicitud de presupuesto") {
      if (
        !formState.projectReference ||
        formState.projectReference.trim().length < 2
      )
        newErrors.projectReference =
          "Por favor indique referencia o breve descripción del proyecto.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstKey = Object.keys(errors)[0];
      const el = firstKey
        ? (formRef.current?.querySelector(
            `[name="${firstKey}"]`,
          ) as HTMLElement | null)
        : null;
      if (el) el.focus();
      return;
    }

    // Submit (demo)
    console.log("Form submitted:", formState);
    setFormSubmitted(true);
    setFormState({
      name: "",
      email: "",
      subject: "Product availability",
      message: "",
      orderNumber: "",
      phone: "",
      projectReference: "",
    });
    setErrors({});
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const { subject } = formState;

  return (
    <section
      id="contact"
      className="py-20 bg-slate-50 dark:bg-slate-800"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={titleRef}
          className="opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          <SectionTitle
            title="Contacto"
            subtitle="Solicite presupuesto, consultas técnicas o información sobre proyectos"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Contact Info */}
          <div
            ref={infoRef}
            className="opacity-0 translate-y-6 transition-all duration-700 ease-out"
            style={{ transitionDelay: "100ms" }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Visítenos o contáctenos
            </h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
              AHUNAO Caribe ofrece servicios de construcción, remodelación y
              mantenimiento. Solicite un presupuesto o consulte sobre nuestros
              proyectos y servicios técnicos.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Icons.Mail size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-medium text-slate-900 dark:text-white">
                    Email
                  </h4>
                  <a
                    href="mailto:info@ahunaocaribe.com"
                    className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    info@ahunaocaribe.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Icons.Phone size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-medium text-slate-900 dark:text-white">
                    Teléfono
                  </h4>
                  <a
                    href="tel:+5353724241"
                    className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    +53 53724241
                  </a>
                  <div className="mt-2">
                    <a
                      href="https://wa.me/5353724241"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      WhatsApp: +53 53724241
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Icons.MapPin size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-medium text-slate-900 dark:text-white">
                    Ubicación
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Calle 288, s/n entre 51 y 61, El Cano, La Lisa, La Habana.
                    (En la antigua planta de papel de techo “Imperasfal”)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mt-6">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Icons.Clock size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-medium text-slate-900 dark:text-white">
                    Estamos Abiertos
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Lunes - Viernes: 10:00 — 20:00
                    <br />
                    Sáb: 10:00 — 14:00
                    <br />
                    Dom: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formContainerRef}
            className="opacity-0 translate-y-6 transition-all duration-700 ease-out"
            style={{ transitionDelay: "300ms" }}
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Enviar mensaje
              </h3>

              {formSubmitted && (
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-4 rounded-lg mb-6 flex items-center">
                  <div className="mr-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p>¡Gracias! Su mensaje ha sido enviado correctamente.</p>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.name ? "border-red-500" : "border-slate-300"} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.email ? "border-red-500" : "border-slate-300"} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Motivo de contacto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.subject ? "border-red-500" : "border-slate-300"} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
                  >
                    <option>Solicitud de presupuesto</option>
                    <option>Consulta técnica</option>
                    <option>Mantenimiento</option>
                    <option>Proyecto existente</option>
                    <option>Otros</option>
                  </select>
                  {errors.subject && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Conditional fields */}
                {subject === "Solicitud de presupuesto" && (
                  <div>
                    <label
                      htmlFor="projectReference"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Referencia o descripción del proyecto
                    </label>
                    <input
                      id="projectReference"
                      name="projectReference"
                      value={formState.projectReference}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.projectReference ? "border-red-500" : "border-slate-300"} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
                    />
                    {errors.projectReference && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.projectReference}
                      </p>
                    )}
                  </div>
                )}

                {subject === "Proyecto existente" ? (
                  <div>
                    <label
                      htmlFor="orderNumber"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Número o referencia
                    </label>
                    <input
                      id="orderNumber"
                      name="orderNumber"
                      value={formState.orderNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.orderNumber ? "border-red-500" : "border-slate-300"} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
                    />
                    {errors.orderNumber && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.orderNumber}
                      </p>
                    )}
                  </div>
                ) : null}

                {subject === "Consulta técnica" && (
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Teléfono de contacto
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? "border-red-500" : "border-slate-300"} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.message ? "border-red-500" : "border-slate-300"} dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
                  >
                    <Icons.Send size={18} className="mr-2" />
                    Enviar solicitud
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
