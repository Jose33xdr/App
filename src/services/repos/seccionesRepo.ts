import { seccionesIniciales } from '../../data/productos';
import type { Seccion } from '../../data/productos';
import type { DatosSeccion, ISeccionesRepo } from '../tipos';

export class SeccionesRepoMemoria implements ISeccionesRepo {
  private data: Seccion[] = [...seccionesIniciales];

  listar(): Seccion[] {
    return this.data;
  }

  crear(datos: DatosSeccion): Seccion {
    const seccion: Seccion = {
      ...datos,
      id: `sec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    this.data = [...this.data, seccion];
    return seccion;
  }

  actualizar(
    id: string,
    datos: DatosSeccion
  ): Seccion | undefined {
    const existente = this.data.find((s) => s.id === id);
    if (!existente) {
      return undefined;
    }
    const actualizada: Seccion = { ...datos, id };
    this.data = this.data.map((s) =>
      s.id === id ? actualizada : s
    );
    return actualizada;
  }

  eliminar(id: string): boolean {
    const existe = this.data.some((s) => s.id === id);
    if (!existe) {
      return false;
    }
    this.data = this.data.filter((s) => s.id !== id);
    return true;
  }
}