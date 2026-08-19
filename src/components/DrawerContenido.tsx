import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useCarrito } from '../context/CarritoContext';
import { useSesion } from '../context/SesionContext';

export default function DrawerContenido(props: any) {
  const { cantidadTotal } = useCarrito();
  const { rol, cerrarSesion } = useSesion();
  const esAdmin = rol === 'admin';

  return (
    <View className="flex-1 bg-white">
      <View className="border-b border-neutral-100 px-5 pb-5 pt-12">
        <View className="flex-row items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-oferta">
            <Text className="text-lg font-black text-white">M</Text>
          </View>
          <View>
            <Text className="text-lg font-bold tracking-tight text-neutral-900">
              MiniStore
            </Text>
            <Text className="text-xs text-neutral-400">
              {esAdmin ? 'Administrador' : 'Cliente'}
            </Text>
          </View>
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 8 }}
      >
        <View className="px-3">
          <Text className="mb-1 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            Menú
          </Text>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View className="border-t border-neutral-100 p-4 pb-8">
        <TouchableOpacity
          className="flex-row items-center gap-3 rounded-xl px-3 py-2.5"
          activeOpacity={0.7}
          onPress={() => {
            cerrarSesion();
            router.replace('/');
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="#a3a3a3" />
          <Text className="text-[15px] font-medium text-neutral-400">
            Cerrar sesión
          </Text>
        </TouchableOpacity>
        <Text className="mt-3 text-center text-[10px] text-neutral-300">
          MiniStore v1.0 · {cantidadTotal > 0 ? `${cantidadTotal} en carrito` : 'Carrito vacío'}
        </Text>
      </View>
    </View>
  );
}