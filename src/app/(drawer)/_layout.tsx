import React from 'react';
import { View, Text } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

import { useCarrito } from '../../context/CarritoContext';
import { useSesion } from '../../context/SesionContext';
import DrawerContenido from '../../components/DrawerContenido';

export default function DrawerLayout() {
  const { cantidadTotal } = useCarrito();
  const { rol } = useSesion();
  const esAdmin = rol === 'admin';

  return (
    <Drawer
      drawerContent={(props) => <DrawerContenido {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#D50000',
        drawerInactiveTintColor: '#525252',
        drawerActiveBackgroundColor: '#FAFAFA',
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
        },
        drawerItemStyle: {
          borderRadius: 12,
          marginVertical: 2,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#171717',
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: 'Inicio',
          title: 'Inicio',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="productos"
        options={{
          drawerLabel: 'Tecnología',
          title: 'Tecnología',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="phone-portrait-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="ropa"
        options={{
          drawerLabel: 'Ropa',
          title: 'Ropa',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shirt-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="favoritos"
        options={{
          drawerLabel: 'Favoritos',
          title: 'Favoritos',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="carrito"
        options={{
          drawerLabel: ({ color }) => (
            <View className="flex-row items-center justify-between flex-1">
              <Text style={{ fontSize: 15, fontWeight: '600', color }}>
                Carrito
              </Text>
              {cantidadTotal > 0 && (
                <View className="h-5 min-w-5 items-center justify-center rounded-full bg-oferta px-1.5">
                  <Text className="text-[11px] font-bold text-white">
                    {cantidadTotal}
                  </Text>
                </View>
              )}
            </View>
          ),
          title: 'Carrito',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="admin"
        options={{
          drawerLabel: 'Administración',
          title: 'Administración',
          drawerItemStyle: esAdmin
            ? { borderRadius: 12, marginVertical: 2 }
            : { display: 'none' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}