import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useCarrito } from '../../context/CarritoContext';
import { formatoPrecio } from '../../utils/formato';

export default function Carrito() {
  const {
    items,
    total,
    cantidadTotal,
    incrementar,
    disminuir,
    eliminar,
    vaciar,
  } = useCarrito();

  const pagar = () => {
    Alert.alert(
      'Compra realizada',
      `Completaste tu compra por ${formatoPrecio(total)}. ¡Gracias por comprar en MiniStore!`,
      [
        {
          text: 'OK',
          onPress: vaciar,
        },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-8">
        <Text className="mb-4 text-5xl">🛒</Text>
        <Text className="text-lg font-semibold text-neutral-900">
          Tu carrito está vacío
        </Text>
        <Text className="mt-1.5 text-center text-sm leading-6 text-neutral-500">
          Agrega productos desde las categorías para comenzar tu compra.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50">
      <FlatList
        data={items}
        keyExtractor={(item) => item.producto.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mb-3 flex-row items-center rounded-2xl border border-neutral-200 bg-white p-4">
            <View className="mr-3.5 h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
              <Text className="text-xl">{item.producto.emoji}</Text>
            </View>

            <View className="flex-1">
              <Text
                className="text-[15px] font-semibold text-neutral-900"
                numberOfLines={1}
              >
                {item.producto.nombre}
              </Text>

              <View className="mt-1.5 flex-row items-center justify-between">
                <Text className="text-[15px] font-bold text-neutral-900">
                  {formatoPrecio(item.producto.precio * item.cantidad)}
                </Text>

                <View className="flex-row items-center gap-3.5">
                  <TouchableOpacity
                    onPress={() => disminuir(item.producto.id)}
                    activeOpacity={0.7}
                    accessibilityLabel="Disminuir cantidad"
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="#737373"
                    />
                  </TouchableOpacity>

                  <Text className="min-w-4 text-center text-sm text-neutral-500">
                    {item.cantidad}
                  </Text>

                  <TouchableOpacity
                    onPress={() => incrementar(item.producto.id)}
                    activeOpacity={0.7}
                    accessibilityLabel="Aumentar cantidad"
                  >
                    <Ionicons name="add-circle-outline" size={24} color="#171717" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              className="ml-4 self-start"
              onPress={() => eliminar(item.producto.id)}
              activeOpacity={0.6}
              accessibilityLabel={`Eliminar ${item.producto.nombre}`}
            >
              <Ionicons name="trash-outline" size={18} color="#a3a3a3" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View className="border-t border-neutral-200 bg-white px-5 pt-4 pb-8">
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="text-sm text-neutral-500">Total</Text>
          <Text className="text-lg font-bold text-neutral-900">
            {formatoPrecio(total)}
          </Text>
        </View>
        <Text className="mb-4 text-xs text-neutral-400">
          {cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'}{' '}
          · {items.length} {items.length === 1 ? 'tipo' : 'tipos'}
        </Text>

        <TouchableOpacity
          className="h-12 items-center justify-center rounded-xl bg-neutral-900"
          activeOpacity={0.8}
          onPress={pagar}
        >
          <Text className="text-[15px] font-semibold text-white">
            Pagar compra
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}