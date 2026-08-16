const fs = require('fs');
const path = require('path');

const files = {
  // Componente Reutilizable
  'src/components/ProductCard.js': `import { View, Text, StyleSheet } from 'react-native';

export default function ProductCard({ title, price }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>$\${price.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 14, color: '#2e7d32', marginTop: 4, fontWeight: '600' },
});
`,

  // Root Layout
  'src/app/_layout.js': `import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(drawer)" />
    </Stack>
  );
}
`,

  // Login
  'src/app/index.js': `import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
      return;
    }
    router.replace('/(drawer)/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a MiniStore</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 32, color: '#1a1a1a' },
  input: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
`,

  // Drawer Layout
  'src/app/(drawer)/_layout.js': `import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ headerTintColor: '#007AFF' }}>
        <Drawer.Screen name="home" options={{ drawerLabel: 'Inicio', title: 'Inicio' }} />
        <Drawer.Screen name="productos" options={{ drawerLabel: 'Tecnología', title: 'Productos' }} />
        <Drawer.Screen name="ropa" options={{ drawerLabel: 'Ropa', title: 'Vestuario' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
`,

  // Home
  'src/app/(drawer)/home.js': `import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>¡Hola, usuario!</Text>
      <View style={styles.infoBox}>
        <Ionicons name="menu" size={24} color="#007AFF" />
        <Text style={styles.infoText}>Desliza o presiona el menú para explorar productos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcome: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  infoBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#eef6ff', padding: 12, borderRadius: 8 },
  infoText: { color: '#007AFF', fontSize: 14 },
});
`,

  // Productos
  'src/app/(drawer)/productos.js': `import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../../components/ProductCard';

const techProducts = [
  { id: '1', title: 'Audífonos Bluetooth', price: 29990 },
  { id: '2', title: 'Teclado Mecánico RGB', price: 45000 },
  { id: '3', title: 'Mouse Inalámbrico', price: 18990 },
  { id: '4', title: 'Monitor 24" Full HD', price: 120000 },
];

export default function ProductosScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={techProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard title={item.title} price={item.price} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
});
`,

  // Ropa
  'src/app/(drawer)/ropa.js': `import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../../components/ProductCard';

const clothingProducts = [
  { id: '1', title: 'Polera Oversize', price: 15990 },
  { id: '2', title: 'Pantalón Cargo', price: 27990 },
  { id: '3', title: 'Zapatillas Urbanas', price: 49990 },
  { id: '4', title: 'Polerón Hoodie', price: 22990 },
];

export default function RopaScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={clothingProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard title={item.title} price={item.price} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
});
`
};

// Generar carpetas y archivos
Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Creado: ${filePath}`);
});

console.log('\n🚀 ¡Estructura y archivos generados exitosamente!');