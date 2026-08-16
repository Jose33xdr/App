import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import type { Producto, Seccion } from '../data/productos';
import type { DatosProducto } from '../services/tipos';
import { useProductos } from '../context/ProductosContext';

interface ProductoFormProps {
  inicial?: Producto;
  onGuardar: (datos: DatosProducto) => void;
  onCancelar: () => void;
}

export default function ProductoForm({
  inicial,
  onGuardar,
  onCancelar,
}: ProductoFormProps) {
  const { secciones, buscarSeccion } = useProductos();
  const [nombre, setNombre] = useState(inicial?.nombre ?? '');
  const [precio, setPrecio] = useState(
    inicial ? String(inicial.precio) : ''
  );
  const [stock, setStock] = useState(
    inicial ? String(inicial.stock) : '10'
  );
  const [emoji, setEmoji] = useState(inicial?.emoji ?? '🛍️');
  const [seccionId, setSeccionId] = useState(inicial?.seccionId ?? '');
  const [descripcion, setDescripcion] = useState(
    inicial?.descripcion ?? ''
  );

  const guardar = () => {
    const precioNumero = Number(precio);
    const stockNumero = Number(stock);

    if (!nombre.trim()) {
      alert('Ingresa el nombre del producto.');
      return;
    }
    if (!seccionId) {
      alert('Selecciona una sección.');
      return;
    }
    if (!precio || isNaN(precioNumero) || precioNumero <= 0) {
      alert('Ingresa un precio válido.');
      return;
    }

    onGuardar({
      nombre: nombre.trim(),
      precio: precioNumero,
      stock: isNaN(stockNumero) ? 0 : stockNumero,
      emoji: emoji.trim() || '🛍️',
      seccionId,
      descripcion: descripcion.trim(),
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="mb-4 text-xl font-bold tracking-tight text-neutral-900">
          {inicial ? 'Editar producto' : 'Nuevo producto'}
        </Text>

        <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Nombre
        </Text>
        <TextInput
          className="mb-4 h-12 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-[15px] text-neutral-900"
          placeholder="Ej. Audífonos Bluetooth"
          placeholderTextColor="#a3a3a3"
          value={nombre}
          onChangeText={setNombre}
        />

        <View className="mb-4 flex-row gap-3">
          <View className="flex-1">
            <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Precio ($)
            </Text>
            <TextInput
              className="h-12 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-[15px] text-neutral-900"
              placeholder="29990"
              placeholderTextColor="#a3a3a3"
              keyboardType="numeric"
              value={precio}
              onChangeText={setPrecio}
            />
          </View>

          <View className="flex-1">
            <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Stock
            </Text>
            <TextInput
              className="h-12 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-[15px] text-neutral-900"
              placeholder="10"
              placeholderTextColor="#a3a3a3"
              keyboardType="numeric"
              value={stock}
              onChangeText={setStock}
            />
          </View>
        </View>

        <View className="mb-4 flex-row gap-3">
          <View className="flex-1">
            <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Emoji
            </Text>
            <TextInput
              className="h-12 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-[15px] text-neutral-900"
              placeholder="🎧"
              placeholderTextColor="#a3a3a3"
              value={emoji}
              onChangeText={setEmoji}
            />
          </View>
        </View>

        <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Sección
        </Text>
        <View className="mb-6 flex-row flex-wrap gap-2">
          {secciones.map((seccion: Seccion) => {
            const activa = seccionId === seccion.id;
            return (
              <TouchableOpacity
                key={seccion.id}
                className={`h-9 items-center justify-center rounded-full border px-3 ${
                  activa
                    ? 'border-neutral-900 bg-neutral-900'
                    : 'border-neutral-200 bg-neutral-50'
                }`}
                activeOpacity={0.7}
                onPress={() => setSeccionId(seccion.id)}
              >
                <Text
                  className={`text-[13px] font-medium ${
                    activa ? 'text-white' : 'text-neutral-600'
                  }`}
                >
                  {seccion.emoji} {seccion.nombre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Descripción
        </Text>
        <TextInput
          className="mb-6 min-h-[90px] rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[15px] text-neutral-900"
          placeholder="Describe el producto..."
          placeholderTextColor="#a3a3a3"
          multiline
          textAlignVertical="top"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        {inicial && buscarSeccion(inicial.seccionId) && (
          <Text className="-mt-4 mb-6 text-xs text-neutral-400">
            Sección actual: {buscarSeccion(inicial.seccionId)?.emoji}{' '}
            {buscarSeccion(inicial.seccionId)?.nombre}
          </Text>
        )}

        <View className="flex-row gap-3">
          <TouchableOpacity
            className="h-12 flex-1 items-center justify-center rounded-xl border border-neutral-200 bg-white"
            activeOpacity={0.7}
            onPress={onCancelar}
          >
            <Text className="text-[15px] font-semibold text-neutral-600">
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="h-12 flex-1 items-center justify-center rounded-xl bg-neutral-900"
            activeOpacity={0.8}
            onPress={guardar}
          >
            <Text className="text-[15px] font-semibold text-white">
              {inicial ? 'Guardar cambios' : 'Agregar'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}