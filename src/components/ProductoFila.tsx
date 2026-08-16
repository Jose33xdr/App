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
      <View className="mr-3.5 h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
        <Text className="text-xl">{producto.emoji}</Text>
      </View>

      <View className="flex-1">
        <Text
          className="text-[15px] font-semibold text-neutral-900"
          numberOfLines={1}
        >
          {producto.nombre}
        </Text>

        <View className="mt-1 flex-row items-center justify-between">
          <Text className="text-[15px] font-bold text-neutral-900">
            {formatoPrecio(producto.precio)}
          </Text>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => alternar(producto)}
              activeOpacity={0.7}
              accessibilityLabel={
                favorito
                  ? `Quitar ${producto.nombre} de favoritos`
                  : `Agregar ${producto.nombre} a favoritos`
              }
            >
              <Ionicons
                name={favorito ? 'heart' : 'heart-outline'}
                size={20}
                color={favorito ? '#171717' : '#a3a3a3'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="h-8 w-8 items-center justify-center rounded-full bg-neutral-900"
              activeOpacity={0.7}
              onPress={() => agregar(producto)}
              accessibilityLabel={`Agregar ${producto.nombre} al carrito`}
            >
              <Ionicons name="add" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}