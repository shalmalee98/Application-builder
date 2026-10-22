import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { registerNotifier } from "./notify";
import "./toast.css";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (message, tone = "info") => {
      const id = ++toastId;
      setToasts((current) => [...current, { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 3200);
      return id;
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      push,
      success: (message) => push(message, "success"),
      error: (message) => push(message, "error"),
      info: (message) => push(message, "info"),
    }),
    [push]
  );

  useEffect(() => registerNotifier(value), [value]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="ab-toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`ab-toast ab-toast-${toast.tone}`}
            role="status"
          >
            <p>{toast.message}</p>
            <button
              type="button"
              className="ab-toast-dismiss"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      push: (message) => window.alert(message),
      success: (message) => window.alert(message),
      error: (message) => window.alert(message),
      info: (message) => window.alert(message),
    };
  }
  return ctx;
}
