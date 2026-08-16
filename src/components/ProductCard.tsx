import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

import type { Producto } from '../data/productos';
import ProductoFila from './ProductoFila';

export default function ProductCard({ producto }: { producto: Producto }) {
  return (
    <TouchableOpacity
      className="mb-3 rounded-2xl border border-neutral-200 bg-white p-4"
      activeOpacity={0.7}
      onPress={() => router.push(`/producto/${producto.id}`)}
    >
      <ProductoFila producto={producto} />
    </TouchableOpacity>
  );
}