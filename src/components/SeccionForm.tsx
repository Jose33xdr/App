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

import type { Categoria, Seccion } from '../data/productos';
import { INFO_CATEGORIAS } from '../data/productos';
import type { DatosSeccion } from '../services/tipos';

interface SeccionFormProps {
  inicial?: Seccion;
  onGuardar: (datos: DatosSeccion) => void;
  onCancelar: () => void;
}

export default function SeccionForm({
  inicial,
  onGuardar,
  onCancelar,
}: SeccionFormProps) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '');
  const [emoji, setEmoji] = useState(inicial?.emoji ?? '🛍️');
  const [categoria, setCategoria] = useState<Categoria>(
    inicial?.categoria ?? 'tecnologia'
  );

  const guardar = () => {
    if (!nombre.trim()) {
      alert('Ingresa el nombre de la sección.');
      return;
    }

    onGuardar({
      nombre: nombre.trim(),
      emoji: emoji.trim() || '🛍️',
      categoria,
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
          {inicial ? 'Editar sección' : 'Nueva sección'}
        </Text>

        <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Nombre
        </Text>
        <TextInput
          className="mb-4 h-12 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-[15px] text-neutral-900"
          placeholder="Ej. Audio, Computación..."
          placeholderTextColor="#a3a3a3"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Emoji
        </Text>
        <TextInput
          className="mb-4 h-12 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-[15px] text-neutral-900"
          placeholder="🎧"
          placeholderTextColor="#a3a3a3"
          value={emoji}
          onChangeText={setEmoji}
        />

        <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Categoría
        </Text>
        <View className="mb-6 flex-row gap-3">
          {(Object.keys(INFO_CATEGORIAS) as Categoria[]).map((cat) => {
            const activa = categoria === cat;
            return (
              <TouchableOpacity
                key={cat}
                className={`flex-1 h-11 items-center justify-center rounded-xl border ${
                  activa
                    ? 'border-neutral-900 bg-neutral-900'
                    : 'border-neutral-200 bg-neutral-50'
                }`}
                activeOpacity={0.7}
                onPress={() => setCategoria(cat)}
              >
                <Text
                  className={`text-sm font-semibold ${
                    activa ? 'text-white' : 'text-neutral-600'
                  }`}
                >
                  {INFO_CATEGORIAS[cat].emoji} {INFO_CATEGORIAS[cat].nombre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

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
              {inicial ? 'Guardar cambios' : 'Crear'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}