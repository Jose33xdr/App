import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Rol = 'admin' | 'cliente';

interface SesionContextValue {
  rol: Rol | null;
  correo: string | null;
  iniciarSesion: (rol: Rol, correo: string) => void;
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
  const [correo, setCorreo] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      rol,
      correo,
      iniciarSesion: (rol: Rol, correo: string) => {
        setRol(rol);
        setCorreo(correo);
      },
      cerrarSesion: () => {
        setRol(null);
        setCorreo(null);
      },
    }),
    [rol, correo]
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