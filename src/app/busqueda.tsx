import React from 'react';
import { Stack } from 'expo-router';

import ListaProductos from '../components/ListaProductos';
import { useProductos } from '../context/ProductosContext';

export default function Busqueda() {
  const { productos } = useProductos();

  return (
    <>
      <Stack.Screen options={{ title: 'Buscar' }} />
      <ListaProductos
        titulo="Buscar"
        subtitulo="Resultados de todo el catálogo"
        productos={productos}
      />
    </>
  );
}