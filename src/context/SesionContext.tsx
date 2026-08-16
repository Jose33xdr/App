import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Rol = 'admin' | 'cliente';

interface SesionContextValue {
  rol: Rol | null;
  iniciarSesion: (rol: Rol) => void;
  cerrarSesion: () => void;
}

const SesionContext = createContext<SesionContextValue | undefined>(
  undefined
);

export function SesionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rol, setRol] = useState<Rol | null>(null);

  const value = useMemo(
    () => ({
      rol,
      iniciarSesion: setRol,
      cerrarSesion: () => setRol(null),
    }),
    [rol]
  );

  return (
    <SesionContext.Provider value={value}>
      {children}
    </SesionContext.Provider>
  );
}

export function useSesion(): SesionContextValue {
  const context = useContext(SesionContext);
  if (!context) {
    throw new Error('useSesion debe usarse dentro de SesionProvider');
  }
  return context;
}