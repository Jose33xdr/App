import { productosIniciales } from '../../data/productos';
import type { Producto } from '../../data/productos';
import type { DatosProducto, IProductosRepo } from '../tipos';

export class ProductosRepoMemoria implements IProductosRepo {
  private data: Producto[] = [...productosIniciales];

  listar(): Producto[] {
    return this.data;
  }

  crear(datos: DatosProducto): Producto {
    const producto: Producto = {
      ...datos,
      id: `prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    this.data = [...this.data, producto];
    return producto;
  }

  actualizar(
    id: string,
    datos: DatosProducto
  ): Producto | undefined {
    const existente = this.data.find((p) => p.id === id);
    if (!existente) {
      return undefined;
    }
    const actualizado: Producto = { ...datos, id };
    this.data = this.data.map((p) =>
      p.id === id ? actualizado : p
    );
    return actualizado;
  }

  eliminar(id: string): boolean {
    const existe = this.data.some((p) => p.id === id);
    if (!existe) {
      return false;
    }
    this.data = this.data.filter((p) => p.id !== id);
    return true;
  }
}