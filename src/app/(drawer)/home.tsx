import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useProductos } from '../../context/ProductosContext';
import { useSesion } from '../../context/SesionContext';
import { useCarrito } from '../../context/CarritoContext';
import { formatoPrecio } from '../../utils/formato';
import { SeccionTitulo } from '../../components/ui/Button';
import AsistenteChat from '../../components/AsistenteChat';
import Entrada from '../../components/ui/Entrada';
import type { Seccion } from '../../data/productos';

const SERVICIOS = [
  { emoji: '🚚', titulo: 'Despacho a domicilio', detalle: 'En todo Chile' },
  { emoji: '🏬', titulo: 'Retiro en tienda', detalle: 'De inmediato' },
  { emoji: '💳', titulo: '24 cuotas sin interés', detalle: 'Con tarjetas' },
  { emoji: '🛡️', titulo: 'Garantía 12 meses', detalle: 'En todos los productos' },
];

function TiraCategoria({ seccion }: { seccion: Seccion }) {
  const { productosDeSeccion } = useProductos();
  const productos = productosDeSeccion(seccion.id).slice(0, 4);

  return (
    <View className="mb-8">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-xl font-bold tracking-tight text-neutral-900">
          {seccion.emoji} {seccion.nombre}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push(`/seccion/${seccion.id}`)}
        >
          <Text className="text-[13px] font-semibold text-oferta">
            Ver todo ›
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {productos.map((producto) => (
          <TouchableOpacity
            key={producto.id}
            className="w-40 rounded-2xl border border-neutral-200 bg-white p-3.5"
            activeOpacity={0.7}
            onPress={() => router.push(`/producto/${producto.id}`)}
          >
            <View className="mb-2.5 h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
              <Text className="text-2xl">{producto.emoji}</Text>
            </View>
            <Text
              className="text-[13px] font-semibold text-neutral-900"
              numberOfLines={2}
            >
              {producto.nombre}
            </Text>
            <Text className="mt-1 text-[14px] font-bold text-neutral-900">
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
    </View>
  );
}

export default function Home() {
  const { productos, seccionesDeCategoria } = useProductos();
  const { rol, cerrarSesion } = useSesion();
  const { cantidadTotal } = useCarrito();
  const [busqueda, setBusqueda] = useState('');
  const [modalAyuda, setModalAyuda] = useState(false);
  const [modalIA, setModalIA] = useState(false);

  const esAdmin = rol === 'admin';
  const recomendados = productos.slice(0, 6);
  const tecnologia = seccionesDeCategoria('tecnologia');
  const ropa = seccionesDeCategoria('ropa');

  return (
    <View className="flex-1 bg-neutral-50">
      <View className="flex-row items-center gap-2 border-b border-neutral-100 bg-white px-4 pb-3 pt-3">
        <View className="shrink-0 flex-row items-center gap-1.5">
          <View className="h-7 w-7 items-center justify-center rounded-md bg-oferta">
            <Text className="text-[13px] font-black text-white">M</Text>
          </View>
          <Text
            className="text-[15px] font-black tracking-tight text-neutral-900"
            numberOfLines={1}
          >
            MiniStore
          </Text>
        </View>

        <View className="h-9 min-w-0 flex-1 flex-row items-center rounded-lg border border-neutral-200 bg-white px-2.5">
          <Ionicons name="search" size={16} color="#a3a3a3" />
          <TextInput
            className="ml-1.5 h-full min-w-0 flex-1 py-0 text-[13px] text-neutral-900"
            placeholder="Buscar en MiniStore..."
            placeholderTextColor="#a3a3a3"
            value={busqueda}
            onChangeText={setBusqueda}
            onSubmitEditing={() => {
              router.push('/busqueda');
              setBusqueda('');
            }}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity
          className="h-9 w-9 shrink-0 items-center justify-center"
          activeOpacity={0.7}
          onPress={() => router.push('/(drawer)/carrito')}
          accessibilityLabel="Ver carrito"
        >
          <Ionicons name="cart-outline" size={22} color="#171717" />
          {cantidadTotal > 0 && (
            <View className="absolute -right-1 -top-0.5 h-[18px] min-w-[18px] items-center justify-center rounded-full bg-oferta px-1">
              <Text className="text-[9px] font-bold text-white">
                {cantidadTotal}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 bg-neutral-50"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        <Text className="mt-1 mb-5 text-[13px] text-neutral-400">
          Hola, {esAdmin ? 'Administrador' : 'usuario'} 👋 ·{' '}
          {productos.length} productos disponibles
        </Text>

        <Entrada>
        <View className="mb-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <View className="mb-2 flex-row items-center gap-2">
                <View className="rounded bg-oferta px-2 py-0.5">
                  <Text className="text-[9px] font-bold tracking-widest text-white">
                    OFERTAS
                  </Text>
                </View>
                <Text className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  MiniStore
                </Text>
              </View>
              <Text className="text-2xl font-bold tracking-tight text-neutral-900">
                Hasta 24 cuotas sin interés
              </Text>
              <Text className="mt-1.5 text-sm text-neutral-500">
                En todo el catálogo · Compra y retira en tienda.
              </Text>
            </View>
            <View className="ml-4 h-14 w-14 items-center justify-center rounded-2xl bg-oferta">
              <Text className="text-2xl">⚡</Text>
            </View>
          </View>
        </View>
      </Entrada>

      <Entrada retraso={60}>
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
      </Entrada>

        <Entrada retraso={140}>
        <SeccionTitulo texto="Tecnología" />
        {tecnologia.slice(0, 3).map((seccion) => (
          <TiraCategoria key={seccion.id} seccion={seccion} />
        ))}
        </Entrada>

        <Entrada retraso={220}>
        <SeccionTitulo texto="Ropa" />
        {ropa.slice(0, 3).map((seccion) => (
          <TiraCategoria key={seccion.id} seccion={seccion} />
        ))}
        </Entrada>

        <Entrada retraso={300}>
        <SeccionTitulo texto="Servicios y beneficios" />
        <View className="mb-8 flex-row flex-wrap gap-3">
          {SERVICIOS.map((s) => (
            <View
              key={s.titulo}
              className="w-[48%] rounded-2xl border border-neutral-200 bg-white p-4"
            >
              <Text className="mb-2 text-2xl">{s.emoji}</Text>
              <Text className="text-[13px] font-semibold text-neutral-900">
                {s.titulo}
              </Text>
              <Text className="mt-0.5 text-[11px] text-neutral-400">
                {s.detalle}
              </Text>
            </View>
          ))}
        </View>
        </Entrada>

        <Entrada retraso={360}>
        <View className="mb-8 rounded-2xl border border-neutral-200 bg-white p-5">
          <View className="flex-row items-center gap-2.5">
            <Text className="text-2xl">🧑‍💻</Text>
            <View className="flex-1">
              <Text className="text-[15px] font-bold text-neutral-900">
                ¿Necesitas ayuda?
              </Text>
              <Text className="mt-0.5 text-[13px] text-neutral-500">
                Pregúntale a nuestro asistente IA o contacta al equipo.
              </Text>
            </View>
            <TouchableOpacity
              className="mr-2 h-10 items-center justify-center rounded-xl border border-neutral-300 px-3.5"
              activeOpacity={0.8}
              onPress={() => setModalAyuda(true)}
            >
              <Text className="text-[13px] font-semibold text-neutral-900">
                Ayuda
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-10 items-center justify-center rounded-xl bg-oferta px-3.5"
              activeOpacity={0.8}
              onPress={() => setModalIA(true)}
            >
              <Text className="text-[13px] font-semibold text-white">
                Chat IA
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </Entrada>

        <Entrada retraso={420}>
        <View className="mb-8 rounded-2xl border border-neutral-200 bg-white p-5">
          <View className="flex-row flex-wrap">
            <View className="mb-5 w-1/2">
              <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-900">
                Ventas
              </Text>
              <Text className="mb-1 text-[13px] text-neutral-500">
                +56 2 2560 0040
              </Text>
              <Text className="text-[13px] text-neutral-500">
                ventas@ministore.cl
              </Text>
            </View>
            <View className="mb-5 w-1/2">
              <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-900">
                Ayuda
              </Text>
              <Text className="mb-1 text-[13px] text-neutral-500">
                Centro de ayuda
              </Text>
              <Text className="text-[13px] text-neutral-500">
                Estado de tu compra
              </Text>
            </View>
            <View className="w-1/2">
              <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-900">
                MiniStore
              </Text>
              <Text className="mb-1 text-[13px] text-neutral-500">
                Quiénes somos
              </Text>
              <Text className="text-[13px] text-neutral-500">
                Términos y condiciones
              </Text>
            </View>
            <View className="w-1/2">
              <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-900">
                Mi cuenta
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  cerrarSesion();
                  router.replace('/');
                }}
              >
                <Text className="text-[13px] font-medium text-neutral-500">
                  Cerrar sesión
                </Text>
              </TouchableOpacity>
              {esAdmin && (
                <TouchableOpacity
                  className="mt-1"
                  activeOpacity={0.7}
                  onPress={() => router.push('/(drawer)/admin')}
                >
                  <Text className="text-[13px] font-medium text-neutral-500">
                    Administración
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        </Entrada>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-oferta"
        activeOpacity={0.85}
        onPress={() => setModalIA(true)}
        accessibilityLabel="Asistente IA MiniStore"
      >
        <Ionicons name="chatbubble-ellipses" size={26} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modalAyuda}
        animationType="slide"
        transparent
        onRequestClose={() => setModalAyuda(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-3xl bg-white p-6 pb-10">
            <View className="mb-4 h-1.5 w-10 self-center rounded-full bg-neutral-200" />
            <View className="mb-5 flex-row items-center gap-3">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
                <Text className="text-xl">🧑‍💻</Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold tracking-tight text-neutral-900">
                  Asistente MiniStore
                </Text>
                <Text className="text-xs text-neutral-400">
                  ¿En qué podemos ayudarte?
                </Text>
              </View>
            </View>

            {[
              {
                icono: 'call-outline',
                titulo: 'Ventas telefónicas',
                detalle: '+56 2 2560 0040 · Lun a Sáb 9:00-19:00',
              },
              {
                icono: 'mail-outline',
                titulo: 'Correo',
                detalle: 'ayuda@ministore.cl',
              },
              {
                icono: 'time-outline',
                titulo: 'Retiro en tienda',
                detalle: 'Compra online y retira de inmediato',
              },
            ].map((opcion) => (
              <View
                key={opcion.titulo}
                className="mb-3 flex-row items-center rounded-2xl border border-neutral-200 p-4"
              >
                <View className="mr-3.5 h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
                  <Ionicons name={opcion.icono as never} size={19} color="#525252" />
                </View>
                <View className="flex-1">
                  <Text className="text-[14px] font-semibold text-neutral-900">
                    {opcion.titulo}
                  </Text>
                  <Text className="mt-0.5 text-xs text-neutral-400">
                    {opcion.detalle}
                  </Text>
                </View>
              </View>
            ))}

            <TouchableOpacity
              className="mt-2 h-12 items-center justify-center rounded-xl bg-neutral-900"
              activeOpacity={0.8}
              onPress={() => setModalAyuda(false)}
            >
              <Text className="text-[15px] font-semibold text-white">
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <AsistenteChat visible={modalIA} onClose={() => setModalIA(false)} />
    </View>
  );
}