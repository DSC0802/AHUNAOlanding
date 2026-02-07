import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

type Props = { open: boolean; onClose: () => void };

const RegisterModal: React.FC<Props> = ({ open, onClose }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => emailRef.current?.focus(), 50);
    } else {
      setEmail("");
      setPassword("");
      setName("");
      setError(null);
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email y contraseña son obligatorios");
      return;
    }
    setLoading(true);
    const ok = await register(email.trim(), password, name.trim() || undefined);
    setLoading(false);
    if (ok) onClose();
    else setError("Ya existe un usuario con este correo");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Crear cuenta
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          Regístrese para acceder a funciones adicionales del sitio.
        </p>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-700"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo (opcional)"
            className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-700"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-700"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-orange-600 text-white"
            >
              {loading ? "..." : "Crear cuenta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
