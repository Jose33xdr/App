import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import type { Categoria } from '../data/productos';
import { INFO_CATEGORIAS } from '../data/productos';
import { useProductos } from '../context/ProductosContext';
import { SeccionTitulo } from './ui/Button';

interface ListaSeccionesProps {
  titulo: string;
  subtitulo: string;
  categorias: Categoria[];
}

export default function ListaSecciones({
  titulo,
  subtitulo,
  categorias,
}: ListaSeccionesProps) {
  const [busqueda, setBusqueda] = useState('');
  const { seccionesDeCategoria, productosDeSeccion } = useProductos();

  const secciones = useMemo(() => {
    const normalizada = busqueda.trim().toLowerCase();
    return categorias
      .flatMap((categoria) => seccionesDeCategoria(categoria))
      .map((seccion) => ({
        seccion,
        count: productosDeSeccion(seccion.id).length,
      }))
      .filter(({ seccion }) =>
        normalizada
          ? seccion.nombre.toLowerCase().includes(normalizada) ||
            INFO_CATEGORIAS[seccion.categoria].nombre
              .toLowerCase()
              .includes(normalizada)
          : true
      );
  }, [busqueda, categorias, seccionesDeCategoria, productosDeSeccion]);

  return (
    <View className="flex-1 bg-neutral-50 p-5">
      <SeccionTitulo texto="MiniStore" />
      <Text className="text-2xl font-bold tracking-tight text-neutral-900">
        {titulo}
      </Text>
      <Text className="mt-1 mb-5 text-sm text-neutral-400">
        {subtitulo}
      </Text>

      <View className="mb-4 flex-row items-center rounded-xl border border-neutral-200 bg-white px-3.5">
        <Ionicons
          name="search"
          size={18}
          color="#a3a3a3"
          style={{ marginRight: 8 }}
        />
        <TextInput
          className="h-11 flex-1 text-[15px] text-neutral-900"
          placeholder="Buscar sección..."
          placeholderTextColor="#a3a3a3"
          value={busqueda}
          onChangeText={setBusqueda}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {busqueda.length > 0 && (
          <TouchableOpacity
            onPress={() => setBusqueda('')}
            accessibilityLabel="Limpiar búsqueda"
          >
            <Ionicons name="close-circle" size={18} color="#a3a3a3" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={secciones}
        keyExtractor={(item) => item.seccion.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 flex-row items-center rounded-2xl border border-neutral-200 bg-white p-4"
            activeOpacity={0.7}
            onPress={() =>
              router.push(`/seccion/${item.seccion.id}`)
            }
          >
            <View className="mr-3.5 h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
              <Text className="text-2xl">{item.seccion.emoji}</Text>
            </View>

            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-neutral-900">
                {item.seccion.nombre}
              </Text>
              <Text className="mt-0.5 text-xs text-oferta">
                {INFO_CATEGORIAS[item.seccion.categoria].nombre} ·{' '}
                {item.count}{' '}
                {item.count === 1 ? 'producto' : 'productos'}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#a3a3a3" />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View className="items-center py-20">
            <Text className="mb-3 text-4xl">🔍</Text>
            <Text className="text-base font-semibold text-neutral-900">
              No hay secciones
            </Text>
            <Text className="mt-1 text-sm text-neutral-500">
              Intenta con otra palabra clave.
            </Text>
          </View>
        }
      />
    </View>
  );
}