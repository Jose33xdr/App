import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { Producto } from '../data/productos';
import ProductCard from './ProductCard';
import { SeccionTitulo } from './ui/Button';

interface ListaProductosProps {
  titulo: string;
  subtitulo: string;
  productos: Producto[];
  vacioEmoji?: string;
  vacioTitulo?: string;
  vacioTexto?: string;
}

export default function ListaProductos({
  titulo,
  subtitulo,
  productos,
  vacioEmoji = '🔍',
  vacioTitulo = 'No hay resultados',
  vacioTexto = 'Intenta con otra palabra clave.',
}: ListaProductosProps) {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = useMemo(() => {
    const normalizada = busqueda.trim().toLowerCase();
    if (!normalizada) {
      return productos;
    }
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(normalizada)
    );
  }, [busqueda, productos]);

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
          placeholder="Buscar producto..."
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
        data={filtrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard producto={item} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View className="items-center py-20">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <Text className="text-3xl">{vacioEmoji}</Text>
            </View>
            <Text className="text-base font-semibold text-neutral-900">
              {vacioTitulo}
            </Text>
            <Text className="mt-1 text-sm text-neutral-500">
              {vacioTexto}
            </Text>
          </View>
        }
      />
    </View>
  );
}