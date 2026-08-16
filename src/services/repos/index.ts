import { ProductosRepoMemoria } from './productosRepo';
import { SeccionesRepoMemoria } from './seccionesRepo';
import type { IProductosRepo, ISeccionesRepo } from '../tipos';

export const productosRepo: IProductosRepo = new ProductosRepoMemoria();
export const seccionesRepo: ISeccionesRepo = new SeccionesRepoMemoria();