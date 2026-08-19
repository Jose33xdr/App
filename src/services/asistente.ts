import type { Producto, Seccion } from '../data/productos';
import { formatoPrecio } from '../utils/formato';

export interface RespuestaAsistente {
  texto: string;
  productos?: Producto[];
}

const STOPWORDS = new Set([
  'quiero', 'queria', 'quisiera', 'busco', 'buscar', 'busca', 'buscando',
  'alguna', 'alguno', 'algun', 'algunos', 'algunas', 'hay', 'tienes',
  'tiene', 'tengo', 'venden', 'vende', 'vendo', 'comprar', 'compra',
  'me', 'un', 'una', 'unos', 'unas', 'por', 'para', 'de', 'en', 'el',
  'la', 'los', 'las', 'lo', 'con', 'que', 'como', 'cuanto', 'cuales',
  'cual', 'muestrame', 'recomiendame', 'recomienda', 'dame', 'precio',
  'precios', 'cuesta', 'vale', 'puedes', 'puedo', 'podrias', 'sobre',
  'ver', 'producto', 'productos', 'articulo', 'articulos', 'catalogo',
  'todos', 'estan', 'esta', 'son', 'es', 'a', 'o', 'y', 'si', 'no', 'aun',
]);

const ALIASES_SECCIONES: Record<string, string> = {
  computador: 'sec-computacion',
  computadores: 'sec-computacion',
  computadora: 'sec-computacion',
  computo: 'sec-computacion',
  pc: 'sec-computacion',
  notebook: 'sec-computacion',
  laptop: 'sec-computacion',
  telefono: 'sec-telefonia',
  telefonos: 'sec-telefonia',
  celular: 'sec-telefonia',
  celulares: 'sec-telefonia',
  zapatilla: 'sec-calzado',
  zapatos: 'sec-calzado',
  zapato: 'sec-calzado',
  pantalon: 'sec-inferior',
  pantalones: 'sec-inferior',
  polera: 'sec-superior',
  poleras: 'sec-superior',
  poleron: 'sec-superior',
  polerones: 'sec-superior',
  audifono: 'sec-audio',
  parlante: 'sec-audio',
  parlantes: 'sec-audio',
  musica: 'sec-audio',
  reloj: 'sec-wearables',
  relojes: 'sec-wearables',
  smartband: 'sec-wearables',
  cargador: 'sec-cargadores',
  cargadores: 'sec-cargadores',
  bateria: 'sec-cargadores',
  powerbank: 'sec-cargadores',
  gorra: 'sec-accesorios',
  gorras: 'sec-accesorios',
  mochila: 'sec-accesorios',
  mochilas: 'sec-accesorios',
};

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokensBusqueda(texto: string): string[] {
  return normalizar(texto)
    .split(' ')
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

function buscarProductos(tokens: string[], productos: Producto[]): Producto[] {
  const resultados: { p: Producto; pts: number }[] = [];
  for (const p of productos) {
    const nombre = normalizar(p.nombre);
    let pts = 0;
    for (const t of tokens) {
      if (nombre.includes(t)) pts += 1;
    }
    if (pts > 0) resultados.push({ p, pts });
  }
  return resultados
    .sort((a, b) => b.pts - a.pts)
    .slice(0, 3)
    .map((r) => r.p);
}

function buscarSeccion(
  tokens: string[],
  secciones: Seccion[]
): Seccion | undefined {
  for (const t of tokens) {
    const porAlias = ALIASES_SECCIONES[t];
    if (porAlias) return secciones.find((s) => s.id === porAlias);
    const coincidencia = secciones.find((s) =>
      normalizar(s.nombre).includes(t)
    );
    if (coincidencia) return coincidencia;
  }
  return undefined;
}

function resumenLista(productos: Producto[]): string {
  return productos
    .map(
      (p, i) =>
        `${i + 1}. ${p.emoji} ${p.nombre} — ${formatoPrecio(p.precio)} (stock: ${p.stock})`
    )
    .join('\n');
}

export function responderAsistente(
  mensaje: string,
  productos: Producto[],
  secciones: Seccion[]
): RespuestaAsistente {
  const texto = normalizar(mensaje);
  const tokens = tokensBusqueda(mensaje);

  if (/\b(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|holi|saludos)\b/.test(texto)) {
    return {
      texto:
        '¡Hola! 👋 Soy el asistente IA de MiniStore. Puedo ayudarte a buscar productos, ver precios y stock, o responder sobre pagos, despacho y garantías. ¿Qué necesitas?',
    };
  }

  if (/\b(gracias|muchas gracias|perfecto|genial|excelente|ok, gracias)\b/.test(texto)) {
    return {
      texto:
        '¡Con gusto! 😊 Si necesitas algo más, aquí estoy. Recuerda que puedes pagar hasta en 24 cuotas sin interés.',
    };
  }

  if (
    incluye(texto, 'despacho', 'envio', 'enviar', 'entrega', 'cuando llega', 'cuanto tarda', 'llega', 'domicilio')
  ) {
    return {
      texto:
        '🚚 Sí, hacemos despacho a domicilio en todo Chile. El envío llega en 24 a 72 horas hábiles y también puedes elegir retiro en tienda, que es de inmediato y sin costo.',
    };
  }

  if (incluye(texto, 'cuota', 'cuotas', 'sin interes', 'credito')) {
    return {
      texto:
        '💳 En MiniStore puedes pagar con tarjeta de crédito hasta en 24 cuotas sin interés. También aceptamos débito, transferencia y pago en tienda al retirar.',
    };
  }

  if (incluye(texto, 'retiro', 'tienda', 'local', 'sucursal', 'pickup')) {
    return {
      texto:
        '🏬 Puedes comprar online y retirar de inmediato en nuestra tienda, sin costo. Recibirás un correo con el detalle apenas tu pedido esté listo para retiro.',
    };
  }

  if (incluye(texto, 'pago', 'pagar', 'paga', 'tarjeta', 'transferencia', 'efectivo', 'debito')) {
    return {
      texto:
        '💳 Aceptamos 3 formas de pago:\n1. Tarjeta de crédito: hasta 24 cuotas sin interés.\n2. Transferencia bancaria: confirma en tu app y tu pedido se procesa al instante.\n3. Pago en tienda: al retirar tu compra.',
    };
  }

  if (incluye(texto, 'garantia', 'falla', 'defecto', 'devolucion', 'cambio', 'reclamo')) {
    return {
      texto:
        '🛡️ Todos nuestros productos tienen garantía legal de 12 meses. Si algo sale mal, escríbenos a ayuda@ministore.cl y coordinamos el cambio o la devolución sin complicaciones.',
    };
  }

  if (incluye(texto, 'oferta', 'ofertas', 'descuento', 'rebaja', 'barato', 'promocion', 'promociones')) {
    const baratos = [...productos].sort((a, b) => a.precio - b.precio).slice(0, 3);
    return {
      texto:
        `🎉 Estas son las mejores ofertas del momento:\n${resumenLista(baratos)}\n\nTodas se pueden pagar hasta en 24 cuotas sin interés.`,
      productos: baratos,
    };
  }

  if (incluye(texto, 'horario', 'abierto', 'abren', 'abre', 'cierra', 'atencion')) {
    return {
      texto:
        '🕘 Nuestra tienda atiende de lunes a sábado de 9:00 a 19:00 horas. Las ventas telefónicas están disponibles en el mismo horario al +56 2 2560 0040.',
    };
  }

  if (incluye(texto, 'contacto', 'contactar', 'correo', 'email', 'mail', 'telefono', 'telefonico', 'whatsapp', 'llamar', 'numero')) {
    return {
      texto:
        '📞 Puedes contactarnos por teléfono al +56 2 2560 0040 (lun a sáb, 9:00-19:00) o por correo a ayuda@ministore.cl. ¡Te respondemos rápido!',
    };
  }

  const buscaStock = incluye(texto, 'stock', 'disponible', 'disponibles', 'queda', 'quedan', 'unidades', 'disponibilidad');
  const buscaPrecio = incluye(texto, 'precio', 'cuesta', 'cuanto', 'vale', 'costo', 'costar', 'cara', 'caro');
  const hayBusqueda = tokens.length > 0;

  if (buscaStock || buscaPrecio || hayBusqueda) {
    const encontrados = buscarProductos(tokens, productos);
    const seccion = buscarSeccion(tokens, secciones);

    if (seccion) {
      const deSeccion = productos
        .filter((p) => p.seccionId === seccion.id)
        .slice(0, 3);
      return {
        texto:
          `${seccion.emoji} En la sección ${seccion.nombre} tenemos varios productos. Te muestro algunos:\n${resumenLista(deSeccion)}\n\nPuedes tocar cualquiera para ver su detalle.`,
        productos: deSeccion,
      };
    }

    if (encontrados.length > 0) {
      const unidad = encontrados.length === 1;
      if (buscaStock) {
        return {
          texto: unidad
            ? `📦 Sí, tenemos stock de ${encontrados[0].nombre}: ${encontrados[0].stock} unidades disponibles.`
            : `📦 Revisé el stock de los productos que buscabas:\n${resumenLista(encontrados)}`,
          productos: encontrados,
        };
      }
      if (buscaPrecio) {
        return {
          texto: unidad
            ? `${encontrados[0].emoji} ${encontrados[0].nombre} cuesta ${formatoPrecio(encontrados[0].precio)} y se puede pagar hasta en 24 cuotas sin interés.`
            : `💰 Estos son los precios:\n${resumenLista(encontrados)}`,
          productos: encontrados,
        };
      }
      return {
        texto: unidad
          ? `Encontré ${encontrados[0].emoji} ${encontrados[0].nombre}: ${formatoPrecio(encontrados[0].precio)}, con ${encontrados[0].stock} unidades en stock. ${encontrados[0].descripcion}`
          : `Encontré estos productos:\n${resumenLista(encontrados)}\n\nToca cualquiera para verlo o agrégalo a tu carrito.`,
        productos: encontrados,
      };
    }

    if (buscaStock || buscaPrecio) {
      return {
        texto:
          '😕 No encontré productos que coincidan con tu búsqueda. Prueba con palabras como "audífonos", "zapatillas" o "cargador", o explora nuestras secciones.',
      };
    }
  }

  return {
    texto:
      '🤖 Puedo ayudarte con:\n• Buscar productos y ver precios o stock\n• Formas de pago y 24 cuotas sin interés\n• Despacho y retiro en tienda\n• Garantías y contacto\n\n¿Qué te gustaría saber?',
  };
}

function incluye(texto: string, ...palabras: string[]): boolean {
  return palabras.some((p) => texto.includes(p));
}