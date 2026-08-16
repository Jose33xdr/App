import React from 'react';
import { Stack } from 'expo-router';

import '../../global.css';
import { ProductosProvider } from '../context/ProductosContext';
import { SesionProvider } from '../context/SesionContext';
import { CarritoProvider } from '../context/CarritoContext';
import { FavoritosProvider } from '../context/FavoritosContext';

export default function RootLayout() {
  return (
    <ProductosProvider>
      <SesionProvider>
        <CarritoProvider>
          <FavoritosProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="(drawer)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </FavoritosProvider>
        </CarritoProvider>
      </SesionProvider>
    </ProductosProvider>
  );
}