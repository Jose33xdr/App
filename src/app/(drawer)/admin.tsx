import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import type { Producto, Seccion } from '../../data/productos';
import { INFO_CATEGORIAS } from '../../data/productos';
import { useProductos } from '../../context/ProductosContext';
import { useSesion } from '../../context/SesionContext';
import type { DatosProducto, DatosSeccion } from '../../services/tipos';
import { formatoPrecio } from '../../utils/formato';
import ProductoForm from '../../components/ProductoForm';
import SeccionForm from '../../components/SeccionForm';

type Pestana = 'productos' | 'secciones';

export default function Admin() {
  const { rol } = useSesion();
  const esAdmin = rol === 'admin';

  useEffect(() => {
    if (!esAdmin) {
      router.replace('/(drawer)/home');
    }
  }, [esAdmin]);

  const {
    productos,
    secciones,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    agregarSeccion,
    actualizarSeccion,
    eliminarSeccion,
    buscarSeccion,
    productosDeSeccion,
  } = useProductos();
  const [pestana, setPestana] = useState<Pestana>('productos');
  const [modalProducto, setModalProducto] = useState(false);
  const [editandoProducto, setEditandoProducto] = useState<
    Producto | undefined
  >();
  const [modalSeccion, setModalSeccion] = useState(false);
  const [editandoSeccion, setEditandoSeccion] = useState<
    Seccion | undefined
  >();

  const abrirAgregarProducto = () => {
    setEditandoProducto(undefined);
    setModalProducto(true);
  };

  const abrirEditarProducto = (producto: Producto) => {
    setEditandoProducto(producto);
    setModalProducto(true);
  };

  const guardarProducto = (datos: DatosProducto) => {
    if (editandoProducto) {
      actualizarProducto(editandoProducto.id, datos);
    } else {
      agregarProducto(datos);
    }
    setModalProducto(false);
  };

  const confirmarEliminarProducto = (producto: Producto) => {
    Alert.alert(
      'Eliminar producto',
      `¿Seguro que quieres eliminar "${producto.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarProducto(producto.id),
        },
      ]
    );
  };

  const abrirAgregarSeccion = () => {
    setEditandoSeccion(undefined);
    setModalSeccion(true);
  };

  const abrirEditarSeccion = (seccion: Seccion) => {
    setEditandoSeccion(seccion);
    setModalSeccion(true);
  };

  const guardarSeccion = (datos: DatosSeccion) => {
    if (editandoSeccion) {
      actualizarSeccion(editandoSeccion.id, datos);
    } else {
      agregarSeccion(datos);
    }
    setModalSeccion(false);
  };

  const confirmarEliminarSeccion = (seccion: Seccion) => {
    const cantidad = productosDeSeccion(seccion.id).length;
    if (cantidad > 0) {
      Alert.alert(
        'No se puede eliminar',
        `La sección "${seccion.nombre}" tiene ${cantidad} ${
          cantidad === 1 ? 'producto' : 'productos'
        }. Elimina o mueve esos productos primero.`
      );
      return;
    }

    Alert.alert(
      'Eliminar sección',
      `¿Seguro que quieres eliminar la sección "${seccion.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarSeccion(seccion.id),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-neutral-50 p-5">
      <Text className="text-2xl font-bold tracking-tight text-neutral-900">
        Panel de control
      </Text>
      <Text className="mt-1 mb-5 text-sm text-neutral-500">
        Gestiona el catálogo público completo
      </Text>

      <View className="mb-4 flex-row rounded-xl bg-neutral-200/60 p-1">
        <TouchableOpacity
          className={`h-10 flex-1 items-center justify-center rounded-lg ${
            pestana === 'productos' ? 'bg-neutral-900' : ''
          }`}
          activeOpacity={0.7}
          onPress={() => setPestana('productos')}
        >
          <Text
            className={`text-sm font-semibold ${
              pestana === 'productos' ? 'text-white' : 'text-neutral-500'
            }`}
          >
            Productos ({productos.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-10 flex-1 items-center justify-center rounded-lg ${
            pestana === 'secciones' ? 'bg-neutral-900' : ''
          }`}
          activeOpacity={0.7}
          onPress={() => setPestana('secciones')}
        >
          <Text
            className={`text-sm font-semibold ${
              pestana === 'secciones' ? 'text-white' : 'text-neutral-500'
            }`}
          >
            Secciones ({secciones.length})
          </Text>
        </TouchableOpacity>
      </View>

      {pestana === 'productos' ? (
        <>
          <TouchableOpacity
            className="mb-4 h-12 flex-row items-center justify-center gap-2 rounded-xl bg-neutral-900"
            activeOpacity={0.8}
            onPress={abrirAgregarProducto}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text className="text-[15px] font-semibold text-white">
              Agregar producto
            </Text>
          </TouchableOpacity>

          <FlatList
            data={productos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const seccion = buscarSeccion(item.seccionId);
              return (
                <View className="mb-3 flex-row items-center rounded-2xl border border-neutral-200 bg-white p-4">
                  <View className="mr-3.5 h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
                    <Text className="text-xl">{item.emoji}</Text>
                  </View>

                  <View className="flex-1">
                    <Text
                      className="text-[15px] font-semibold text-neutral-900"
                      numberOfLines={1}
                    >
                      {item.nombre}
                    </Text>
                    <Text className="mt-0.5 text-xs text-neutral-400">
                      {seccion
                        ? `${INFO_CATEGORIAS[seccion.categoria].nombre} · ${seccion.nombre} · `
                        : 'Sección eliminada · '}
                      {formatoPrecio(item.precio)} · stock {item.stock}
                    </Text>
                  </View>

                  <View className="ml-3 flex-row items-center gap-4">
                    <TouchableOpacity
                      onPress={() => abrirEditarProducto(item)}
                      activeOpacity={0.7}
                      accessibilityLabel={`Editar ${item.nombre}`}
                    >
                      <Ionicons
                        name="create-outline"
                        size={20}
                        color="#404040"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => confirmarEliminarProducto(item)}
                      activeOpacity={0.7}
                      accessibilityLabel={`Eliminar ${item.nombre}`}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#c0392b"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </>
      ) : (
        <>
          <TouchableOpacity
            className="mb-4 h-12 flex-row items-center justify-center gap-2 rounded-xl bg-neutral-900"
            activeOpacity={0.8}
            onPress={abrirAgregarSeccion}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text className="text-[15px] font-semibold text-white">
              Agregar sección
            </Text>
          </TouchableOpacity>

          <FlatList
            data={secciones}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="mb-3 flex-row items-center rounded-2xl border border-neutral-200 bg-white p-4">
                <View className="mr-3.5 h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
                  <Text className="text-xl">{item.emoji}</Text>
                </View>

                <View className="flex-1">
                  <Text
                    className="text-[15px] font-semibold text-neutral-900"
                    numberOfLines={1}
                  >
                    {item.nombre}
                  </Text>
                  <Text className="mt-0.5 text-xs text-neutral-400">
                    {INFO_CATEGORIAS[item.categoria].nombre} ·{' '}
                    {productosDeSeccion(item.id).length}{' '}
                    {productosDeSeccion(item.id).length === 1
                      ? 'producto'
                      : 'productos'}
                  </Text>
                </View>

                <View className="ml-3 flex-row items-center gap-4">
                  <TouchableOpacity
                    onPress={() => abrirEditarSeccion(item)}
                    activeOpacity={0.7}
                    accessibilityLabel={`Editar ${item.nombre}`}
                  >
                    <Ionicons
                      name="create-outline"
                      size={20}
                      color="#404040"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => confirmarEliminarSeccion(item)}
                    activeOpacity={0.7}
                    accessibilityLabel={`Eliminar ${item.nombre}`}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color="#c0392b"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      )}

      <Modal
        visible={modalProducto}
        animationType="slide"
        transparent
        onRequestClose={() => setModalProducto(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-3xl bg-white p-5 pb-8">
            <ProductoForm
              inicial={editandoProducto}
              onGuardar={guardarProducto}
              onCancelar={() => setModalProducto(false)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalSeccion}
        animationType="slide"
        transparent
        onRequestClose={() => setModalSeccion(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-3xl bg-white p-5 pb-8">
            <SeccionForm
              inicial={editandoSeccion}
              onGuardar={guardarSeccion}
              onCancelar={() => setModalSeccion(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}