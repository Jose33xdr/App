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
    id: 'audio-1',
    nombre: 'Auriculares Over-Ear Pro',
    precio: 79990,
    descripcion:
      'Auriculares over-ear con drivers de 50mm, cancelación activa de ruido y 40 horas de batería.',
    emoji: '🎧',
    seccionId: 'sec-audio',
    stock: 6,
  },
  {
    id: 'audio-2',
    nombre: 'Earbuds True Wireless',
    precio: 34990,
    descripcion:
      'Audífonos in-ear inalámbricos con estuche de carga, resistentes al agua y baja latencia.',
    emoji: '🎧',
    seccionId: 'sec-audio',
    stock: 18,
  },
  {
    id: 'audio-3',
    nombre: 'Soundbar 2.1 con Subwoofer',
    precio: 129990,
    descripcion:
      'Soundbar con subwoofer inalámbrico de 160W, Bluetooth 5.0 y modos de sonido para cine.',
    emoji: '🔊',
    seccionId: 'sec-audio',
    stock: 4,
  },
  {
    id: 'audio-4',
    nombre: 'Micrófono USB para Streaming',
    precio: 39990,
    descripcion:
      'Micrófono condensador USB con patrón cardioide, mute táctil y control de ganancia.',
    emoji: '🎙️',
    seccionId: 'sec-audio',
    stock: 9,
  },
  {
    id: 'audio-5',
    nombre: 'Parlante Inteligente con Alexa',
    precio: 24990,
    descripcion:
      'Parlante inteligente con asistente de voz integrado, sonido de 360° y control por app.',
    emoji: '🔉',
    seccionId: 'sec-audio',
    stock: 16,
  },
  {
    id: 'audio-6',
    nombre: 'Audífonos Gamer con Mic',
    precio: 45990,
    descripcion:
      'Audífonos gamer con micrófono desmontable, sonido envolvente 7.1 y almohadillas de espuma.',
    emoji: '🎮',
    seccionId: 'sec-audio',
    stock: 13,
  },
  {
    id: 'audio-7',
    nombre: 'Barra de Sonido Compacta',
    precio: 59990,
    descripcion:
      'Barra de sonido compacta con HDMI ARC, Bluetooth y ecualizador de 5 modos.',
    emoji: '🔊',
    seccionId: 'sec-audio',
    stock: 7,
  },
  {
    id: 'audio-8',
    nombre: 'Reproductor de Vinilo Bluetooth',
    precio: 89990,
    descripcion:
      'Tocadiscos con salida Bluetooth, dos velocidades y parlante integrado de 5W.',
    emoji: '💿',
    seccionId: 'sec-audio',
    stock: 3,
  },
  {
    id: 'audio-9',
    nombre: 'Audífonos Deportivos IPX7',
    precio: 27990,
    descripcion:
      'Audífonos deportivos resistentes al agua con gancho de oreja y batería de 24 horas.',
    emoji: '🏃',
    seccionId: 'sec-audio',
    stock: 21,
  },
  {
    id: 'audio-10',
    nombre: 'Parlante de Fiesta LED',
    precio: 49990,
    descripcion:
      'Parlante portátil con luces LED sincronizadas, karaoke y 20 horas de reproducción.',
    emoji: '🎉',
    seccionId: 'sec-audio',
    stock: 8,
  },
  {
    id: 'audio-11',
    nombre: 'Audífonos con Cable HiFi',
    precio: 19990,
    descripcion:
      'Audífonos over-ear con cable trenzado de 1.5m, drivers de 40mm y almohadillas de cuero.',
    emoji: '🎧',
    seccionId: 'sec-audio',
    stock: 26,
  },
  {
    id: 'audio-12',
    nombre: 'Micrófono Lavalier',
    precio: 15990,
    descripcion:
      'Micrófono de solapa con conector TRS, ideal para grabaciones, entrevistas y vlogs.',
    emoji: '🎤',
    seccionId: 'sec-audio',
    stock: 33,
  },
  {
    id: 'audio-13',
    nombre: 'Kit Karaoke Bluetooth',
    precio: 74990,
    descripcion:
      'Kit de karaoke con 2 micrófonos inalámbricos, parlante LED y entrada para pendrive.',
    emoji: '🎤',
    seccionId: 'sec-audio',
    stock: 5,
  },
  {
    id: 'audio-14',
    nombre: 'Audífonos de Estudio',
    precio: 64990,
    descripcion:
      'Audífonos profesionales de monitoreo con respuesta plana y cable intercambiable.',
    emoji: '🎧',
    seccionId: 'sec-audio',
    stock: 6,
  },
  {
    id: 'audio-15',
    nombre: 'Subwoofer 10" 300W',
    precio: 189990,
    descripcion:
      'Subwoofer activo de 10 pulgadas con 300W RMS, control de fase y crossover ajustable.',
    emoji: '🔊',
    seccionId: 'sec-audio',
    stock: 2,
  },
  {
    id: 'audio-16',
    nombre: 'Transmisor Bluetooth FM',
    precio: 12990,
    descripcion:
      'Adaptador Bluetooth para auto con manos libres, puerto USB y micrófono integrado.',
    emoji: '🚗',
    seccionId: 'sec-audio',
    stock: 27,
  },
  {
    id: 'audio-17',
    nombre: 'Audífonos Infantiles',
    precio: 15990,
    descripcion:
      'Audífonos con limitador de volumen a 85dB, diseño colorido y estructura flexible.',
    emoji: '🧒',
    seccionId: 'sec-audio',
    stock: 19,
  },
  {
    id: 'audio-18',
    nombre: 'Grabadora Digital de Voz',
    precio: 29990,
    descripcion:
      'Grabadora de voz con 16GB de memoria, reducción de ruido y batería de 20 horas.',
    emoji: '🎙️',
    seccionId: 'sec-audio',
    stock: 10,
  },
  {
    id: 'audio-19',
    nombre: 'Parlante de Mesa USB',
    precio: 17990,
    descripcion:
      'Parlante de escritorio con conexión USB-C, control de volumen y luz ambiental.',
    emoji: '🔊',
    seccionId: 'sec-audio',
    stock: 24,
  },
  {
    id: 'audio-20',
    nombre: 'Kit Micrófono Boom Arm',
    precio: 54990,
    descripcion:
      'Brazo articulado profesional con micrófono condensador, filtro antipop y soporte.',
    emoji: '🎙️',
    seccionId: 'sec-audio',
    stock: 7,
  },

  {
    id: 'comp-1',
    nombre: 'Notebook 15.6" i5 16GB 512GB',
    precio: 549990,
    descripcion:
      'Notebook con procesador i5, 16GB de RAM, SSD de 512GB y pantalla Full HD.',
    emoji: '💻',
    seccionId: 'sec-computacion',
    stock: 6,
  },
  {
    id: 'comp-2',
    nombre: 'Teclado Inalámbrico Slim',
    precio: 19990,
    descripcion:
      'Teclado inalámbrico ultra delgado con teclas silenciosas y alcance de 10 metros.',
    emoji: '⌨️',
    seccionId: 'sec-computacion',
    stock: 22,
  },
  {
    id: 'comp-3',
    nombre: 'Mouse Inalámbrico Ergonómico',
    precio: 12990,
    descripcion:
      'Mouse ergonómico con sensor de 1600 DPI, diseño para diestros y receptor USB.',
    emoji: '🖱️',
    seccionId: 'sec-computacion',
    stock: 30,
  },
  {
    id: 'comp-4',
    nombre: 'Monitor Curvo 27" QHD',
    precio: 249990,
    descripcion:
      'Monitor curvo de 27 pulgadas con resolución QHD, 144Hz y panel VA de 1ms.',
    emoji: '🖥️',
    seccionId: 'sec-computacion',
    stock: 4,
  },
  {
    id: 'comp-5',
    nombre: 'SSD 1TB NVMe',
    precio: 89990,
    descripcion:
      'Disco SSD NVMe de 1TB con velocidades de lectura de hasta 3500MB/s.',
    emoji: '💾',
    seccionId: 'sec-computacion',
    stock: 15,
  },
  {
    id: 'comp-6',
    nombre: 'Memoria RAM 16GB DDR5',
    precio: 74990,
    descripcion:
      'Memoria RAM DDR5 de 16GB a 5200MHz con disipador de aluminio y perfil bajo.',
    emoji: '🧠',
    seccionId: 'sec-computacion',
    stock: 12,
  },
  {
    id: 'comp-7',
    nombre: 'Webcam Full HD 1080p',
    precio: 24990,
    descripcion:
      'Cámara web 1080p con micrófono dual, corrección de luz y clip universal.',
    emoji: '📷',
    seccionId: 'sec-computacion',
    stock: 18,
  },
  {
    id: 'comp-8',
    nombre: 'Hub USB-C 7 en 1',
    precio: 29990,
    descripcion:
      'Hub con HDMI 4K, 3 puertos USB-A, USB-C PD, lector de tarjetas y Ethernet.',
    emoji: '🔌',
    seccionId: 'sec-computacion',
    stock: 20,
  },
  {
    id: 'comp-9',
    nombre: 'Soporte para Notebook',
    precio: 15990,
    descripcion:
      'Soporte de aluminio ajustable en 6 niveles con ventilación y base antideslizante.',
    emoji: '🪜',
    seccionId: 'sec-computacion',
    stock: 25,
  },
  {
    id: 'comp-10',
    nombre: 'Impresora Multifuncional',
    precio: 89990,
    descripcion:
      'Impresora multifuncional con tinta continua, WiFi, escáner y copiadora.',
    emoji: '🖨️',
    seccionId: 'sec-computacion',
    stock: 5,
  },
  {
    id: 'comp-11',
    nombre: 'Tablet Gráfica 10x6"',
    precio: 59990,
    descripcion:
      'Tableta de dibujo con 4096 niveles de presión, lápiz sin pilas y 12 teclas rápidas.',
    emoji: '🎨',
    seccionId: 'sec-computacion',
    stock: 9,
  },
  {
    id: 'comp-12',
    nombre: 'Disco Duro Externo 2TB',
    precio: 79990,
    descripcion:
      'Disco duro portátil de 2TB con USB 3.0, respaldo automático y carcasa resistente.',
    emoji: '💽',
    seccionId: 'sec-computacion',
    stock: 14,
  },
  {
    id: 'comp-13',
    nombre: 'Cámara de Seguridad WiFi',
    precio: 34990,
    descripcion:
      'Cámara IP con visión nocturna, detección de movimiento y audio bidireccional.',
    emoji: '📹',
    seccionId: 'sec-computacion',
    stock: 11,
  },
  {
    id: 'comp-14',
    nombre: 'Router WiFi 6 AX3000',
    precio: 99990,
    descripcion:
      'Router de doble banda con WiFi 6, 4 puertos Gigabit y control parental.',
    emoji: '📡',
    seccionId: 'sec-computacion',
    stock: 8,
  },
  {
    id: 'comp-15',
    nombre: 'Escáner de Documentos',
    precio: 59990,
    descripcion:
      'Escáner de cama plana con resolución 1200dpi y software de OCR incluido.',
    emoji: '🔍',
    seccionId: 'sec-computacion',
    stock: 6,
  },
  {
    id: 'comp-16',
    nombre: 'Teclado Bluetooth Tablet',
    precio: 24990,
    descripcion:
      'Teclado Bluetooth plegable compatible con iOS, Android y Windows.',
    emoji: '⌨️',
    seccionId: 'sec-computacion',
    stock: 17,
  },
  {
    id: 'comp-17',
    nombre: 'Mini PC Celeron 8GB',
    precio: 179990,
    descripcion:
      'Mini computador con Celeron N5105, 8GB RAM, 256GB SSD y doble salida HDMI.',
    emoji: '🖥️',
    seccionId: 'sec-computacion',
    stock: 7,
  },
  {
    id: 'comp-18',
    nombre: 'Lector de Código de Barras',
    precio: 24990,
    descripcion:
      'Lector láser inalámbrico con base de carga y compatibilidad USB Plug & Play.',
    emoji: '🔢',
    seccionId: 'sec-computacion',
    stock: 13,
  },
  {
    id: 'comp-19',
    nombre: 'Adaptador WiFi USB Dual',
    precio: 12990,
    descripcion:
      'Adaptador WiFi USB de doble banda 1300Mbps con antena de alta ganancia.',
    emoji: '📶',
    seccionId: 'sec-computacion',
    stock: 28,
  },
  {
    id: 'comp-20',
    nombre: 'Kit Cable Managment 30 pcs',
    precio: 9990,
    descripcion:
      'Kit de organizadores de cables con velcro, cintas y clips para escritorio.',
    emoji: '🔗',
    seccionId: 'sec-computacion',
    stock: 35,
  },

  {
    id: 'tel-1',
    nombre: 'Smartphone 256GB 5G',
    precio: 399990,
    descripcion:
      'Smartphone 5G con pantalla de 6.7", 256GB de almacenamiento y cámara de 108MP.',
    emoji: '📱',
    seccionId: 'sec-telefonia',
    stock: 8,
  },
  {
    id: 'tel-2',
    nombre: 'Smartphone Económico 64GB',
    precio: 129990,
    descripcion:
      'Smartphone de entrada con pantalla HD+ de 6.5", 64GB y batería de 5000mAh.',
    emoji: '📱',
    seccionId: 'sec-telefonia',
    stock: 20,
  },
  {
    id: 'tel-3',
    nombre: 'Smartphone Gamer 8GB 256GB',
    precio: 499990,
    descripcion:
      'Smartphone gamer con refrigeración líquida, 144Hz y botones táctiles laterales.',
    emoji: '🎮',
    seccionId: 'sec-telefonia',
    stock: 5,
  },
  {
    id: 'tel-4',
    nombre: 'Funda Antigolpes',
    precio: 9990,
    descripcion:
      'Funda protectora con marco reforzado, elevación de cámara y agarre antideslizante.',
    emoji: '🛡️',
    seccionId: 'sec-telefonia',
    stock: 40,
  },
  {
    id: 'tel-5',
    nombre: 'Vidrio Templado 9H (2 uds)',
    precio: 6990,
    descripcion:
      'Pack de 2 vidrios templados con dureza 9H, cobertura total y kit de instalación.',
    emoji: '🔳',
    seccionId: 'sec-telefonia',
    stock: 60,
  },
  {
    id: 'tel-6',
    nombre: 'Soporte Magnético para Auto',
    precio: 12990,
    descripcion:
      'Soporte magnético de celular para auto con brazo ajustable y rotación 360°.',
    emoji: '🚗',
    seccionId: 'sec-telefonia',
    stock: 22,
  },
  {
    id: 'tel-7',
    nombre: 'Selfie Stick Bluetooth',
    precio: 14990,
    descripcion:
      'Palo selfie con control remoto Bluetooth, trípode desmontable y carga USB.',
    emoji: '📸',
    seccionId: 'sec-telefonia',
    stock: 16,
  },
  {
    id: 'tel-8',
    nombre: 'Cable USB-C a C (2m)',
    precio: 7990,
    descripcion:
      'Cable USB-C trenzado de 2 metros con carga rápida PD 60W y datos 480Mbps.',
    emoji: '🔌',
    seccionId: 'sec-telefonia',
    stock: 45,
  },
  {
    id: 'tel-9',
    nombre: 'Soporte de Escritorio Ajustable',
    precio: 15990,
    descripcion:
      'Soporte de celular para escritorio con altura ajustable y base antideslizante.',
    emoji: '🪑',
    seccionId: 'sec-telefonia',
    stock: 19,
  },
  {
    id: 'tel-10',
    nombre: 'Kit Limpieza Pantallas',
    precio: 4990,
    descripcion:
      'Kit con paño de microfibra, líquido limpiador y cepillo suave para pantallas.',
    emoji: '🧽',
    seccionId: 'sec-telefonia',
    stock: 50,
  },
  {
    id: 'tel-11',
    nombre: 'Adaptador USB-C a Jack 3.5',
    precio: 6990,
    descripcion:
      'Adaptador de audio USB-C a conector de 3.5mm con DAC incorporado.',
    emoji: '🎧',
    seccionId: 'sec-telefonia',
    stock: 30,
  },
  {
    id: 'tel-12',
    nombre: 'Cargador de Auto 30W',
    precio: 14990,
    descripcion:
      'Cargador de auto con 2 puertos USB-C y USB-A, carga rápida de 30W.',
    emoji: '🚙',
    seccionId: 'sec-telefonia',
    stock: 24,
  },
  {
    id: 'tel-13',
    nombre: 'Anillo Sostenedor + Soporte',
    precio: 5990,
    descripcion:
      'Anillo magnético con soporte plegable para sujetar el celular con una mano.',
    emoji: '💍',
    seccionId: 'sec-telefonia',
    stock: 38,
  },
  {
    id: 'tel-14',
    nombre: 'Lente Universal para Celular',
    precio: 19990,
    descripcion:
      'Set de lentes gran angular, macro y ojo de pez con clip universal.',
    emoji: '🔭',
    seccionId: 'sec-telefonia',
    stock: 12,
  },
  {
    id: 'tel-15',
    nombre: 'Bolsa Impermeable Celular',
    precio: 8990,
    descripcion:
      'Bolsa transparente impermeable con cierre sellado, ideal para piscina y playa.',
    emoji: '🏊',
    seccionId: 'sec-telefonia',
    stock: 21,
  },
  {
    id: 'tel-16',
    nombre: 'Smartphone Básico con Teclado',
    precio: 69990,
    descripcion:
      'Celular con teclado físico QWERTY, batería de 2500mAh y radio FM.',
    emoji: '📞',
    seccionId: 'sec-telefonia',
    stock: 9,
  },
  {
    id: 'tel-17',
    nombre: 'Organizador de Cables',
    precio: 5990,
    descripcion:
      'Organizador de silicona con cierre para guardar cables y audífonos.',
    emoji: '🧵',
    seccionId: 'sec-telefonia',
    stock: 27,
  },
  {
    id: 'tel-18',
    nombre: 'Pop Socket de Diseño',
    precio: 7990,
    descripcion:
      'Agarre adhesivo con base giratoria en 3 diseños, se pega a cualquier funda.',
    emoji: '🌀',
    seccionId: 'sec-telefonia',
    stock: 32,
  },
  {
    id: 'tel-19',
    nombre: 'Cargador Portátil 10000mAh',
    precio: 19990,
    descripcion:
      'Batería externa de 10000mAh con 2 puertos USB y carga rápida de 18W.',
    emoji: '🔋',
    seccionId: 'sec-telefonia',
    stock: 26,
  },
  {
    id: 'tel-20',
    nombre: 'Mini Proyector para Celular',
    precio: 29990,
    descripcion:
      'Proyector mini compatible con celular, HDMI y USB, con salida de 50 pulgadas.',
    emoji: '📽️',
    seccionId: 'sec-telefonia',
    stock: 7,
  },

  {
    id: 'wear-1',
    nombre: 'Smartwatch Serie Pro',
    precio: 129990,
    descripcion:
      'Smartwatch con pantalla AMOLED, llamadas Bluetooth, GPS y resistencia 5ATM.',
    emoji: '⌚',
    seccionId: 'sec-wearables',
    stock: 6,
  },
  {
    id: 'wear-2',
    nombre: 'Pulsera Fitness Básica',
    precio: 24990,
    descripcion:
      'Pulsera con monitoreo de pasos, sueño y ritmo cardíaco, batería de 10 días.',
    emoji: '📿',
    seccionId: 'sec-wearables',
    stock: 25,
  },
  {
    id: 'wear-3',
    nombre: 'Smartwatch Infantil GPS',
    precio: 39990,
    descripcion:
      'Reloj infantil con llamadas, GPS parental, cámara y botón de emergencia.',
    emoji: '🧒',
    seccionId: 'sec-wearables',
    stock: 11,
  },
  {
    id: 'wear-4',
    nombre: 'Reloj Deportivo GPS',
    precio: 189990,
    descripcion:
      'Reloj deportivo multideporte con GPS dual, pulsómetro óptico y barómetro.',
    emoji: '🏃',
    seccionId: 'sec-wearables',
    stock: 4,
  },
  {
    id: 'wear-5',
    nombre: 'Correa de Repuesto Silicona',
    precio: 7990,
    descripcion:
      'Correa de silicona compatible con smartwatches de 22mm, en 5 colores.',
    emoji: '🧷',
    seccionId: 'sec-wearables',
    stock: 40,
  },
  {
    id: 'wear-6',
    nombre: 'Anillo Inteligente de Salud',
    precio: 89990,
    descripcion:
      'Anillo inteligente con medición de sueño, oxígeno y temperatura corporal.',
    emoji: '💍',
    seccionId: 'sec-wearables',
    stock: 8,
  },
  {
    id: 'wear-7',
    nombre: 'Smartwatch Económico',
    precio: 29990,
    descripcion:
      'Smartwatch con pantalla táctil de 1.7", notificaciones y 20 modos deportivos.',
    emoji: '⌚',
    seccionId: 'sec-wearables',
    stock: 18,
  },
  {
    id: 'wear-8',
    nombre: 'Bandas Antitranspirantes (3)',
    precio: 12990,
    descripcion:
      'Pack de 3 bandas absorbentes de sudor con correa elástica y ajuste universal.',
    emoji: '🎽',
    seccionId: 'sec-wearables',
    stock: 15,
  },
  {
    id: 'wear-9',
    nombre: 'Cargador Dual Smartwatch',
    precio: 14990,
    descripcion:
      'Base de carga magnética con doble puerto para reloj y pulsera.',
    emoji: '🔌',
    seccionId: 'sec-wearables',
    stock: 22,
  },
  {
    id: 'wear-10',
    nombre: 'Smartwatch Ultra 49mm',
    precio: 349990,
    descripcion:
      'Smartwatch resistente de 49mm con titanio, buceo a 100m y GPS de doble banda.',
    emoji: '⌚',
    seccionId: 'sec-wearables',
    stock: 3,
  },
  {
    id: 'wear-11',
    nombre: 'Báscula Inteligente',
    precio: 19990,
    descripcion:
      'Báscula con medición de 13 métricas corporales y app sincronizada.',
    emoji: '⚖️',
    seccionId: 'sec-wearables',
    stock: 14,
  },
  {
    id: 'wear-12',
    nombre: 'Pulsera de Carga Solar',
    precio: 17990,
    descripcion:
      'Pulsera con panel solar para carga lenta y monitoreo básico de actividad.',
    emoji: '☀️',
    seccionId: 'sec-wearables',
    stock: 10,
  },
  {
    id: 'wear-13',
    nombre: 'Monitor de Glucosa',
    precio: 59990,
    descripcion:
      'Dispositivo no invasivo para monitoreo continuo de glucosa con app.',
    emoji: '🩸',
    seccionId: 'sec-wearables',
    stock: 5,
  },
  {
    id: 'wear-14',
    nombre: 'Audífonos de Conducción Ósea',
    precio: 49990,
    descripcion:
      'Audífonos de conducción ósea abiertos al entorno, ideales para correr.',
    emoji: '👂',
    seccionId: 'sec-wearables',
    stock: 9,
  },
  {
    id: 'wear-15',
    nombre: 'Smart Ring Cargador',
    precio: 9990,
    descripcion:
      'Base de carga inalámbrica específica para anillos inteligentes.',
    emoji: '💍',
    seccionId: 'sec-wearables',
    stock: 12,
  },
  {
    id: 'wear-16',
    nombre: 'Reloj Analógico + Smart',
    precio: 69990,
    descripcion:
      'Reloj híbrido con manecillas analógicas y funciones inteligentes discretas.',
    emoji: '🕐',
    seccionId: 'sec-wearables',
    stock: 7,
  },
  {
    id: 'wear-17',
    nombre: 'Termómetro de Muñeca',
    precio: 15990,
    descripcion:
      'Pulsera con medición continua de temperatura y alertas de fiebre.',
    emoji: '🌡️',
    seccionId: 'sec-wearables',
    stock: 13,
  },
  {
    id: 'wear-18',
    nombre: 'Sensor de Postura',
    precio: 19990,
    descripcion:
      'Dispositivo que vibra al detectar mala postura y registra tu actividad.',
    emoji: '🧍',
    seccionId: 'sec-wearables',
    stock: 8,
  },
  {
    id: 'wear-19',
    nombre: 'Smartwatch con Cámara',
    precio: 49990,
    descripcion:
      'Smartwatch con cámara de 5MP, llamadas y almacenamiento interno.',
    emoji: '📷',
    seccionId: 'sec-wearables',
    stock: 6,
  },
  {
    id: 'wear-20',
    nombre: 'Kit Correas Premium (4)',
    precio: 14990,
    descripcion:
      'Pack de 4 correas premium: cuero, silicona, metal y tela para 20/22mm.',
    emoji: '🎗️',
    seccionId: 'sec-wearables',
    stock: 17,
  },

  {
    id: 'carg-1',
    nombre: 'Cargador GaN 65W',
    precio: 34990,
    descripcion:
      'Cargador GaN de 65W con 3 puertos USB-C/USB-A, carga rápida para notebook.',
    emoji: '🔌',
    seccionId: 'sec-cargadores',
    stock: 20,
  },
  {
    id: 'carg-2',
    nombre: 'Power Bank 20000mAh',
    precio: 29990,
    descripcion:
      'Batería externa de 20000mAh con carga rápida 22.5W y pantalla LED.',
    emoji: '🔋',
    seccionId: 'sec-cargadores',
    stock: 18,
  },
  {
    id: 'carg-3',
    nombre: 'Cable USB-C Trenzado 2m',
    precio: 8990,
    descripcion:
      'Cable USB-C a USB-C trenzado con soporte PD 100W y resistencia a la torsión.',
    emoji: '🔗',
    seccionId: 'sec-cargadores',
    stock: 42,
  },
  {
    id: 'carg-4',
    nombre: 'Cargador de Pared Doble',
    precio: 9990,
    descripcion:
      'Cargador de pared con 2 puertos USB-A y salida total de 20W.',
    emoji: '🔌',
    seccionId: 'sec-cargadores',
    stock: 35,
  },
  {
    id: 'carg-5',
    nombre: 'Base Carga Inalámbrica 3 en 1',
    precio: 39990,
    descripcion:
      'Estación de carga inalámbrica para celular, smartwatch y audífonos.',
    emoji: '📱',
    seccionId: 'sec-cargadores',
    stock: 12,
  },
  {
    id: 'carg-6',
    nombre: 'Cable Lightning Trenzado',
    precio: 9990,
    descripcion:
      'Cable Lightning certificado con trenzado de nylon y carga rápida.',
    emoji: '🔗',
    seccionId: 'sec-cargadores',
    stock: 30,
  },
  {
    id: 'carg-7',
    nombre: 'Cargador Solar Portátil',
    precio: 34990,
    descripcion:
      'Panel solar plegable de 21W con 2 puertos USB para camping y emergencias.',
    emoji: '☀️',
    seccionId: 'sec-cargadores',
    stock: 9,
  },
  {
    id: 'carg-8',
    nombre: 'Multicargador 6 Puertos',
    precio: 24990,
    descripcion:
      'Cargador USB con 6 puertos y 60W totales para cargar varios dispositivos.',
    emoji: '🔌',
    seccionId: 'sec-cargadores',
    stock: 14,
  },
  {
    id: 'carg-9',
    nombre: 'Cable USB-A a C 1m (2 uds)',
    precio: 6990,
    descripcion:
      'Pack de 2 cables USB-A a USB-C de 1 metro con carga rápida 3A.',
    emoji: '🔗',
    seccionId: 'sec-cargadores',
    stock: 48,
  },
  {
    id: 'carg-10',
    nombre: 'Cargador de Notebook 90W',
    precio: 39990,
    descripcion:
      'Cargador universal de 90W con 10 conectores intercambiables para notebook.',
    emoji: '💻',
    seccionId: 'sec-cargadores',
    stock: 8,
  },
  {
    id: 'carg-11',
    nombre: 'Organizador de Carga 8 Slots',
    precio: 15990,
    descripcion:
      'Organizador de silicona para 8 cargadores con tapa y cierre.',
    emoji: '🧰',
    seccionId: 'sec-cargadores',
    stock: 16,
  },
  {
    id: 'carg-12',
    nombre: 'Cargador Inalámbrico de Auto',
    precio: 24990,
    descripcion:
      'Soporte de carga inalámbrica para auto con apertura automática y 15W.',
    emoji: '🚗',
    seccionId: 'sec-cargadores',
    stock: 13,
  },
  {
    id: 'carg-13',
    nombre: 'Extensor USB-C 4 Puertos',
    precio: 18990,
    descripcion:
      'Extensor USB-C con 4 puertos USB-A y salida de datos de 5Gbps.',
    emoji: '🔀',
    seccionId: 'sec-cargadores',
    stock: 19,
  },
  {
    id: 'carg-14',
    nombre: 'Power Bank Delgado 5000mAh',
    precio: 12990,
    descripcion:
      'Batería externa delgada de 5000mAh con conector integrado y carga directa.',
    emoji: '🔋',
    seccionId: 'sec-cargadores',
    stock: 27,
  },
  {
    id: 'carg-15',
    nombre: 'Kit Cables y Cargador Viaje',
    precio: 24990,
    descripcion:
      'Kit de viaje con cargador 30W, cables USB-C/Lightning y bolsa organizadora.',
    emoji: '🧳',
    seccionId: 'sec-cargadores',
    stock: 11,
  },
  {
    id: 'carg-16',
    nombre: 'Regulador de Voltaje 6 Salidas',
    precio: 19990,
    descripcion:
      'Regulador con 6 salidas, protección contra sobrecarga y 1000W de potencia.',
    emoji: '⚡',
    seccionId: 'sec-cargadores',
    stock: 10,
  },
  {
    id: 'carg-17',
    nombre: 'Cargador Inalámbrico 2 en 1',
    precio: 29990,
    descripcion:
      'Base de carga para celular y audífonos con diseño compacto de viaje.',
    emoji: '📱',
    seccionId: 'sec-cargadores',
    stock: 15,
  },
  {
    id: 'carg-18',
    nombre: 'Cable Retráctil USB-C',
    precio: 8990,
    descripcion:
      'Cable retráctil USB-C a USB-C de 80cm con carga rápida y clip para mochila.',
    emoji: '🌀',
    seccionId: 'sec-cargadores',
    stock: 33,
  },
  {
    id: 'carg-19',
    nombre: 'Power Bank con Linterna',
    precio: 19990,
    descripcion:
      'Batería de 10000mAh con linterna LED de 3 modos y brújula integrada.',
    emoji: '🔦',
    seccionId: 'sec-cargadores',
    stock: 12,
  },
  {
    id: 'carg-20',
    nombre: 'Cargador de Piso Doble',
    precio: 17990,
    descripcion:
      'Cargador doble para enchufes horizontales con puertos USB-A y USB-C.',
    emoji: '🔌',
    seccionId: 'sec-cargadores',
    stock: 21,
  },

  {
    id: 'sup-1',
    nombre: 'Polera Básica Algodón',
    precio: 8990,
    descripcion:
      'Polera de algodón peinado 180g con cuello redondo reforzado y corte clásico.',
    emoji: '👕',
    seccionId: 'sec-superior',
    stock: 45,
  },
  {
    id: 'sup-2',
    nombre: 'Polerón Cuello Redondo',
    precio: 24990,
    descripcion:
      'Polerón de algodón grueso con cuello redondo, puños elásticos y bolsillo.',
    emoji: '🧶',
    seccionId: 'sec-superior',
    stock: 20,
  },
  {
    id: 'sup-3',
    nombre: 'Camisa Flannel',
    precio: 19990,
    descripcion:
      'Camisa flannel de cuadros con botones, bolsillo frontal y algodón suave.',
    emoji: '👔',
    seccionId: 'sec-superior',
    stock: 17,
  },
  {
    id: 'sup-4',
    nombre: 'Polera Deportiva Dry-Fit',
    precio: 12990,
    descripcion:
      'Polera técnica de secado rápido con tejido transpirable y costuras planas.',
    emoji: '🏃',
    seccionId: 'sec-superior',
    stock: 28,
  },
  {
    id: 'sup-5',
    nombre: 'Chaqueta Rompevientos',
    precio: 29990,
    descripcion:
      'Chaqueta ligera resistente al viento y al agua con capucha plegable.',
    emoji: '🧥',
    seccionId: 'sec-superior',
    stock: 12,
  },
  {
    id: 'sup-6',
    nombre: 'Polera Manga Larga',
    precio: 14990,
    descripcion:
      'Polera de manga larga con algodón suave, cuello alto y costuras reforzadas.',
    emoji: '👕',
    seccionId: 'sec-superior',
    stock: 23,
  },
  {
    id: 'sup-7',
    nombre: 'Parka Invierno Acolchada',
    precio: 59990,
    descripcion:
      'Parka acolchada con capucha forrada, cierre doble y bolsillos calefaccionados.',
    emoji: '🧥',
    seccionId: 'sec-superior',
    stock: 7,
  },
  {
    id: 'sup-8',
    nombre: 'Polo Clásico Piqué',
    precio: 17990,
    descripcion:
      'Polo de piqué con cuello y puños en contraste, ideal para oficina.',
    emoji: '👔',
    seccionId: 'sec-superior',
    stock: 19,
  },
  {
    id: 'sup-9',
    nombre: 'Polerón Zip',
    precio: 27990,
    descripcion:
      'Polerón con cierre completo, bolsillos laterales y tejido fleece.',
    emoji: '🧶',
    seccionId: 'sec-superior',
    stock: 14,
  },
  {
    id: 'sup-10',
    nombre: 'Blazer Slim Fit',
    precio: 49990,
    descripcion:
      'Blazer de corte slim con forro interior, 2 botones y bolsillos con solapa.',
    emoji: '🤵',
    seccionId: 'sec-superior',
    stock: 6,
  },
  {
    id: 'sup-11',
    nombre: 'Polera Estampada Grafiti',
    precio: 13990,
    descripcion:
      'Polera oversize con estampado grafiti frontal y espalda, algodón 220g.',
    emoji: '🎨',
    seccionId: 'sec-superior',
    stock: 25,
  },
  {
    id: 'sup-12',
    nombre: 'Sweater Lana Merino',
    precio: 34990,
    descripcion:
      'Sweater de lana merino con cuello redondo, tejido fino y tacto suave.',
    emoji: '🧶',
    seccionId: 'sec-superior',
    stock: 9,
  },
  {
    id: 'sup-13',
    nombre: 'Camiseta Interior Térmica',
    precio: 14990,
    descripcion:
      'Camiseta térmica de compresión para invierno con retención de calor.',
    emoji: '🔥',
    seccionId: 'sec-superior',
    stock: 22,
  },
  {
    id: 'sup-14',
    nombre: 'Chaqueta Denim',
    precio: 39990,
    descripcion:
      'Chaqueta de denim lavado medio con botones metálicos y bolsillos frontales.',
    emoji: '🧥',
    seccionId: 'sec-superior',
    stock: 11,
  },
  {
    id: 'sup-15',
    nombre: 'Top Deportivo Mujer',
    precio: 11990,
    descripcion:
      'Top deportivo con soporte medio, tejido de secado rápido y espalda cruzada.',
    emoji: '🏋️',
    seccionId: 'sec-superior',
    stock: 18,
  },
  {
    id: 'sup-16',
    nombre: 'Polera Cropped',
    precio: 9990,
    descripcion:
      'Polera cropped de algodón con corte moderno y dobladillo limpio.',
    emoji: '👚',
    seccionId: 'sec-superior',
    stock: 26,
  },
  {
    id: 'sup-17',
    nombre: 'Traje 2 Piezas Slim',
    precio: 149990,
    descripcion:
      'Traje de 2 piezas con chaleco, tela antimanchas y corte slim fit.',
    emoji: '🤵',
    seccionId: 'sec-superior',
    stock: 4,
  },
  {
    id: 'sup-18',
    nombre: 'Polerón Oversize Unisex',
    precio: 25990,
    descripcion:
      'Polerón oversize unisex con drop shoulders y algodón fleece 400g.',
    emoji: '🧥',
    seccionId: 'sec-superior',
    stock: 16,
  },
  {
    id: 'sup-19',
    nombre: 'Chaleco Acolchado',
    precio: 29990,
    descripcion:
      'Chaleco acolchado sin mangas con bolsillos y cierre central.',
    emoji: '🧦',
    seccionId: 'sec-superior',
    stock: 10,
  },
  {
    id: 'sup-20',
    nombre: 'Camiseta Algodón Orgánico',
    precio: 10990,
    descripcion:
      'Camiseta de algodón orgánico certificado con tintes naturales.',
    emoji: '🌱',
    seccionId: 'sec-superior',
    stock: 31,
  },

  {
    id: 'inf-1',
    nombre: 'Jeans Slim Recto',
    precio: 29990,
    descripcion:
      'Jeans slim recto con denim elástico, 5 bolsillos y lavado oscuro.',
    emoji: '👖',
    seccionId: 'sec-inferior',
    stock: 20,
  },
  {
    id: 'inf-2',
    nombre: 'Short Denim',
    precio: 19990,
    descripcion:
      'Short de denim con dobladillo enrollado, 5 bolsillos y corte regular.',
    emoji: '🩳',
    seccionId: 'sec-inferior',
    stock: 24,
  },
  {
    id: 'inf-3',
    nombre: 'Jogger Deportivo',
    precio: 21990,
    descripcion:
      'Jogger con cintura elástica, puños en tobillo y tela de secado rápido.',
    emoji: '🏃',
    seccionId: 'sec-inferior',
    stock: 27,
  },
  {
    id: 'inf-4',
    nombre: 'Pantalón Formal Chino',
    precio: 24990,
    descripcion:
      'Pantalón chino de corte recto con bolsillos inclinados y tela stretch.',
    emoji: '👔',
    seccionId: 'sec-inferior',
    stock: 15,
  },
  {
    id: 'inf-5',
    nombre: 'Pantalón Cargo Táctica',
    precio: 27990,
    descripcion:
      'Pantalón cargo con 8 bolsillos, rodilleras reforzadas y tela ripstop.',
    emoji: '🎒',
    seccionId: 'sec-inferior',
    stock: 13,
  },
  {
    id: 'inf-6',
    nombre: 'Leggings Deportivos',
    precio: 15990,
    descripcion:
      'Leggings de compresión alta con cintura ancha y bolsillo lateral.',
    emoji: '🧘',
    seccionId: 'sec-inferior',
    stock: 30,
  },
  {
    id: 'inf-7',
    nombre: 'Pantalón de Vestir',
    precio: 29990,
    descripcion:
      'Pantalón de vestir con pliegue, tela de tiro y acabado elegante.',
    emoji: '🤵',
    seccionId: 'sec-inferior',
    stock: 8,
  },
  {
    id: 'inf-8',
    nombre: 'Jeans Skinny Negro',
    precio: 27990,
    descripcion:
      'Jeans skinny negro de algodón elástico con 5 bolsillos y corte ajustado.',
    emoji: '👖',
    seccionId: 'sec-inferior',
    stock: 18,
  },
  {
    id: 'inf-9',
    nombre: 'Shorts de Baño',
    precio: 14990,
    descripcion:
      'Shorts de baño de secado rápido con red interior y bolsillo con cierre.',
    emoji: '🏖️',
    seccionId: 'sec-inferior',
    stock: 22,
  },
  {
    id: 'inf-10',
    nombre: 'Pantalón de Carga Mujer',
    precio: 25990,
    descripcion:
      'Pantalón cargo mujer con ajuste alto, 6 bolsillos y tela suave.',
    emoji: '👖',
    seccionId: 'sec-inferior',
    stock: 12,
  },
  {
    id: 'inf-11',
    nombre: 'Leggings de Algodón',
    precio: 12990,
    descripcion:
      'Leggings de algodón con elastano, tiro medio y costura plana.',
    emoji: '🧦',
    seccionId: 'sec-inferior',
    stock: 26,
  },
  {
    id: 'inf-12',
    nombre: 'Pantalón Cargo Flaco',
    precio: 21990,
    descripcion:
      'Pantalón cargo slim con cintura elástica y bolsillos con velcro.',
    emoji: '🎒',
    seccionId: 'sec-inferior',
    stock: 14,
  },
  {
    id: 'inf-13',
    nombre: 'Jeans Wide Leg',
    precio: 31990,
    descripcion:
      'Jeans de pierna ancha con tiro alto, denim rígido y look retro.',
    emoji: '👖',
    seccionId: 'sec-inferior',
    stock: 10,
  },
  {
    id: 'inf-14',
    nombre: 'Calzas Térmicas',
    precio: 12990,
    descripcion:
      'Calzas térmicas de compresión para invierno, ideales bajo pantalones.',
    emoji: '🔥',
    seccionId: 'sec-inferior',
    stock: 19,
  },
  {
    id: 'inf-15',
    nombre: 'Pantalón Mezclilla Cargo',
    precio: 31990,
    descripcion:
      'Mezclilla cargo con bolsillos laterales, lavado medio y corte regular.',
    emoji: '👖',
    seccionId: 'sec-inferior',
    stock: 9,
  },
  {
    id: 'inf-16',
    nombre: 'Shorts Deportivos',
    precio: 9990,
    descripcion:
      'Shorts deportivos con interior malla, cintura elástica y bolsillo con cierre.',
    emoji: '🏀',
    seccionId: 'sec-inferior',
    stock: 25,
  },
  {
    id: 'inf-17',
    nombre: 'Pantalón Corduroy',
    precio: 26990,
    descripcion:
      'Pantalón de pana con corte recto, tela suave y bolsillos laterales.',
    emoji: '🧶',
    seccionId: 'sec-inferior',
    stock: 11,
  },
  {
    id: 'inf-18',
    nombre: 'Jeans Clásico Recto',
    precio: 29990,
    descripcion:
      'Jeans clásico de corte recto con lavado claro y denim de 14oz.',
    emoji: '👖',
    seccionId: 'sec-inferior',
    stock: 16,
  },
  {
    id: 'inf-19',
    nombre: 'Pantalón Camping Convertible',
    precio: 27990,
    descripcion:
      'Pantalón convertible a short con cremalleras y tela de secado rápido.',
    emoji: '⛺',
    seccionId: 'sec-inferior',
    stock: 7,
  },
  {
    id: 'inf-20',
    nombre: 'Falda Pantalón',
    precio: 17990,
    descripcion:
      'Falda pantalón de tiro alto con pliegues y cierre oculto.',
    emoji: '👗',
    seccionId: 'sec-inferior',
    stock: 13,
  },

  {
    id: 'calz-1',
    nombre: 'Zapatillas Running',
    precio: 54990,
    descripcion:
      'Zapatillas running con amortiguación de espuma, malla transpirable y 280g.',
    emoji: '👟',
    seccionId: 'sec-calzado',
    stock: 18,
  },
  {
    id: 'calz-2',
    nombre: 'Bototos Cuero',
    precio: 59990,
    descripcion:
      'Bototos de cuero con suela antideslizante, forro térmico y punta reforzada.',
    emoji: '🥾',
    seccionId: 'sec-calzado',
    stock: 9,
  },
  {
    id: 'calz-3',
    nombre: 'Zapatillas Casual Blancas',
    precio: 39990,
    descripcion:
      'Zapatillas casual en cuero blanco con suela de goma y forro textil.',
    emoji: '👟',
    seccionId: 'sec-calzado',
    stock: 21,
  },
  {
    id: 'calz-4',
    nombre: 'Zapatos Formales',
    precio: 49990,
    descripcion:
      'Zapatos formales de cuero con suela de cuero, ideal para oficina.',
    emoji: '👞',
    seccionId: 'sec-calzado',
    stock: 8,
  },
  {
    id: 'calz-5',
    nombre: 'Sandalias Deportivas',
    precio: 19990,
    descripcion:
      'Sandalias deportivas con correas ajustables y plantilla de memoria.',
    emoji: '🩴',
    seccionId: 'sec-calzado',
    stock: 26,
  },
  {
    id: 'calz-6',
    nombre: 'Zapatillas Skate',
    precio: 45990,
    descripcion:
      'Zapatillas skate con suela vulcanizada, refuerzo en punta y cuero sintético.',
    emoji: '🛹',
    seccionId: 'sec-calzado',
    stock: 14,
  },
  {
    id: 'calz-7',
    nombre: 'Botas Impermeables',
    precio: 64990,
    descripcion:
      'Botas impermeables con membrana, suela de tracción y caña media.',
    emoji: '🌧️',
    seccionId: 'sec-calzado',
    stock: 6,
  },
  {
    id: 'calz-8',
    nombre: 'Zapatillas Basketball',
    precio: 69990,
    descripcion:
      'Zapatillas de básquetbol con soporte de tobillo, amortiguación y agarre.',
    emoji: '🏀',
    seccionId: 'sec-calzado',
    stock: 10,
  },
  {
    id: 'calz-9',
    nombre: 'Mocasines',
    precio: 34990,
    descripcion:
      'Mocasines de cuero suave con suela flexible y estilo clásico.',
    emoji: '👞',
    seccionId: 'sec-calzado',
    stock: 12,
  },
  {
    id: 'calz-10',
    nombre: 'Zapatillas Trekking',
    precio: 79990,
    descripcion:
      'Zapatillas trekking con suela Vibram, caña baja y membrana impermeable.',
    emoji: '⛰️',
    seccionId: 'sec-calzado',
    stock: 5,
  },
  {
    id: 'calz-11',
    nombre: 'Chalas de Piscina',
    precio: 8990,
    descripcion:
      'Chalas de EVA ultralivianas con correa suave y agarre antideslizante.',
    emoji: '🏊',
    seccionId: 'sec-calzado',
    stock: 35,
  },
  {
    id: 'calz-12',
    nombre: 'Zapatillas Urbanas Negras',
    precio: 42990,
    descripcion:
      'Zapatillas urbanas en negro mate con suela blanca y diseño minimalista.',
    emoji: '👟',
    seccionId: 'sec-calzado',
    stock: 17,
  },
  {
    id: 'calz-13',
    nombre: 'Botines Fútbol',
    precio: 39990,
    descripcion:
      'Botines de fútbol con tacos fijos, capellada sintética y ajuste cómodo.',
    emoji: '⚽',
    seccionId: 'sec-calzado',
    stock: 11,
  },
  {
    id: 'calz-14',
    nombre: 'Zapatillas Mujer Plataforma',
    precio: 47990,
    descripcion:
      'Zapatillas con plataforma de 4cm, lona resistente y plantilla acolchada.',
    emoji: '👟',
    seccionId: 'sec-calzado',
    stock: 15,
  },
  {
    id: 'calz-15',
    nombre: 'Ojotas de Vestir',
    precio: 14990,
    descripcion:
      'Ojotas de cuero con suela antideslizante y correas cruzadas.',
    emoji: '🩴',
    seccionId: 'sec-calzado',
    stock: 20,
  },
  {
    id: 'calz-16',
    nombre: 'Zapatillas Trail Running',
    precio: 74990,
    descripcion:
      'Zapatillas trail con suela de alto agarre, protección de roca y caña media.',
    emoji: '🌲',
    seccionId: 'sec-calzado',
    stock: 7,
  },
  {
    id: 'calz-17',
    nombre: 'Zapatos de Cuero Eco',
    precio: 44990,
    descripcion:
      'Zapatos con cuero ecológico certificado, forro transpirable y suela de goma.',
    emoji: '🌱',
    seccionId: 'sec-calzado',
    stock: 9,
  },
  {
    id: 'calz-18',
    nombre: 'Zapatillas Niños',
    precio: 24990,
    descripcion:
      'Zapatillas infantiles con velcro, punta reforzada y plantilla lavable.',
    emoji: '🧒',
    seccionId: 'sec-calzado',
    stock: 23,
  },
  {
    id: 'calz-19',
    nombre: 'Botas de Trabajo',
    precio: 69990,
    descripcion:
      'Botas de trabajo con punta de seguridad, resistencia a aceites y 200g.',
    emoji: '👷',
    seccionId: 'sec-calzado',
    stock: 6,
  },
  {
    id: 'calz-20',
    nombre: 'Zapatillas Slip-On',
    precio: 29990,
    descripcion:
      'Zapatillas sin cordones con elásticos laterales y plantilla de espuma.',
    emoji: '👟',
    seccionId: 'sec-calzado',
    stock: 19,
  },

  {
    id: 'acc-1',
    nombre: 'Mochila Anti-Robo 25L',
    precio: 34990,
    descripcion:
      'Mochila con cierres ocultos, puerto USB y compartimento acolchado para notebook.',
    emoji: '🎒',
    seccionId: 'sec-accesorios',
    stock: 15,
  },
  {
    id: 'acc-2',
    nombre: 'Gorra Beisbolera',
    precio: 7990,
    descripcion:
      'Gorra de algodón con visera curva y ajuste con hebilla.',
    emoji: '🧢',
    seccionId: 'sec-accesorios',
    stock: 32,
  },
  {
    id: 'acc-3',
    nombre: 'Cinturón Cuero Automático',
    precio: 14990,
    descripcion:
      'Cinturón de cuero con hebilla automática y ajuste sin agujeros.',
    emoji: '🩹',
    seccionId: 'sec-accesorios',
    stock: 18,
  },
  {
    id: 'acc-4',
    nombre: 'Guantes Invierno Táctiles',
    precio: 9990,
    descripcion:
      'Guantes con dedos táctiles, forro polar y agarre antideslizante.',
    emoji: '🧤',
    seccionId: 'sec-accesorios',
    stock: 24,
  },
  {
    id: 'acc-5',
    nombre: 'Billetera Slim RFID',
    precio: 12990,
    descripcion:
      'Billetera delgada con protección RFID y compartimento para monedas.',
    emoji: '👛',
    seccionId: 'sec-accesorios',
    stock: 21,
  },
  {
    id: 'acc-6',
    nombre: 'Bufanda Lana',
    precio: 9990,
    descripcion:
      'Bufanda de lana acrílica de 180cm con tejido grueso y flecos.',
    emoji: '🧣',
    seccionId: 'sec-accesorios',
    stock: 17,
  },
  {
    id: 'acc-7',
    nombre: 'Gafas de Sol Polarizadas',
    precio: 15990,
    descripcion:
      'Gafas de sol con lentes polarizadas UV400 y marco liviano.',
    emoji: '🕶️',
    seccionId: 'sec-accesorios',
    stock: 26,
  },
  {
    id: 'acc-8',
    nombre: 'Corbata Seda',
    precio: 9990,
    descripcion:
      'Corbata de seda con estampado clásico y forro interior.',
    emoji: '🎀',
    seccionId: 'sec-accesorios',
    stock: 13,
  },
  {
    id: 'acc-9',
    nombre: 'Reloj Casual Caja 40mm',
    precio: 24990,
    descripcion:
      'Reloj casual con caja de 40mm, correa de cuero y movimiento japonés.',
    emoji: '⌚',
    seccionId: 'sec-accesorios',
    stock: 11,
  },
  {
    id: 'acc-10',
    nombre: 'Sombrero Paja Verano',
    precio: 12990,
    descripcion:
      'Sombrero de paja con ala ancha, cinta decorativa y talla ajustable.',
    emoji: '👒',
    seccionId: 'sec-accesorios',
    stock: 14,
  },
  {
    id: 'acc-11',
    nombre: 'Riñonera Urbana',
    precio: 11990,
    descripcion:
      'Riñonera de poliéster resistente con 3 compartimentos y cierre YKK.',
    emoji: '👜',
    seccionId: 'sec-accesorios',
    stock: 19,
  },
  {
    id: 'acc-12',
    nombre: 'Calcetines Largos (5 pares)',
    precio: 11990,
    descripcion:
      'Pack de 5 pares de calcetines largos de algodón con elastano.',
    emoji: '🧦',
    seccionId: 'sec-accesorios',
    stock: 28,
  },
  {
    id: 'acc-13',
    nombre: 'Llavero Personalizado',
    precio: 4990,
    descripcion:
      'Llavero metálico grabable con anillo doble y embalaje de regalo.',
    emoji: '🔑',
    seccionId: 'sec-accesorios',
    stock: 40,
  },
  {
    id: 'acc-14',
    nombre: 'Pañuelo Seda',
    precio: 8990,
    descripcion:
      'Pañuelo de seda con estampado floral, 70x70cm y acabado enrollado.',
    emoji: '🧣',
    seccionId: 'sec-accesorios',
    stock: 16,
  },
  {
    id: 'acc-15',
    nombre: 'Bolso Tote Lona',
    precio: 14990,
    descripcion:
      'Bolso tote de lona con bolsillo interior, asas largas y estampado.',
    emoji: '👜',
    seccionId: 'sec-accesorios',
    stock: 20,
  },
  {
    id: 'acc-16',
    nombre: 'Gorro de Lana Tejido',
    precio: 8990,
    descripcion:
      'Gorro de lana tejido con vuelta doble y pompón, talla única.',
    emoji: '🧶',
    seccionId: 'sec-accesorios',
    stock: 22,
  },
  {
    id: 'acc-17',
    nombre: 'Anteojos Lectura Rectangular',
    precio: 7990,
    descripcion:
      'Anteojos de lectura con marco rectangular y estuche rígido.',
    emoji: '👓',
    seccionId: 'sec-accesorios',
    stock: 18,
  },
  {
    id: 'acc-18',
    nombre: 'Cartera Crossbody',
    precio: 19990,
    descripcion:
      'Cartera cruzada con correa ajustable, cierre magnético y 3 compartimentos.',
    emoji: '👛',
    seccionId: 'sec-accesorios',
    stock: 12,
  },
  {
    id: 'acc-19',
    nombre: 'Set Aretes y Collar',
    precio: 12990,
    descripcion:
      'Set de joyería con aretes y collar en acero inoxidable, estilo minimalista.',
    emoji: '💎',
    seccionId: 'sec-accesorios',
    stock: 15,
  },
  {
    id: 'acc-20',
    nombre: 'Maleta Cabina 55cm',
    precio: 49990,
    descripcion:
      'Maleta de cabina con 4 ruedas, candado TSA y tela impermeable.',
    emoji: '🧳',
    seccionId: 'sec-accesorios',
    stock: 8,
  },
];