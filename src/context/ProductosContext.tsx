import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { Categoria, Producto, Seccion } from '../data/productos';
import { productosRepo, seccionesRepo } from '../services/repos';
import type { DatosProducto, DatosSeccion } from '../services/tipos';

interface ProductosContextValue {
  productos: Producto[];
  secciones: Seccion[];
  agregarProducto: (datos: DatosProducto) => void;
  actualizarProducto: (id: string, datos: DatosProducto) => void;
  eliminarProducto: (id: string) => void;
  buscarProducto: (id: string) => Producto | undefined;
  productosDeSeccion: (seccionId: string) => Producto[];
  agregarSeccion: (datos: DatosSeccion) => void;
  actualizarSeccion: (id: string, datos: DatosSeccion) => void;
  eliminarSeccion: (id: string) => boolean;
  buscarSeccion: (id: string) => Seccion | undefined;
  seccionesDeCategoria: (categoria: Categoria) => Seccion[];
}

const ProductosContext = createContext<ProductosContextValue | undefined>(
  undefined
);

export function ProductosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productos, setProductos] = useState<Producto[]>(() =>
    productosRepo.listar()
  );
  const [secciones, setSecciones] = useState<Seccion[]>(() =>
    seccionesRepo.listar()
  );

  const agregarProducto = useCallback((datos: DatosProducto) => {
    productosRepo.crear(datos);
    setProductos([...productosRepo.listar()]);
  }, []);

  const actualizarProducto = useCallback(
    (id: string, datos: DatosProducto) => {
      productosRepo.actualizar(id, datos);
      setProductos([...productosRepo.listar()]);
    },
    []
  );

  const eliminarProducto = useCallback((id: string) => {
    productosRepo.eliminar(id);
    setProductos([...productosRepo.listar()]);
  }, []);

  const buscarProducto = useCallback(
    (id: string) => productos.find((p) => p.id === id),
    [productos]
  );

  const productosDeSeccion = useCallback(
    (seccionId: string) =>
      productos.filter((p) => p.seccionId === seccionId),
    [productos]
  );

  const agregarSeccion = useCallback((datos: DatosSeccion) => {
    seccionesRepo.crear(datos);
    setSecciones([...seccionesRepo.listar()]);
  }, []);

  const actualizarSeccion = useCallback(
    (id: string, datos: DatosSeccion) => {
      seccionesRepo.actualizar(id, datos);
      setSecciones([...seccionesRepo.listar()]);
    },
    []
  );

  const eliminarSeccion = useCallback(
    (id: string): boolean => {
      if (productos.some((p) => p.seccionId === id)) {
        return false;
      }
      seccionesRepo.eliminar(id);
      setSecciones([...seccionesRepo.listar()]);
      return true;
    },
    [productos]
  );

  const buscarSeccion = useCallback(
    (id: string) => secciones.find((s) => s.id === id),
    [secciones]
  );

  const seccionesDeCategoria = useCallback(
    (categoria: Categoria) =>
      secciones.filter((s) => s.categoria === categoria),
    [secciones]
  );

  const value = useMemo(
    () => ({
      productos,
      secciones,
      agregarProducto,
      actualizarProducto,
      eliminarProducto,
      buscarProducto,
      productosDeSeccion,
      agregarSeccion,
      actualizarSeccion,
      eliminarSeccion,
      buscarSeccion,
      seccionesDeCategoria,
    }),
    [
      productos,
      secciones,
      agregarProducto,
      actualizarProducto,
      eliminarProducto,
      buscarProducto,
      productosDeSeccion,
      agregarSeccion,
      actualizarSeccion,
      eliminarSeccion,
      buscarSeccion,
      seccionesDeCategoria,
    ]
  );

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos(): ProductosContextValue {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error('useProductos debe usarse dentro de ProductosProvider');
  }
  return context;
}