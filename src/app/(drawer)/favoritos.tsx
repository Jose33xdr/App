import React from 'react';

import ListaProductos from '../../components/ListaProductos';
import { useFavoritos } from '../../context/FavoritosContext';

export default function Favoritos() {
  const { productos } = useFavoritos();

  return (
    <ListaProductos
      titulo="Favoritos"
      subtitulo="Tus productos guardados"
      productos={productos}
      vacioEmoji="🤍"
      vacioTitulo="Aún no tienes favoritos"
      vacioTexto="Toca el corazón en un producto para guardarlo aquí."
    />
  );
}