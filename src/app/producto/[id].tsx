import React, { useEffect, useState } from 'react';
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
import Button from '../../components/ui/Button';
import Entrada from '../../components/ui/Entrada';
import { SeccionTitulo } from '../../components/ui/Button';

export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { buscarProducto, productosDeSeccion } = useProductos();
  const { agregar, cantidadTotal } = useCarrito();
  const { esFavorito, alternar } = useFavoritos();
  const [cantidad, setCantidad] = useState(1);

  const producto = id ? buscarProducto(id) : undefined;

  useEffect(() => {
    setCantidad(1);
  }, [producto?.id]);

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
  const stockBajo = !sinStock && producto.stock <= 5;
  const favorito = esFavorito(producto.id);
  const relacionados = productosDeSeccion(producto.seccionId)
    .filter((p) => p.id !== producto.id)
    .slice(0, 6);

  const cambiarCantidad = (delta: number) => {
    setCantidad((prev) =>
      Math.min(Math.max(prev + delta, 1), producto.stock)
    );
  };

  const agregarAlCarrito = () => {
    agregar(producto, cantidad);
    Alert.alert(
      'Producto agregado',
      `${cantidad} × ${producto.nombre} se agregó a tu carrito.`,
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

      <Entrada>
        <View className="mb-6 h-32 w-32 items-center justify-center self-center rounded-3xl bg-neutral-100">
          <Text className="text-6xl">{producto.emoji}</Text>
        </View>

        <Text className="text-center text-2xl font-bold tracking-tight text-neutral-900">
          {producto.nombre}
        </Text>
        <Text className="mt-1 text-center text-xl font-bold text-neutral-900">
          {formatoPrecio(producto.precio)}
        </Text>

        <Text className="mt-1.5 text-center text-xs text-neutral-400">
          Código {producto.id.toUpperCase()} ·{' '}
          {sinStock
            ? 'Sin stock'
            : `En stock · ${producto.stock} disponibles`}
        </Text>

        {stockBajo && (
          <View className="mt-2 self-center rounded-full bg-oferta/10 px-3 py-1">
            <Text className="text-[11px] font-semibold text-oferta">
              ⚠️ Quedan solo {producto.stock}{' '}
              {producto.stock === 1 ? 'unidad' : 'unidades'}
            </Text>
          </View>
        )}
      </Entrada>

      <Entrada retraso={60}>
        <View className="mt-2 mb-1 self-center rounded bg-oferta px-2 py-1">
          <Text className="text-[10px] font-bold tracking-widest text-white">
            OFERTA
          </Text>
        </View>

        <View className="mt-3 mb-4 w-full rounded-2xl border border-neutral-200 bg-white p-4">
        {[
          { etiqueta: 'Oferta MiniStore', emoji: '🏷️' },
          { etiqueta: 'Transferencia', emoji: '🏦' },
          { etiqueta: 'Otros medios de pago', emoji: '💳' },
        ].map((opcion, indice) => (
          <View
            key={opcion.etiqueta}
            className={`flex-row items-center justify-between py-2 ${
              indice < 2 ? 'border-b border-neutral-100' : ''
            }`}
          >
            <Text className="text-[13px] text-neutral-500">
              {opcion.emoji} {opcion.etiqueta}
            </Text>
            <Text className="text-[15px] font-bold text-neutral-900">
              {formatoPrecio(producto.precio)}
            </Text>
          </View>
        ))}
      </View>
      </Entrada>

      <Entrada retraso={120}>
      <Text className="mb-1 text-center text-[13px] font-semibold text-oferta">
        O llévalo hasta en 24 cuotas sin interés
      </Text>

      <TouchableOpacity
        className="mb-7 flex-row items-center self-center py-1"
        activeOpacity={0.7}
        onPress={() => alternar(producto)}
      >
        <Ionicons
          name={favorito ? 'heart' : 'heart-outline'}
          size={17}
          color={favorito ? '#D50000' : '#a3a3a3'}
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
      </Entrada>

      <Entrada retraso={180}>
      {!sinStock && (
        <>
          <View className="mb-3 flex-row items-center justify-center gap-6">
            <TouchableOpacity
              className="h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-white"
              activeOpacity={0.7}
              onPress={() => cambiarCantidad(-1)}
              disabled={cantidad <= 1}
              accessibilityLabel="Disminuir cantidad"
            >
              <Ionicons
                name="remove"
                size={22}
                color={cantidad <= 1 ? '#d4d4d4' : '#171717'}
              />
            </TouchableOpacity>
            <View className="min-w-12 items-center">
              <Text className="text-2xl font-bold text-neutral-900">
                {cantidad}
              </Text>
              <Text className="text-[10px] text-neutral-400">unidades</Text>
            </View>
            <TouchableOpacity
              className="h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-white"
              activeOpacity={0.7}
              onPress={() => cambiarCantidad(1)}
              disabled={cantidad >= producto.stock}
              accessibilityLabel="Aumentar cantidad"
            >
              <Ionicons
                name="add"
                size={22}
                color={cantidad >= producto.stock ? '#d4d4d4' : '#171717'}
              />
            </TouchableOpacity>
          </View>
          <Text className="mb-4 text-center text-[13px] text-neutral-500">
            Subtotal:{' '}
            <Text className="font-bold text-neutral-900">
              {formatoPrecio(producto.precio * cantidad)}
            </Text>
            {cantidad >= producto.stock && (
              <Text className="text-oferta"> · Máximo disponible</Text>
            )}
          </Text>
        </>
      )}

      <Button
        titulo={
          sinStock
            ? 'Agotado'
            : cantidad > 1
              ? `Agregar ${cantidad} al carrito`
              : 'Agregar al carrito'
        }
        onPress={agregarAlCarrito}
        deshabilitado={sinStock}
        icono="cart-outline"
      />

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
      </Entrada>

      {relacionados.length > 0 && (
        <Entrada retraso={240}>
          <SeccionTitulo texto="Te puede interesar" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingBottom: 4 }}
          >
            {relacionados.map((p) => (
              <TouchableOpacity
                key={p.id}
                className="w-40 rounded-2xl border border-neutral-200 bg-white p-3.5"
                activeOpacity={0.7}
                onPress={() => router.push(`/producto/${p.id}`)}
              >
                <View className="mb-2.5 h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
                  <Text className="text-2xl">{p.emoji}</Text>
                </View>
                <Text
                  className="text-[13px] font-semibold text-neutral-900"
                  numberOfLines={2}
                >
                  {p.nombre}
                </Text>
                <Text className="mt-1 text-[14px] font-bold text-neutral-900">
                  {formatoPrecio(p.precio)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Entrada>
      )}
    </ScrollView>
  );
}