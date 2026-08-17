import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Variante = 'primario' | 'secundario' | 'peligro' | 'claro';
type Tamano = 'md' | 'lg';

interface ButtonProps {
  titulo: string;
  onPress: () => void;
  variante?: Variante;
  tamano?: Tamano;
  icono?: keyof typeof Ionicons.glyphMap;
  deshabilitado?: boolean;
  className?: string;
}

const ESTILOS: Record<
  Variante,
  { contenedor: string; texto: string; icono: string }
> = {
  primario: {
    contenedor: 'bg-neutral-900',
    texto: 'text-white',
    icono: '#fff',
  },
  secundario: {
    contenedor: 'border border-neutral-200 bg-white',
    texto: 'text-neutral-700',
    icono: '#404040',
  },
  peligro: {
    contenedor: 'bg-danger',
    texto: 'text-white',
    icono: '#fff',
  },
  claro: {
    contenedor: 'bg-neutral-100',
    texto: 'text-neutral-800',
    icono: '#262626',
  },
};

export default function Button({
  titulo,
  onPress,
  variante = 'primario',
  tamano = 'lg',
  icono,
  deshabilitado = false,
  className = '',
}: ButtonProps) {
  const estilos = ESTILOS[variante];
  const alto = tamano === 'lg' ? 'h-12' : 'h-10';

  return (
    <TouchableOpacity
      className={`${alto} flex-row items-center justify-center gap-2 rounded-xl ${estilos.contenedor} ${
        deshabilitado ? 'opacity-40' : ''
      } ${className}`}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={deshabilitado}
    >
      {icono && (
        <Ionicons name={icono} size={18} color={estilos.icono} />
      )}
      <Text className={`text-[15px] font-semibold ${estilos.texto}`}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

export function IconoTile({
  emoji,
  tamano = 'md',
}: {
  emoji: string;
  tamano?: 'sm' | 'md' | 'lg';
}) {
  const medidas =
    tamano === 'lg'
      ? 'h-16 w-16 rounded-2xl'
      : tamano === 'md'
        ? 'h-12 w-12 rounded-xl'
        : 'h-9 w-9 rounded-lg';

  return (
    <View
      className={`${medidas} items-center justify-center border border-neutral-100 bg-neutral-100`}
    >
      <Text
        className={
          tamano === 'lg'
            ? 'text-3xl'
            : tamano === 'md'
              ? 'text-2xl'
              : 'text-lg'
        }
      >
        {emoji}
      </Text>
    </View>
  );
}

export function SeccionTitulo({ texto }: { texto: string }) {
  return (
    <Text className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-neutral-400">
      {texto}
    </Text>
  );
}