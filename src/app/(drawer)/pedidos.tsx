import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { usePedidos, type MetodoPago } from '../../context/PedidosContext';
import { formatoPrecio } from '../../utils/formato';
import { SeccionTitulo } from '../../components/ui/Button';
import Entrada from '../../components/ui/Entrada';

const ETIQUETAS_METODO: Record<MetodoPago, string> = {
  tarjeta: '💳 Tarjeta',
  transferencia: '🏦 Transferencia',
  tienda: '🏬 Pago en tienda',
};

function formatearFecha(iso: string): string {
  const fecha = new Date(iso);
  return fecha.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Pedidos() {
  const { pedidos } = usePedidos();
  const [expandido, setExpandido] = useState<string | null>(null);

  if (pedidos.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-8">
        <Text className="mb-4 text-5xl">🧾</Text>
        <Text className="text-lg font-semibold text-neutral-900">
          Aún no tienes pedidos
        </Text>
        <Text className="mt-1.5 text-center text-sm leading-6 text-neutral-500">
          Cuando realices una compra, aparecerá aquí con su estado y detalle.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50 p-5">
      <SeccionTitulo texto="MiniStore" />
      <Text className="text-2xl font-bold tracking-tight text-neutral-900">
        Mis pedidos
      </Text>
      <Text className="mt-1 mb-5 text-sm text-neutral-400">
        {pedidos.length} {pedidos.length === 1 ? 'compra realizada' : 'compras realizadas'}
      </Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const abierto = expandido === item.id;
          const cantidadItems = item.items.reduce(
            (acc, i) => acc + i.cantidad,
            0
          );
          return (
            <Entrada retraso={index * 60}>
              <TouchableOpacity
                className="mb-3 rounded-2xl border border-neutral-200 bg-white p-4"
                activeOpacity={0.85}
                onPress={() =>
                  setExpandido(abierto ? null : item.id)
                }
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 pr-3">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-[15px] font-bold text-neutral-900">
                        {item.id}
                      </Text>
                      <View className="flex-row items-center gap-1 rounded-full bg-success/10 px-2 py-0.5">
                        <View className="h-1.5 w-1.5 rounded-full bg-success" />
                        <Text className="text-[10px] font-semibold text-success">
                          PAGADO
                        </Text>
                      </View>
                    </View>
                    <Text className="mt-1 text-xs text-neutral-400">
                      {formatearFecha(item.fecha)} · {cantidadItems}{' '}
                      {cantidadItems === 1 ? 'producto' : 'productos'}
                    </Text>
                    <Text className="mt-0.5 text-[13px] font-medium text-neutral-500">
                      {ETIQUETAS_METODO[item.metodoPago]}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-lg font-bold text-neutral-900">
                      {formatoPrecio(item.total)}
                    </Text>
                    <Ionicons
                      name={abierto ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color="#a3a3a3"
                    />
                  </View>
                </View>

                {abierto && (
                  <View className="mt-3 border-t border-neutral-100 pt-3">
                    {item.items.map((detalle) => (
                      <View
                        key={detalle.producto.id}
                        className="mb-2.5 flex-row items-center"
                      >
                        <View className="mr-3 h-9 w-9 items-center justify-center rounded-lg bg-neutral-100">
                          <Text className="text-lg">
                            {detalle.producto.emoji}
                          </Text>
                        </View>
                        <View className="flex-1">
                          <Text
                            className="text-[13px] font-medium text-neutral-900"
                            numberOfLines={1}
                          >
                            {detalle.producto.nombre}
                          </Text>
                          <Text className="text-[11px] text-neutral-400">
                            {detalle.cantidad} ×{' '}
                            {formatoPrecio(detalle.producto.precio)}
                          </Text>
                        </View>
                        <Text className="text-[13px] font-semibold text-neutral-900">
                          {formatoPrecio(
                            detalle.producto.precio * detalle.cantidad
                          )}
                        </Text>
                      </View>
                    ))}
                    <View className="mt-1 flex-row items-center justify-between border-t border-neutral-100 pt-3">
                      <Text className="text-sm text-neutral-500">Total</Text>
                      <Text className="text-[15px] font-bold text-neutral-900">
                        {formatoPrecio(item.total)}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </Entrada>
          );
        }}
      />
    </View>
  );
}