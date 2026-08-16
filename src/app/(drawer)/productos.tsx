import React from 'react';

import ListaSecciones from '../../components/ListaSecciones';

export default function Productos() {
  return (
    <ListaSecciones
      titulo="Tecnología"
      subtitulo="Equipos y accesorios"
      categorias={['tecnologia']}
    />
  );
}