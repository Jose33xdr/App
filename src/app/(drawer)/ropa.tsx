import React from 'react';

import ListaSecciones from '../../components/ListaSecciones';

export default function Ropa() {
  return (
    <ListaSecciones
      titulo="Ropa"
      subtitulo="Vestuario"
      categorias={['ropa']}
    />
  );
}