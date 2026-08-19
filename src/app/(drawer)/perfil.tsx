import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useSesion } from '../../context/SesionContext';
import { useFavoritos } from '../../context/FavoritosContext';
import { useCarrito } from '../../context/CarritoContext';
import { SeccionTitulo } from '../../components/ui/Button';
import Entrada from '../../components/ui/Entrada';

export default function Perfil() {
  const { rol, correo, cerrarSesion } = useSesion();
  const { ids } = useFavoritos();
  const { cantidadTotal } = useCarrito();

  const esAdmin = rol === 'admin';

  const opciones = [
    {
      icono: 'receipt-outline',
      titulo: 'Mis pedidos',
      detalle: 'Revisa el estado de tus compras',
      onPress: () => router.push('/(drawer)/pedidos'),
    },
    {
      icono: 'heart-outline',
      titulo: 'Favoritos',
      detalle: `${ids.length} ${ids.length === 1 ? 'producto guardado' : 'productos guardados'}`,
      onPress: () => router.push('/(drawer)/favoritos'),
    },
    {
      icono: 'cart-outline',
      titulo: 'Mi carrito',
      detalle:
        cantidadTotal > 0
          ? `${cantidadTotal} ${cantidadTotal === 1 ? 'producto' : 'productos'} por pagar`
          : 'Sin productos por ahora',
      onPress: () => router.push('/(drawer)/carrito'),
    },
    ...(esAdmin
      ? [
          {
            icono: 'settings-outline',
            titulo: 'Administración',
            detalle: 'Gestiona el catálogo completo',
            onPress: () => router.push('/(drawer)/admin'),
          },
        ]
      : []),
  ];

  const cerrar = () => {
    cerrarSesion();
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-neutral-50 p-5">
      <SeccionTitulo texto="MiniStore" />
      <Text className="text-2xl font-bold tracking-tight text-neutral-900">
        Mi cuenta
      </Text>

      <Entrada>
        <View className="mt-5 mb-5 items-center rounded-2xl border border-neutral-200 bg-white p-6">
          <View className="mb-3 h-16 w-16 items-center justify-center rounded-full bg-oferta">
            <Text className="text-2xl font-black text-white">M</Text>
          </View>
          <Text className="text-lg font-bold tracking-tight text-neutral-900">
            {esAdmin ? 'Administrador' : 'Cliente MiniStore'}
          </Text>
          <Text className="mt-1 text-[13px] text-neutral-400">
            {correo}
          </Text>
          <View className="mt-3 rounded-full bg-neutral-100 px-3 py-1">
            <Text className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
              {esAdmin ? '👑 Rol: Administrador' : '🛍️ Rol: Cliente'}
            </Text>
          </View>
        </View>
      </Entrada>

      {opciones.map((opcion, index) => (
        <Entrada key={opcion.titulo} retraso={80 + index * 60}>
          <TouchableOpacity
            className="mb-3 flex-row items-center rounded-2xl border border-neutral-200 bg-white p-4"
            activeOpacity={0.7}
            onPress={opcion.onPress}
          >
            <View className="mr-3.5 h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
              <Ionicons
                name={opcion.icono as never}
                size={20}
                color="#404040"
              />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-neutral-900">
                {opcion.titulo}
              </Text>
              <Text className="mt-0.5 text-xs text-neutral-400">
                {opcion.detalle}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#a3a3a3" />
          </TouchableOpacity>
        </Entrada>
      ))}

      <Entrada retraso={80 + opciones.length * 60}>
        <TouchableOpacity
          className="mt-2 h-12 flex-row items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white"
          activeOpacity={0.8}
          onPress={cerrar}
        >
          <Ionicons name="log-out-outline" size={18} color="#c0392b" />
          <Text className="text-[15px] font-semibold text-danger">
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </Entrada>
    </View>
  );
}