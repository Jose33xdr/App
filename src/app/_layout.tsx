import React from 'react';
import { Stack } from 'expo-router';

import '../../global.css';
import { ProductosProvider } from '../context/ProductosContext';
import { SesionProvider } from '../context/SesionContext';
import { CarritoProvider } from '../context/CarritoContext';
import { FavoritosProvider } from '../context/FavoritosContext';
import { PedidosProvider } from '../context/PedidosContext';

export default function RootLayout() {
  return (
    <ProductosProvider>
      <SesionProvider>
        <CarritoProvider>
          <FavoritosProvider>
            <PedidosProvider>
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
            </PedidosProvider>
          </FavoritosProvider>
        </CarritoProvider>
      </SesionProvider>
    </ProductosProvider>
  );
}