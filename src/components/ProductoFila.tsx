import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { Producto } from '../data/productos';
import { formatoPrecio } from '../utils/formato';
import { useCarrito } from '../context/CarritoContext';
import { useFavoritos } from '../context/FavoritosContext';
import { IconoTile } from './ui/Button';

interface ProductoFilaProps {
  producto: Producto;
  className?: string;
}

export default function ProductoFila({
  producto,
  className,
}: ProductoFilaProps) {
  const { agregar } = useCarrito();
  const { esFavorito, alternar } = useFavoritos();

  const favorito = esFavorito(producto.id);

  return (
    <View className={`flex-row items-center ${className ?? ''}`}>
      <IconoTile emoji={producto.emoji} />

      <View className="ml-3.5 flex-1">
        <Text
          className="text-[15px] font-semibold text-neutral-900"
          numberOfLines={1}
        >
          {producto.nombre}
        </Text>

        <View className="mt-1.5 flex-row items-center justify-between">
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-[16px] font-bold text-neutral-900">
                {formatoPrecio(producto.precio)}
              </Text>
              <View className="rounded bg-oferta px-1.5 py-0.5">
                <Text className="text-[9px] font-bold tracking-wide text-white">
                  OFERTA
                </Text>
              </View>
            </View>
            <Text className="mt-0.5 text-[11px] text-oferta">
              O llévalo hasta en 24 cuotas sin interés
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => alternar(producto)}
              activeOpacity={0.7}
              className="h-9 w-9 items-center justify-center rounded-full"
              accessibilityLabel={
                favorito
                  ? `Quitar ${producto.nombre} de favoritos`
                  : `Agregar ${producto.nombre} a favoritos`
              }
            >
              <Ionicons
                name={favorito ? 'heart' : 'heart-outline'}
                size={21}
                color={favorito ? '#D50000' : '#a3a3a3'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="h-9 w-9 items-center justify-center rounded-full bg-neutral-900"
              activeOpacity={0.85}
              onPress={() => agregar(producto)}
              accessibilityLabel={`Agregar ${producto.nombre} al carrito`}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}