# Prueba Técnica - React Native

Aplicación móvil desarrollada en React Native que permite visualizar productos, buscar por título y gestionar una lista de favoritos persistente.

La aplicación fue diseñada priorizando claridad en la arquitectura y separación de responsabilidades.

---

## Funcionalidades

- Listado de productos con paginación
- Búsqueda por título con debounce (300ms)
- Pantalla de detalle de producto
- Agregar y eliminar favoritos
- Persistencia de favoritos con AsyncStorage
- Pull to refresh
- Manejo de errores con opción de reintento

---

## Decisiones técnicas

### Redux Toolkit

Se utilizó Redux Toolkit para manejar el estado global de forma centralizada y predecible.

- `productsSlice`: maneja listado, búsqueda, paginación y estado de carga
- `favoritesSlice`: maneja favoritos usando un objeto tipo diccionario para acceso eficiente

---

### Acciones asíncronas (Thunks)

Se implementaron acciones asíncronas para:

- Obtener productos paginados
- Buscar productos por título

Esto permite desacoplar la lógica de negocio de la capa de presentación.

---

### Debounce en búsqueda

Se implementó un hook personalizado `useDebounce` para evitar múltiples requests mientras el usuario escribe, optimizando el consumo de la API.

---

### Persistencia con AsyncStorage

Se implementó persistencia manual utilizando AsyncStorage.

Flujo:

1. Al iniciar la aplicación, se cargan los favoritos almacenados en el dispositivo
2. Cada vez que los favoritos cambian, se guardan automáticamente

---

### Navegación

Se utilizó React Navigation con navegación tipo Stack para estructurar las pantallas:

- Home
- Product Detail
- Favorites

---

## Instalación

```bash
npm install
```

---

## Ejecución

1. Iniciar el servidor de Metro

Desde la raíz del proyecto:

```bash
npx react-native --reset-cache
```

Requisitos:

-Android Studio instalado
-Emulador activo o dispositivo físico conectado

2. Ejecutar la aplicación en Android

En otra terminal, también en la raíz:

```bash
npx react-native run-android
```

---

## Estructura del proyecto

Organización modular por features, separando lógica de negocio, UI y navegación.

    src/
     ├── api/
     ├── app/
     ├── components/
     ├── features/
     │    ├── products/
     │    └── favorites/
     ├── navigation/
     ├── screens/
     └── utils/

---

Autor

Gastón Duarte
