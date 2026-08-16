export type Categoria = 'tecnologia' | 'ropa';

export interface Seccion {
  id: string;
  nombre: string;
  emoji: string;
  categoria: Categoria;
}

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  emoji: string;
  seccionId: string;
  stock: number;
}

export const INFO_CATEGORIAS: Record<
  Categoria,
  { nombre: string; emoji: string }
> = {
  tecnologia: { nombre: 'Tecnología', emoji: '💻' },
  ropa: { nombre: 'Ropa', emoji: '👕' },
};

export const seccionesIniciales: Seccion[] = [
  {
    id: 'sec-audio',
    nombre: 'Audio',
    emoji: '🎧',
    categoria: 'tecnologia',
  },
  {
    id: 'sec-computacion',
    nombre: 'Computación',
    emoji: '💻',
    categoria: 'tecnologia',
  },
  {
    id: 'sec-telefonia',
    nombre: 'Telefonía',
    emoji: '📱',
    categoria: 'tecnologia',
  },
  {
    id: 'sec-wearables',
    nombre: 'Wearables',
    emoji: '⌚',
    categoria: 'tecnologia',
  },
  {
    id: 'sec-cargadores',
    nombre: 'Cargadores',
    emoji: '🔋',
    categoria: 'tecnologia',
  },
  {
    id: 'sec-superior',
    nombre: 'Superior',
    emoji: '👕',
    categoria: 'ropa',
  },
  {
    id: 'sec-inferior',
    nombre: 'Inferior',
    emoji: '👖',
    categoria: 'ropa',
  },
  {
    id: 'sec-calzado',
    nombre: 'Calzado',
    emoji: '👟',
    categoria: 'ropa',
  },
  {
    id: 'sec-accesorios',
    nombre: 'Accesorios',
    emoji: '🧢',
    categoria: 'ropa',
  },
];

export const productosIniciales: Producto[] = [
  {
    id: 'tec-1',
    nombre: 'Audífonos Bluetooth',
    precio: 29990,
    descripcion:
      'Audífonos inalámbricos con cancelación de ruido, batería de 30 horas y carga rápida USB-C.',
    emoji: '🎧',
    seccionId: 'sec-audio',
    stock: 12,
  },
  {
    id: 'tec-2',
    nombre: 'Teclado Mecánico',
    precio: 24990,
    descripcion:
      'Teclado mecánico con switches rojos, retroiluminación RGB y estructura de aluminio.',
    emoji: '⌨️',
    seccionId: 'sec-computacion',
    stock: 8,
  },
  {
    id: 'tec-3',
    nombre: 'Mouse Gamer',
    precio: 14990,
    descripcion:
      'Mouse ergonómico de 12.000 DPI con 7 botones programables y cable mallado.',
    emoji: '🖱️',
    seccionId: 'sec-computacion',
    stock: 20,
  },
  {
    id: 'tec-4',
    nombre: 'Monitor 24" Full HD',
    precio: 149990,
    descripcion:
      'Monitor IPS de 24 pulgadas, 1080p, 75 Hz y bordes ultrafinos. Ideal para trabajo y gaming.',
    emoji: '🖥️',
    seccionId: 'sec-computacion',
    stock: 5,
  },
  {
    id: 'tec-5',
    nombre: 'Smartphone 128GB',
    precio: 299990,
    descripcion:
      'Smartphone con pantalla AMOLED de 6.5", cámara triple de 50MP y carga rápida de 33W.',
    emoji: '📱',
    seccionId: 'sec-telefonia',
    stock: 7,
  },
  {
    id: 'tec-6',
    nombre: 'Parlante Bluetooth Portátil',
    precio: 19990,
    descripcion:
      'Parlante resistente al agua con sonido 360°, 12 horas de batería y micrófono integrado.',
    emoji: '🔊',
    seccionId: 'sec-audio',
    stock: 15,
  },
  {
    id: 'tec-7',
    nombre: 'Smartwatch Fitness',
    precio: 59990,
    descripcion:
      'Reloj inteligente con GPS, medición de ritmo cardíaco, sueño y 20 modos deportivos.',
    emoji: '⌚',
    seccionId: 'sec-wearables',
    stock: 10,
  },
  {
    id: 'tec-8',
    nombre: 'Cargador Inalámbrico 15W',
    precio: 12990,
    descripcion:
      'Base de carga inalámbrica Qi de 15W con protección contra sobrecarga y diseño antideslizante.',
    emoji: '🔋',
    seccionId: 'sec-cargadores',
    stock: 25,
  },
  {
    id: 'ropa-1',
    nombre: 'Polera Oversize',
    precio: 12990,
    descripcion:
      'Polera de algodón orgánico con corte oversize, cuello reforzado y estampado serigráfico.',
    emoji: '👕',
    seccionId: 'sec-superior',
    stock: 30,
  },
  {
    id: 'ropa-2',
    nombre: 'Pantalón Cargo',
    precio: 24990,
    descripcion:
      'Pantalón cargo de tela resistente con 6 bolsillos, ajuste elástico en la cintura y tobillo.',
    emoji: '👖',
    seccionId: 'sec-inferior',
    stock: 18,
  },
  {
    id: 'ropa-3',
    nombre: 'Zapatillas Urbanas',
    precio: 49990,
    descripcion:
      'Zapatillas urbanas con suela de espuma ultra ligera, plantilla acolchada y diseño moderno.',
    emoji: '👟',
    seccionId: 'sec-calzado',
    stock: 14,
  },
  {
    id: 'ropa-4',
    nombre: 'Polerón con Capucha',
    precio: 29990,
    descripcion:
      'Polerón con capucha forrada, bolsillo canguro y algodón fleece de 350 g/m².',
    emoji: '🧥',
    seccionId: 'sec-superior',
    stock: 22,
  },
  {
    id: 'ropa-5',
    nombre: 'Gorra Trucker',
    precio: 9990,
    descripcion:
      'Gorra estilo trucker con malla transpirable, cierre ajustable y bordado frontal.',
    emoji: '🧢',
    seccionId: 'sec-accesorios',
    stock: 40,
  },
  {
    id: 'ropa-6',
    nombre: 'Chaqueta Bomber',
    precio: 39990,
    descripcion:
      'Chaqueta bomber acolchada con cierre metálico, mangas con puños elásticos y bolsillos laterales.',
    emoji: '🧥',
    seccionId: 'sec-superior',
    stock: 9,
  },
  {
    id: 'ropa-7',
    nombre: 'Calcetines Deportivos (3 pares)',
    precio: 7990,
    descripcion:
      'Pack de 3 pares de calcetines deportivos con compresión media y tejido antimicrobiano.',
    emoji: '🧦',
    seccionId: 'sec-accesorios',
    stock: 50,
  },
  {
    id: 'ropa-8',
    nombre: 'Mochila Urbana 20L',
    precio: 19990,
    descripcion:
      'Mochila impermeable de 20L con compartimento para notebook, puerto USB y correas acolchadas.',
    emoji: '🎒',
    seccionId: 'sec-accesorios',
    stock: 11,
  },
];