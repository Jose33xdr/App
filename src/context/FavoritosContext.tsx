import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { Producto } from '../data/productos';
import { useProductos } from './ProductosContext';

interface FavoritosContextValue {
  ids: string[];
  productos: Producto[];
  esFavorito: (id: string) => boolean;
  alternar: (producto: Producto) => void;
}

const FavoritosContext = createContext<
  FavoritosContextValue | undefined
>(undefined);

export function FavoritosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ids, setIds] = useState<string[]>([]);
  const { buscarProducto } = useProductos();

  const esFavorito = (id: string) => ids.includes(id);

  const alternar = (producto: Producto) => {
    setIds((prev) =>
      prev.includes(producto.id)
        ? prev.filter((id) => id !== producto.id)
        : [...prev, producto.id]
    );
  };

  const productos = useMemo(
    () =>
      ids
        .map((id) => buscarProducto(id))
        .filter((p): p is Producto => p !== undefined),
    [ids]
  );

  const value = useMemo(
    () => ({ ids, productos, esFavorito, alternar }),
    [ids, productos]
  );

  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos(): FavoritosContextValue {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error(
      'useFavoritos debe usarse dentro de FavoritosProvider'
    );
  }
  return context;
}