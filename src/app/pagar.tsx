import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useCarrito } from '../context/CarritoContext';
import { usePedidos } from '../context/PedidosContext';
import { formatoPrecio } from '../utils/formato';
import Button from '../components/ui/Button';

type MetodoPago = 'tarjeta' | 'transferencia' | 'tienda';

const METODOS: {
  id: MetodoPago;
  nombre: string;
  detalle: string;
  icono: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    id: 'tarjeta',
    nombre: 'Tarjeta de crédito o débito',
    detalle: 'Visa, Mastercard, AMEX',
    icono: 'card-outline',
  },
  {
    id: 'transferencia',
    nombre: 'Transferencia bancaria',
    detalle: 'BancoEstado y otros bancos',
    icono: 'swap-horizontal-outline',
  },
  {
    id: 'tienda',
    nombre: 'Pago en tienda',
    detalle: 'Reserva y paga al retirar',
    icono: 'storefront-outline',
  },
];

export default function Pagar() {
  const { items, total, cantidadTotal, vaciar } = useCarrito();
  const { agregarPedido } = usePedidos();

  const [metodo, setMetodo] = useState<MetodoPago>('tarjeta');
  const [numero, setNumero] = useState('');
  const [nombreTitular, setNombreTitular] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [pagado, setPagado] = useState(false);
  const [totalPagado, setTotalPagado] = useState(0);
  const [ordenId] = useState(
    () => `MIN-${Date.now().toString().slice(-8)}`
  );

  const formatearNumero = (texto: string) => {
    const digitos = texto.replace(/\D/g, '').slice(0, 16);
    return digitos.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatearVencimiento = (texto: string) => {
    const digitos = texto.replace(/\D/g, '').slice(0, 4);
    if (digitos.length <= 2) {
      return digitos;
    }
    return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
  };

  const validarTarjeta = () => {
    if (numero.replace(/\s/g, '').length !== 16) {
      Alert.alert(
        'Datos de tarjeta inválidos',
        'Ingresa un número de tarjeta de 16 dígitos.'
      );
      return false;
    }
    if (!nombreTitular.trim()) {
      Alert.alert('Datos de tarjeta inválidos', 'Ingresa el nombre del titular.');
      return false;
    }
    if (vencimiento.length !== 5) {
      Alert.alert(
        'Datos de tarjeta inválidos',
        'Ingresa la fecha de vencimiento (MM/AA).'
      );
      return false;
    }
    if (cvv.length < 3) {
      Alert.alert('Datos de tarjeta inválidos', 'Ingresa el código de seguridad (CVV).');
      return false;
    }
    return true;
  };

  const pagar = () => {
    if (metodo === 'tarjeta' && !validarTarjeta()) {
      return;
    }
    setTotalPagado(total);
    setPagado(true);
    agregarPedido({
      id: ordenId,
      fecha: new Date().toISOString(),
      total,
      metodoPago: metodo,
      items: [...items],
    });
    vaciar();
  };

  if (pagado) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-8">
        <Stack.Screen options={{ title: 'Pago exitoso' }} />
        <View className="mb-5 h-20 w-20 items-center justify-center rounded-full bg-success">
          <Ionicons name="checkmark" size={40} color="#fff" />
        </View>
        <Text className="text-2xl font-bold tracking-tight text-neutral-900">
          ¡Pago realizado!
        </Text>
        <Text className="mt-2 text-center text-[15px] leading-6 text-neutral-500">
          Tu orden {ordenId} fue registrada con éxito.{'\n'}
          Recibirás un correo con el detalle de tu compra.
        </Text>
        <View className="mt-6 w-full rounded-2xl border border-neutral-200 bg-white p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-neutral-500">Total pagado</Text>
            <Text className="text-lg font-bold text-neutral-900">
              {formatoPrecio(totalPagado)}
            </Text>
          </View>
        </View>
        <Button
          titulo="Volver al inicio"
          onPress={() => router.replace('/(drawer)/home')}
          className="mt-6 w-full"
        />
        <Button
          titulo="Ver mis pedidos"
          variante="secundario"
          icono="receipt-outline"
          onPress={() => router.replace('/(drawer)/pedidos')}
          className="mt-3 w-full"
        />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-neutral-50"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen options={{ title: 'Pagar compra' }} />

      <View className="mb-6 rounded-2xl border border-neutral-200 bg-white p-5">
        <Text className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Total a pagar
        </Text>
        <Text className="mt-1 text-3xl font-bold tracking-tight text-neutral-900">
          {formatoPrecio(total)}
        </Text>
        <Text className="mt-1 text-sm text-neutral-500">
          {cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'} ·{' '}
          {items.length} {items.length === 1 ? 'tipo' : 'tipos'}
        </Text>
      </View>

      <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
        Método de pago
      </Text>

      {METODOS.map((m) => {
        const activo = metodo === m.id;
        return (
          <TouchableOpacity
            key={m.id}
            className={`mb-3 flex-row items-center rounded-2xl border p-4 ${
              activo
                ? 'border-neutral-900 bg-neutral-100'
                : 'border-neutral-200 bg-white'
            }`}
            activeOpacity={0.7}
            onPress={() => setMetodo(m.id)}
          >
            <View
              className={`mr-3.5 h-11 w-11 items-center justify-center rounded-xl ${
                activo ? 'bg-neutral-900' : 'bg-neutral-100'
              }`}
            >
              <Ionicons
                name={m.icono}
                size={20}
                color={activo ? '#fff' : '#525252'}
              />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-neutral-900">
                {m.nombre}
              </Text>
              <Text className="mt-0.5 text-xs text-neutral-400">
                {m.detalle}
              </Text>
            </View>
            <Ionicons
              name={activo ? 'radio-button-on' : 'radio-button-off'}
              size={22}
              color={activo ? '#171717' : '#a3a3a3'}
            />
          </TouchableOpacity>
        );
      })}

      {metodo === 'tarjeta' && (
        <View className="mt-2 rounded-2xl border border-neutral-200 bg-white p-5">
          <Text className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Datos de la tarjeta
          </Text>

          <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Número de tarjeta
          </Text>
          <TextInput
            className="mb-4 h-12 rounded-xl border border-neutral-200 bg-white px-4 text-[15px] tracking-widest text-neutral-900"
            placeholder="0000 0000 0000 0000"
            placeholderTextColor="#a3a3a3"
            keyboardType="numeric"
            value={numero}
            onChangeText={(t) => setNumero(formatearNumero(t))}
          />

          <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Nombre del titular
          </Text>
          <TextInput
            className="mb-4 h-12 rounded-xl border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900"
            placeholder="Como aparece en la tarjeta"
            placeholderTextColor="#a3a3a3"
            autoCapitalize="words"
            value={nombreTitular}
            onChangeText={setNombreTitular}
          />

          <View className="mb-5 flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Vencimiento
              </Text>
              <TextInput
                className="h-12 rounded-xl border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900"
                placeholder="MM/AA"
                placeholderTextColor="#a3a3a3"
                keyboardType="numeric"
                value={vencimiento}
                onChangeText={(t) => setVencimiento(formatearVencimiento(t))}
              />
            </View>

            <View className="flex-1">
              <Text className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                CVV
              </Text>
              <TextInput
                className="h-12 rounded-xl border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900"
                placeholder="123"
                placeholderTextColor="#a3a3a3"
                keyboardType="numeric"
                secureTextEntry
                maxLength={4}
                value={cvv}
                onChangeText={(t) => setCvv(t.replace(/\D/g, ''))}
              />
            </View>
          </View>

          <Text className="text-xs leading-5 text-neutral-400">
            🔒 Pago simulado. Tus datos no se almacenan ni se envían a
            ningún servidor.
          </Text>
        </View>
      )}

      {metodo === 'transferencia' && (
        <View className="mt-2 rounded-2xl border border-neutral-200 bg-white p-5">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Datos para transferir
          </Text>
          <Text className="mb-1 text-[15px] font-semibold text-neutral-900">
            Banco Estado · Cuenta RUT 12.345.678-9
          </Text>
          <Text className="mb-1 text-[15px] font-semibold text-neutral-900">
            Titular: MiniStore SpA
          </Text>
          <Text className="text-[15px] font-semibold text-neutral-900">
            Monto: {formatoPrecio(total)}
          </Text>
          <Text className="mt-4 text-xs leading-5 text-neutral-400">
            Envía el comprobante a pagos@ministore.cl indicando tu número de
            orden. (Pago simulado: no envíes dinero real).
          </Text>
        </View>
      )}

      {metodo === 'tienda' && (
        <View className="mt-2 rounded-2xl border border-neutral-200 bg-white p-5">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Reserva tu compra
          </Text>
          <Text className="text-[15px] leading-6 text-neutral-600">
            Reservamos tus productos en la tienda más cercana y pagas al
            retirar. Tu reserva queda guardada por 48 horas.
          </Text>
        </View>
      )}

      <Button
        titulo={
          metodo === 'tarjeta'
            ? `Pagar ${formatoPrecio(total)}`
            : metodo === 'transferencia'
              ? 'Confirmar transferencia'
              : 'Reservar y pagar en tienda'
        }
        onPress={pagar}
        icono={metodo === 'tarjeta' ? 'lock-closed-outline' : 'checkmark-circle-outline'}
        className="mt-6"
      />

      <TouchableOpacity
        className="mt-3 items-center py-2.5"
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <Text className="text-sm font-medium text-neutral-400">
          Volver al carrito
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}