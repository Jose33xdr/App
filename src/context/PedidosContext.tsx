import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { ItemCarrito } from './CarritoContext';

export type MetodoPago = 'tarjeta' | 'transferencia' | 'tienda';

export interface Pedido {
  id: string;
  fecha: string;
  total: number;
  metodoPago: MetodoPago;
  items: ItemCarrito[];
}

interface PedidosContextValue {
  pedidos: Pedido[];
  agregarPedido: (pedido: Pedido) => void;
}

const PedidosContext = createContext<PedidosContextValue | undefined>(
  undefined
);

export function PedidosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const value = useMemo(
    () => ({
      pedidos,
      agregarPedido: (pedido: Pedido) =>
        setPedidos((prev) => [pedido, ...prev]),
    }),
    [pedidos]
  );

  return (
    <PedidosContext.Provider value={value}>
      {children}
    </PedidosContext.Provider>
  );
}

export function usePedidos(): PedidosContextValue {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('usePedidos debe usarse dentro de PedidosProvider');
  }
  return context;
}