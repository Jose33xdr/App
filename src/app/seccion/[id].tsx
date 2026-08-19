import React from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

import { useProductos } from '../../context/ProductosContext';
import ListaProductos from '../../components/ListaProductos';

export default function ProductosDeSeccion() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { buscarSeccion, productosDeSeccion } = useProductos();

  const seccion = buscarSeccion(id ?? '');
  const productos = productosDeSeccion(id ?? '');

  if (!seccion) {
    return (
      <View className="flex-1 items-center bg-neutral-50 pt-24">
        <Stack.Screen options={{ title: 'Sección' }} />
        <Text className="mb-2 text-4xl">😕</Text>
        <Text className="text-sm text-neutral-500">
          Sección no encontrada
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: seccion.nombre }} />
      <ListaProductos
        titulo={seccion.nombre}
        subtitulo={`${productos.length} ${
          productos.length === 1 ? 'producto' : 'productos'
        } · ${seccion.emoji}`}
        productos={productos}
      />
    </>
  );
}