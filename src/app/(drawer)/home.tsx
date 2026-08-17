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
import { useCarrito } from '../../context/CarritoContext';
import { formatoPrecio } from '../../utils/formato';
import { SeccionTitulo, IconoTile } from '../../components/ui/Button';

export default function Home() {
  const { productos } = useProductos();
  const { rol, cerrarSesion } = useSesion();
  const { cantidadTotal } = useCarrito();

  const esAdmin = rol === 'admin';
  const recomendados = productos.slice(0, 6);

  const categorias = [
    {
      nombre: 'Tecnología',
      emoji: '💻',
      detalle: `${productos.filter((p) => p.seccionId.startsWith('sec-')).length} productos`,
      ruta: '/(drawer)/productos',
    },
    {
      nombre: 'Ropa',
      emoji: '👕',
      detalle: 'Moda y accesorios',
      ruta: '/(drawer)/ropa',
    },
    {
      nombre: 'Favoritos',
      emoji: '🤍',
      detalle: 'Lo que te gusta',
      ruta: '/(drawer)/favoritos',
    },
    {
      nombre: 'Carrito',
      emoji: '🛒',
      detalle:
        cantidadTotal > 0
          ? `${cantidadTotal} ${cantidadTotal === 1 ? 'producto' : 'productos'}`
          : 'Sin productos',
      ruta: '/(drawer)/carrito',
    },
    ...(esAdmin
      ? [
          {
            nombre: 'Administración',
            emoji: '⚙️',
            detalle: 'Panel de control',
            ruta: '/(drawer)/admin',
          },
        ]
      : []),
  ];

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <View className="mt-2 mb-6 flex-row items-center gap-3.5">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-neutral-900">
          <Text className="text-lg font-bold text-white">
            {esAdmin ? 'A' : 'U'}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-xl font-bold tracking-tight text-neutral-900">
            Hola, {esAdmin ? 'Administrador' : 'usuario'} 👋
          </Text>
          <Text className="text-[13px] text-neutral-400">
            Bienvenido de vuelta a MiniStore
          </Text>
        </View>
        <View
          className={`rounded-full px-2.5 py-1 ${
            esAdmin ? 'bg-oferta' : 'bg-neutral-100'
          }`}
        >
          <Text
            className={`text-[10px] font-bold uppercase tracking-widest ${
              esAdmin ? 'text-white' : 'text-neutral-500'
            }`}
          >
            {esAdmin ? 'Admin' : 'Cliente'}
          </Text>
        </View>
      </View>

      <View className="mb-8 overflow-hidden rounded-2xl bg-neutral-900 p-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <View className="mb-2 flex-row items-center gap-2">
              <View className="rounded bg-oferta px-2 py-0.5">
                <Text className="text-[9px] font-bold tracking-widest text-white">
                  OFERTAS
                </Text>
              </View>
              <Text className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                MiniStore
              </Text>
            </View>
            <Text className="text-2xl font-bold tracking-tight text-white">
              Hasta 24 cuotas sin interés
            </Text>
            <Text className="mt-1.5 text-sm text-neutral-400">
              En todo el catálogo · Compra y retira en tienda.
            </Text>
          </View>
          <View className="ml-4 h-14 w-14 items-center justify-center rounded-2xl bg-oferta">
            <Text className="text-2xl">⚡</Text>
          </View>
        </View>
      </View>

      <SeccionTitulo texto="Te recomendamos" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-8"
        contentContainerStyle={{ gap: 12 }}
      >
        {recomendados.map((producto) => (
          <TouchableOpacity
            key={producto.id}
            className="w-44 rounded-2xl border border-neutral-200 bg-white p-4"
            activeOpacity={0.7}
            onPress={() => router.push(`/producto/${producto.id}`)}
          >
            <View className="mb-3 h-14 w-14 items-center justify-center rounded-xl bg-neutral-100">
              <Text className="text-3xl">{producto.emoji}</Text>
            </View>
            <Text
              className="text-[13px] font-semibold text-neutral-900"
              numberOfLines={2}
            >
              {producto.nombre}
            </Text>
            <Text className="mt-1.5 text-[15px] font-bold text-neutral-900">
              {formatoPrecio(producto.precio)}
            </Text>
            <View className="mt-1 flex-row items-center gap-1.5">
              <View className="rounded bg-oferta px-1.5 py-0.5">
                <Text className="text-[8px] font-bold tracking-widest text-white">
                  OFERTA
                </Text>
              </View>
              <Text className="text-[10px] font-medium text-oferta">
                24 cuotas
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SeccionTitulo texto="Explorar" />

      <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat.nombre}
            className="flex-row items-center border-b border-neutral-100 px-4 py-4 last:border-b-0"
            activeOpacity={0.7}
            onPress={() => router.push(cat.ruta as never)}
          >
            <IconoTile emoji={cat.emoji} tamano="sm" />
            <View className="ml-3.5 flex-1">
              <Text className="text-[15px] font-semibold text-neutral-900">
                {cat.nombre}
              </Text>
              <Text className="mt-0.5 text-xs text-neutral-400">
                {cat.detalle}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#a3a3a3" />
          </TouchableOpacity>
        ))}
      </View>

      <Text className="mt-8 text-center text-xs text-neutral-300">
        {productos.length} productos disponibles · MiniStore
      </Text>

      <TouchableOpacity
        className="mt-4 h-11 flex-row items-center justify-center gap-2 self-center rounded-xl border border-neutral-200 px-6"
        activeOpacity={0.7}
        onPress={() => {
          cerrarSesion();
          router.replace('/');
        }}
      >
        <Ionicons name="log-out-outline" size={17} color="#737373" />
        <Text className="text-sm font-semibold text-neutral-500">
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}