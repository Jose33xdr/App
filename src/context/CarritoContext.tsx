import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { Producto } from '../data/productos';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

interface CarritoContextValue {
  items: ItemCarrito[];
  total: number;
  cantidadTotal: number;
  agregar: (producto: Producto, cantidad?: number) => void;
  incrementar: (id: string) => void;
  disminuir: (id: string) => void;
  eliminar: (id: string) => void;
  vaciar: () => void;
}

const CarritoContext = createContext<CarritoContextValue | undefined>(
  undefined
);

export function CarritoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const agregar = (producto: Producto, cantidad = 1) => {
    setItems((prev) => {
      const existente = prev.find(
        (item) => item.producto.id === producto.id
      );
      if (existente) {
        return prev.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { producto, cantidad }];
    });
  };

  const incrementar = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.producto.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const disminuir = (id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.producto.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminar = (id: string) => {
    setItems((prev) => prev.filter((item) => item.producto.id !== id));
  };

  const vaciar = () => {
    setItems([]);
  };

  const { total, cantidadTotal } = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        total: acc.total + item.producto.precio * item.cantidad,
        cantidadTotal: acc.cantidadTotal + item.cantidad,
      }),
      { total: 0, cantidadTotal: 0 }
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      total,
      cantidadTotal,
      agregar,
      incrementar,
      disminuir,
      eliminar,
      vaciar,
    }),
    [items, total, cantidadTotal]
  );

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito(): CarritoContextValue {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
}