import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useProductos } from '../../context/ProductosContext';
import { useSesion } from '../../context/SesionContext';

export default function Home() {
  const { productos } = useProductos();
  const { rol, cerrarSesion } = useSesion();

  const esAdmin = rol === 'admin';

  const categorias = [
    {
      nombre: 'Tecnología',
      emoji: '💻',
      ruta: '/(drawer)/productos',
    },
    {
      nombre: 'Ropa',
      emoji: '👕',
      ruta: '/(drawer)/ropa',
    },
    {
      nombre: 'Favoritos',
      emoji: '🤍',
      ruta: '/(drawer)/favoritos',
    },
    {
      nombre: 'Carrito',
      emoji: '🛒',
      ruta: '/(drawer)/carrito',
    },
    ...(esAdmin
      ? [
          {
            nombre: 'Administración',
            emoji: '⚙️',
            ruta: '/(drawer)/admin',
          },
        ]
      : []),
  ];

  return (
    <ScrollView
      className="flex-1 bg-neutral-50"
      contentContainerStyle={{ padding: 20 }}
    >
      <Text className="mt-4 text-3xl font-bold tracking-tight text-neutral-900">
        Hola, {esAdmin ? 'Administrador' : 'usuario'} 👋
      </Text>
      <Text className="mt-1.5 mb-8 text-[15px] text-neutral-500">
        Bienvenido de vuelta a MiniStore.
      </Text>

      <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
        Explorar
      </Text>

      <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat.nombre}
            className="flex-row items-center justify-between border-b border-neutral-100 px-4 py-4 last:border-b-0"
            activeOpacity={0.7}
            onPress={() => router.push(cat.ruta as never)}
          >
            <View className="flex-row items-center">
              <Text className="mr-3 text-xl">{cat.emoji}</Text>
              <Text className="text-[15px] font-medium text-neutral-900">
                {cat.nombre}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#a3a3a3" />
          </TouchableOpacity>
        ))}
      </View>

      <Text className="mt-6 text-center text-xs text-neutral-400">
        {productos.length} productos disponibles
      </Text>

      <TouchableOpacity
        className="mt-8 items-center self-center"
        activeOpacity={0.7}
        onPress={() => {
          cerrarSesion();
          router.replace('/');
        }}
      >
        <Text className="text-sm font-medium text-neutral-400">
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}