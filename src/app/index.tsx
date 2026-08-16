import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useSesion } from '../context/SesionContext';

const CREDENCIALES_CLIENTE = {
  correo: 'joseignacioriverarios33@gmail.com',
  password: 'GTR20200',
};

const CREDENCIALES_ADMIN = {
  correo: 'admin',
  password: '123',
};

export default function Login() {
  const [correo, setCorreo] = useState(CREDENCIALES_CLIENTE.correo);
  const [password, setPassword] = useState(CREDENCIALES_CLIENTE.password);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [modalAdmin, setModalAdmin] = useState(false);
  const [correoAdmin, setCorreoAdmin] = useState('');
  const [passwordAdmin, setPasswordAdmin] = useState('');
  const [mostrarPasswordAdmin, setMostrarPasswordAdmin] = useState(false);
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

  const ingresarAdmin = () => {
    const correoAdminLimpio = correoAdmin.trim().toLowerCase();

    if (
      correoAdminLimpio === CREDENCIALES_ADMIN.correo &&
      passwordAdmin === CREDENCIALES_ADMIN.password
    ) {
      iniciarSesion('admin');
      setModalAdmin(false);
      setCorreoAdmin('');
      setPasswordAdmin('');
      router.replace('/(drawer)/admin');
      return;
    }

    Alert.alert(
      'Acceso denegado',
      'Credenciales incorrectas. Solo el administrador puede entrar.'
    );
    setPasswordAdmin('');
  };

  return (
    <View className="flex-1 bg-neutral-50">
      <KeyboardAvoidingView
        className="flex-1 justify-center px-6"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text className="mb-2 text-center text-3xl font-bold tracking-tight text-neutral-900">
          MiniStore
        </Text>

        <Text className="mt-2 mb-10 text-center text-neutral-500">
          Ingresa para continuar
        </Text>

        <TextInput
          className="mb-3 h-12 rounded-xl border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900"
          placeholder="Correo electrónico"
          placeholderTextColor="#a3a3a3"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={correo}
          onChangeText={setCorreo}
        />

        <View className="mb-6 flex-row items-center rounded-xl border border-neutral-200 bg-white">
          <TextInput
            className="h-12 flex-1 px-4 text-[15px] text-neutral-900"
            placeholder="Contraseña"
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
            <Text className="text-sm font-medium text-neutral-400">
              {mostrarPassword ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="h-12 items-center justify-center rounded-xl bg-neutral-900"
          onPress={ingresar}
          activeOpacity={0.8}
        >
          <Text className="text-[15px] font-semibold text-white">
            Ingresar
          </Text>
        </TouchableOpacity>

        <Text className="mt-6 text-center text-xs text-neutral-400">
          Cliente: credenciales precargadas · Acceso Administrador: botón 💬
        </Text>
      </KeyboardAvoidingView>

      <TouchableOpacity
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-neutral-900"
        activeOpacity={0.85}
        onPress={() => setModalAdmin(true)}
        accessibilityLabel="Acceso administrador"
      >
        <Ionicons name="chatbubble-ellipses" size={26} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modalAdmin}
        animationType="slide"
        transparent
        onRequestClose={() => setModalAdmin(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-3xl bg-white p-6 pb-10">
            <View className="mb-4 h-1.5 w-10 self-center rounded-full bg-neutral-200" />

            <View className="mb-4 flex-row items-center gap-3">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
                <Ionicons name="lock-closed" size={20} color="#404040" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold tracking-tight text-neutral-900">
                  Acceso administrador
                </Text>
                <Text className="text-xs text-neutral-400">
                  Ingresa tus credenciales para abrir el panel de control
                </Text>
              </View>
            </View>

            <View className="mb-3 flex-row items-center rounded-xl border border-neutral-200 bg-neutral-50">
              <TextInput
                className="h-12 flex-1 px-4 text-[15px] text-neutral-900"
                placeholder="Correo (admin)"
                placeholderTextColor="#a3a3a3"
                value={correoAdmin}
                onChangeText={setCorreoAdmin}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>

            <View className="mb-6 flex-row items-center rounded-xl border border-neutral-200 bg-neutral-50">
              <TextInput
                className="h-12 flex-1 px-4 text-[15px] text-neutral-900"
                placeholder="Contraseña"
                placeholderTextColor="#a3a3a3"
                secureTextEntry={!mostrarPasswordAdmin}
                value={passwordAdmin}
                onChangeText={setPasswordAdmin}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setMostrarPasswordAdmin((v) => !v)}
                activeOpacity={0.7}
                className="h-full justify-center px-4"
                accessibilityLabel={
                  mostrarPasswordAdmin
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
              >
                <Text className="text-sm font-medium text-neutral-400">
                  {mostrarPasswordAdmin ? 'Ocultar' : 'Mostrar'}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="h-12 flex-1 items-center justify-center rounded-xl border border-neutral-200 bg-white"
                activeOpacity={0.7}
                onPress={() => {
                  setModalAdmin(false);
                  setCorreoAdmin('');
                  setPasswordAdmin('');
                }}
              >
                <Text className="text-[15px] font-semibold text-neutral-600">
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="h-12 flex-1 items-center justify-center rounded-xl bg-neutral-900"
                activeOpacity={0.8}
                onPress={ingresarAdmin}
              >
                <Text className="text-[15px] font-semibold text-white">
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}