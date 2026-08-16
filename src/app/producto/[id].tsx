import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { formatoPrecio } from '../../utils/formato';
import { useProductos } from '../../context/ProductosContext';
import { useCarrito } from '../../context/CarritoContext';
import { useFavoritos } from '../../context/FavoritosContext';

export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { buscarProducto } = useProductos();
  const { agregar, cantidadTotal } = useCarrito();
  const { esFavorito, alternar } = useFavoritos();

  const producto = id ? buscarProducto(id) : undefined;

  if (!producto) {
    return (
      <View className="flex-1 items-center bg-neutral-50 pt-24">
        <Stack.Screen options={{ title: 'Producto' }} />
        <Text className="mb-2 text-4xl">😕</Text>
        <Text className="text-sm text-neutral-500">
          Producto no encontrado
        </Text>
      </View>
    );
  }

  const sinStock = producto.stock <= 0;
  const favorito = esFavorito(producto.id);

  const agregarAlCarrito = () => {
    agregar(producto);
    Alert.alert(
      'Producto agregado',
      `${producto.nombre} se agregó a tu carrito.`,
      [
        { text: 'Seguir comprando', style: 'cancel' },
        {
          text: 'Ver carrito',
          onPress: () => router.push('/(drawer)/carrito'),
        },
      ]
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-50"
      contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
    >
      <Stack.Screen options={{ title: producto.nombre }} />

      <View className="mb-6 h-32 w-32 items-center justify-center self-center rounded-3xl bg-neutral-100">
        <Text className="text-6xl">{producto.emoji}</Text>
      </View>

      <Text className="text-center text-2xl font-bold tracking-tight text-neutral-900">
        {producto.nombre}
      </Text>

      <Text className="mt-1.5 mb-1 text-center text-lg font-bold text-neutral-900">
        {formatoPrecio(producto.precio)}
      </Text>

      <Text
        className={
          sinStock
            ? 'mb-2 text-center text-[13px] text-danger'
            : 'mb-2 text-center text-[13px] text-success'
        }
      >
        {sinStock
          ? 'Sin stock'
          : `En stock · ${producto.stock} disponibles`}
      </Text>

      <TouchableOpacity
        className="mb-7 flex-row items-center self-center py-1"
        activeOpacity={0.7}
        onPress={() => alternar(producto)}
      >
        <Ionicons
          name={favorito ? 'heart' : 'heart-outline'}
          size={17}
          color={favorito ? '#171717' : '#a3a3a3'}
          style={{ marginRight: 6 }}
        />
        <Text className="text-sm font-medium text-neutral-500">
          {favorito ? 'En favoritos' : 'Guardar en favoritos'}
        </Text>
      </TouchableOpacity>

      <View className="mb-8 rounded-2xl border border-neutral-200 bg-white p-5">
        <Text className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Descripción
        </Text>
        <Text className="mt-2.5 text-[15px] leading-6 text-neutral-600">
          {producto.descripcion}
        </Text>
      </View>

      <TouchableOpacity
        className={
          sinStock
            ? 'h-12 items-center justify-center rounded-xl bg-neutral-300'
            : 'h-12 items-center justify-center rounded-xl bg-neutral-900'
        }
        activeOpacity={0.8}
        onPress={agregarAlCarrito}
        disabled={sinStock}
      >
        <Text className="text-[15px] font-semibold text-white">
          {sinStock ? 'Agotado' : 'Agregar al carrito'}
        </Text>
      </TouchableOpacity>

      {cantidadTotal > 0 && (
        <TouchableOpacity
          className="mt-3 items-center py-2.5"
          activeOpacity={0.7}
          onPress={() => router.push('/(drawer)/carrito')}
        >
          <Text className="text-sm font-medium text-neutral-900 underline">
            Ver carrito ({cantidadTotal}{' '}
            {cantidadTotal === 1 ? 'producto' : 'productos'})
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}