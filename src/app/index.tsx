import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useSesion } from '../context/SesionContext';
import Button from '../components/ui/Button';

const CREDENCIALES_CLIENTE = {
  correo: 'usuario',
  password: '123',
};

const CREDENCIALES_ADMIN = {
  correo: 'admin',
  password: '123',
};

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const { iniciarSesion } = useSesion();

  const ingresar = () => {
    const correoLimpio = correo.trim().toLowerCase();

    if (!correoLimpio || !password) {
      Alert.alert('Campos incompletos', 'Ingresa tu correo y contraseña.');
      return;
    }

    if (
      correoLimpio === CREDENCIALES_ADMIN.correo &&
      password === CREDENCIALES_ADMIN.password
    ) {
      iniciarSesion('admin');
      router.replace('/(drawer)/home');
      return;
    }

    if (
      correoLimpio !== CREDENCIALES_CLIENTE.correo ||
      password !== CREDENCIALES_CLIENTE.password
    ) {
      Alert.alert(
        'Credenciales incorrectas',
        'El correo o la contraseña no son válidos. Intenta nuevamente.'
      );
      return;
    }

    iniciarSesion('cliente');
    router.replace('/(drawer)/home');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 items-center justify-center bg-white px-6"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="w-full max-w-[400px]">
        <View className="mb-8 items-center">
          <View className="mb-4 h-14 w-14 items-center justify-center rounded-2xl bg-oferta">
            <Ionicons name="cube" size={30} color="#fff" />
          </View>
          <Text className="text-3xl font-bold tracking-tight text-neutral-900">
            MiniStore
          </Text>
          <Text className="mt-1.5 text-[15px] text-neutral-400">
            Ingresa a tu cuenta
          </Text>
        </View>

        <Text className="mb-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400">
          Correo electrónico
        </Text>
        <View className="mb-3 flex-row items-center rounded-xl border border-neutral-200 bg-neutral-50">
          <Ionicons
            name="mail-outline"
            size={18}
            color="#a3a3a3"
            style={{ marginLeft: 14 }}
          />
          <TextInput
            className="h-12 flex-1 px-3.5 text-[15px] text-neutral-900"
            placeholder="tucorreo@ejemplo.com"
            placeholderTextColor="#a3a3a3"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={correo}
            onChangeText={setCorreo}
          />
        </View>

        <Text className="mb-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400">
          Contraseña
        </Text>
        <View className="mb-6 flex-row items-center rounded-xl border border-neutral-200 bg-neutral-50">
          <Ionicons
            name="lock-closed-outline"
            size={18}
            color="#a3a3a3"
            style={{ marginLeft: 14 }}
          />
          <TextInput
            className="h-12 flex-1 px-3.5 text-[15px] text-neutral-900"
            placeholder="••••••••"
            placeholderTextColor="#a3a3a3"
            secureTextEntry={!mostrarPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setMostrarPassword((v) => !v)}
            activeOpacity={0.7}
            className="h-full justify-center px-4"
            accessibilityLabel={
              mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
          >
            <Ionicons
              name={mostrarPassword ? 'eye-off-outline' : 'eye-outline'}
              size={19}
              color="#a3a3a3"
            />
          </TouchableOpacity>
        </View>

        <Button
          titulo="Ingresar"
          onPress={ingresar}
          icono="log-in-outline"
        />

        <View className="mt-8 flex-row items-center gap-3">
          <View className="h-px flex-1 bg-neutral-200" />
          <Text className="text-[11px] font-medium uppercase tracking-widest text-neutral-400">
            Pago seguro
          </Text>
          <View className="h-px flex-1 bg-neutral-200" />
        </View>

        <Text className="mt-4 text-center text-[11px] leading-4 text-neutral-300">
          Al ingresar aceptas los términos y condiciones de MiniStore.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}