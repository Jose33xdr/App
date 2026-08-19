import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useProductos } from '../context/ProductosContext';
import { responderAsistente } from '../services/asistente';
import { formatoPrecio } from '../utils/formato';
import type { Producto } from '../data/productos';

interface Mensaje {
  id: number;
  rol: 'usuario' | 'asistente';
  texto: string;
  productos?: Producto[];
}

const SUGERENCIAS = [
  '🎧 Buscar audífonos',
  '💳 Formas de pago',
  '🚚 ¿Hacen despacho?',
  '🎉 Ofertas',
  '🏬 Retiro en tienda',
];

export default function AsistenteChat({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { productos, secciones } = useProductos();
  const contador = useRef(0);
  const scrollRef = useRef<ScrollView>(null);
  const [entrada, setEntrada] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: 0,
      rol: 'asistente',
      texto:
        'Hola 👋 Soy el asistente IA de MiniStore. Pregúntame por productos, precios, stock, pagos o despacho.',
    },
  ]);

  const enviar = (textoManual?: string) => {
    const texto = (textoManual ?? entrada).trim();
    if (!texto || escribiendo) return;

    setMensajes((m) => [
      ...m,
      { id: contador.current++, rol: 'usuario', texto },
    ]);
    setEntrada('');
    setEscribiendo(true);

    setTimeout(() => {
      const respuesta = responderAsistente(texto, productos, secciones);
      setMensajes((m) => [
        ...m,
        {
          id: contador.current++,
          rol: 'asistente',
          texto: respuesta.texto,
          productos: respuesta.productos,
        },
      ]);
      setEscribiendo(false);
    }, 700);
  };

  const abrirProducto = (id: string) => {
    onClose();
    router.push(`/producto/${id}`);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="flex-row items-center gap-3 border-b border-neutral-100 px-4 pb-3 pt-14">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-oferta">
            <Text className="text-[17px] font-black text-white">M</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-bold tracking-tight text-neutral-900">
              Asistente IA MiniStore
            </Text>
            <View className="flex-row items-center gap-1">
              <View className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <Text className="text-[11px] text-neutral-400">
                Online · responde al instante
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="h-9 w-9 items-center justify-center"
            activeOpacity={0.7}
            onPress={onClose}
            accessibilityLabel="Cerrar asistente"
          >
            <Ionicons name="close" size={24} color="#171717" />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          {mensajes.map((m) => (
            <View key={m.id}>
              <View
                className={`mb-2 max-w-[85%] rounded-2xl px-4 py-3 ${
                  m.rol === 'usuario'
                    ? 'self-end rounded-br-md bg-neutral-900'
                    : 'self-start rounded-bl-md bg-neutral-100'
                }`}
              >
                <Text
                  className={`text-[14px] leading-5 ${
                    m.rol === 'usuario'
                      ? 'text-white'
                      : 'text-neutral-900'
                  }`}
                >
                  {m.texto}
                </Text>
              </View>

              {m.productos?.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  className="mb-2 flex-row items-center self-start rounded-2xl border border-neutral-200 bg-white p-3"
                  activeOpacity={0.7}
                  onPress={() => abrirProducto(p.id)}
                >
                  <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
                    <Text className="text-xl">{p.emoji}</Text>
                  </View>
                  <View className="flex-1 pr-2">
                    <Text
                      className="text-[13px] font-semibold text-neutral-900"
                      numberOfLines={1}
                    >
                      {p.nombre}
                    </Text>
                    <Text className="text-[13px] font-bold text-oferta">
                      {formatoPrecio(p.precio)}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color="#a3a3a3"
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {escribiendo && (
            <View className="mb-2 flex-row items-center gap-2 self-start rounded-2xl rounded-bl-md bg-neutral-100 px-4 py-3">
              <ActivityIndicator size="small" color="#737373" />
              <Text className="text-[13px] text-neutral-500">
                El asistente está escribiendo...
              </Text>
            </View>
          )}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="border-t border-neutral-100 pt-3"
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {SUGERENCIAS.map((s) => (
            <TouchableOpacity
              key={s}
              className="rounded-full border border-neutral-200 px-3.5 py-2"
              activeOpacity={0.7}
              onPress={() => enviar(s)}
            >
              <Text className="text-[12px] font-medium text-neutral-700">
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row items-center gap-2 px-4 pb-8 pt-3">
          <View className="h-11 flex-1 flex-row items-center rounded-xl border border-neutral-200 bg-neutral-50 px-3.5">
            <TextInput
              className="h-full flex-1 py-0 text-[14px] text-neutral-900"
              placeholder="Escribe tu pregunta..."
              placeholderTextColor="#a3a3a3"
              value={entrada}
              onChangeText={setEntrada}
              onSubmitEditing={() => enviar()}
              returnKeyType="send"
            />
          </View>
          <TouchableOpacity
            className="h-11 w-11 items-center justify-center rounded-xl bg-oferta"
            activeOpacity={0.8}
            onPress={() => enviar()}
            accessibilityLabel="Enviar mensaje"
          >
            <Ionicons name="arrow-up" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}