import type { Producto, Seccion } from '../data/productos';

export type DatosProducto = Omit<Producto, 'id'>;
export type DatosSeccion = Omit<Seccion, 'id'>;

export interface IProductosRepo {
  listar(): Producto[];
  crear(datos: DatosProducto): Producto;
  actualizar(id: string, datos: DatosProducto): Producto | undefined;
  eliminar(id: string): boolean;
}

export interface ISeccionesRepo {
  listar(): Seccion[];
  crear(datos: DatosSeccion): Seccion;
  actualizar(id: string, datos: DatosSeccion): Seccion | undefined;
  eliminar(id: string): boolean;
}