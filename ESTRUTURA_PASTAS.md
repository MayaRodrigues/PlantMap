# Guia da Estrutura de Pastas - PlantMap AI

## 📁 Estrutura Completa do Projeto

```
PlantMap/
├── assets/                    # Recursos do aplicativo
│   ├── icon/                  # Ícones personalizados
│   ├── img/                   # Imagens estáticas
│   ├── icon.png              # Ícone do app
│   ├── splash-icon.png       # Tela de carregamento
│   ├── adaptive-icon.png     # Ícone adaptativo (Android)
│   └── favicon.png           # Favicon para web
│
├── src/                       # Código-fonte principal
│   ├── components/            # Componentes reutilizáveis
│   ├── context/               # Contextos React (gerenciamento de estado)
│   ├── database/              # Configuração de banco de dados local
│   ├── hooks/                 # Hooks customizados
│   ├── navegation/            # Configuração de rotas/navegação
│   ├── screens/               # Telas da aplicação
│   ├── services/              # Serviços de API e utilitários
│   ├── style/                 # Temas e estilos globais
│   └── utils/                 # Funções utilitárias
│
├── App.tsx                    # Componente raiz da aplicação
├── index.ts                   # Arquivo de entrada
├── app.json                   # Configurações do Expo
├── package.json              # Dependências do projeto
├── tsconfig.json             # Configurações TypeScript
├── .gitignore                # Arquivos ignorados pelo Git
├── .expo/                    # Configurações do Expo (gerado)
├── node_modules/             # Dependências instaladas (gerado)
├── README.md                 # Documentação do projeto
└── ESTRUTURA_PASTAS.md      # Este arquivo


---

## 📂 O QUE COLOCAR EM CADA PASTA

### 🎨 **assets/**

**Função:** Armazenar recursos visuais e estáticos do app

**Exemplo de arquivos:**
```
assets/
├── icon/
│   ├── plant-icon.png
│   └── logo.png
├── img/
│   ├── background-home.png
│   ├── empty-state.png
│   ├── map-marker.png
│   └── plant-disease-example.jpg
├── icon.png               # Ícone do app (192x192)
├── splash-icon.png        # Tela inicial (1024x1024)
├── adaptive-icon.png      # Ícone adaptativo Android
└── favicon.png            # Favicon
```

**Arquivos a colocar:**
- Logos e ícones
- Imagens de fundo
- Ilustrações
- Estados vazios ("empty state")
- Ícones de status/doença

---

### 🧩 **src/components/**

**Função:** Componentes reutilizáveis (UI, cards, botões, etc)

**Exemplo de estrutura:**
```
src/components/
├── PlantCard/
│   ├── PlantCard.tsx       # Componente
│   ├── PlantCard.styles.ts # Estilos
│   └── types.ts            # Types/Interfaces
├── MapMarker/
│   ├── MapMarker.tsx
│   └── MapMarker.styles.ts
├── DiseaseAlert/
│   ├── DiseaseAlert.tsx
│   └── DiseaseAlert.styles.ts
├── CameraButton/
│   ├── CameraButton.tsx
│   └── CameraButton.styles.ts
├── LoadingSpinner/
├── Header/
├── Button/
└── Modal/
```

**Componentes a criar:**
- `PlantCard` - Exibe informações de uma planta
- `MapMarker` - Marcador no mapa
- `DiseaseAlert` - Aviso de doença detectada
- `CameraButton` - Botão para abrir câmera
- `Header` - Cabeçalho comum
- `LoadingSpinner` - Indicador de carregamento
- `ConfidenceScore` - Exibe % de confiança da IA
- `LocationDisplay` - Mostra coordenadas GPS

---

### 🎯 **src/context/**

**Função:** Gerenciar estado global da aplicação

**Exemplo de estrutura:**
```
src/context/
├── PlantContext.tsx         # Contexto das plantas
│   ├── interface com tipos
│   ├── reducer com ações
│   └── provider
├── AuthContext.tsx          # Autenticação (se necessário)
├── MapContext.tsx           # Estado do mapa
└── CameraContext.tsx        # Estado da câmera
```

**Contextos a criar:**
- `PlantContext` - Gerencia lista de plantas cadastradas
  - Actions: addPlant, deletePlant, updatePlant, getPlants
- `MapContext` - Gerencia estado do mapa
- `UserLocationContext` - Gerencia localização atual do usuário

---

### 🗄️ **src/database/**

**Função:** Configuração e operações de banco de dados local

**Exemplo de estrutura:**
```
src/database/
├── database.ts              # Inicialização do banco (SQLite)
├── migrations/
│   └── createTables.ts      # Scripts de criação de tabelas
├── repositories/
│   ├── PlantRepository.ts   # CRUD de plantas
│   ├── DiseaseRepository.ts # CRUD de doenças
│   └── LocationRepository.ts # CRUD de localizações
└── schemas/
    └── plantSchema.ts       # Define estrutura das tabelas
```

**Estrutura de tabelas SQLite:**
```typescript
// Tabela de Plantas
plants {
  id: PRIMARY KEY
  name: STRING
  scientificName: STRING
  family: STRING
  description: TEXT
  confidence: FLOAT
  imageUri: STRING
  dateCreated: DATETIME
  latitude: FLOAT
  longitude: FLOAT
  diseaseFound: BOOLEAN
}

// Tabela de Doenças Detectadas
diseases {
  id: PRIMARY KEY
  plantId: FOREIGN KEY
  diseaseName: STRING
  confidence: FLOAT
  symptoms: TEXT
  recommendations: TEXT
  dateDetected: DATETIME
}
```

---

### 🪝 **src/hooks/**

**Função:** Hooks customizados reutilizáveis

**Exemplo de estrutura:**
```
src/hooks/
├── useCamera.ts            # Lógica de câmera
├── useLocation.ts          # Lógica de GPS/localização
├── usePlantIdentification.ts # Integração com API de plantas
├── useDiseaseDetection.ts  # Integração com API de doenças
├── useDatabase.ts          # Operações com BD local
├── useMap.ts               # Lógica do mapa
└── usePersist.ts           # AsyncStorage/persistência
```

**Hooks a criar:**
```typescript
// useCamera.ts
export function useCamera() {
  // - Acessar câmera
  // - Tirar foto
  // - Salvar imagem
  // - Gerenciar permissões
}

// useLocation.ts
export function useLocation() {
  // - Obter coordenadas GPS
  // - Monitorar localização
  // - Validar localização
}

// usePlantIdentification.ts
export function usePlantIdentification() {
  // - Enviar imagem para API
  // - Processar resposta
  // - Formatar dados
}

// useDatabase.ts
export function useDatabase() {
  // - CRUD de plantas
  // - Query de dados
  // - Sincronização
}
```

---

### 🗺️ **src/navegation/**

**Função:** Rotas e navegação entre telas

**Exemplo de estrutura:**
```
src/navegation/
├── RootNavigator.tsx       # Navegação principal
├── AuthNavigator.tsx       # Navegação autenticação (se houver)
├── AppNavigator.tsx        # Navegação do app
├── types.ts                # Types de rotas
└── linking.ts              # Deep linking configuration
```

**Estrutura de navegação esperada:**
```
RootNavigator
├── Home Screen (Tab Navigator)
│   ├── HomeScreen
│   ├── MapScreen
│   ├── HistoryScreen
│   └── ProfileScreen (opcional)
└── Modals/Stacks
    ├── CameraScreen (modal)
    ├── PlantDetailsScreen (stack)
    └── SettingsScreen (opcional)
```

---

### 📱 **src/screens/**

**Função:** Telas/Páginas da aplicação

**Exemplo de estrutura:**
```
src/screens/
├── HomeScreen/
│   ├── HomeScreen.tsx
│   ├── HomeScreen.styles.ts
│   └── components/
│       ├── RecentPlants.tsx
│       └── QuickActions.tsx
├── CameraScreen/
│   ├── CameraScreen.tsx
│   ├── CameraScreen.styles.ts
│   └── PreviewScreen.tsx
├── MapScreen/
│   ├── MapScreen.tsx
│   ├── MapScreen.styles.ts
│   └── components/
│       └── PlantMarkerInfo.tsx
├── PlantDetailsScreen/
│   ├── PlantDetailsScreen.tsx
│   ├── PlantDetailsScreen.styles.ts
│   └── components/
│       ├── PlantInfo.tsx
│       ├── DiseaseInfo.tsx
│       └── LocationInfo.tsx
├── HistoryScreen/
│   ├── HistoryScreen.tsx
│   └── HistoryScreen.styles.ts
└── SplashScreen/
    └── SplashScreen.tsx
```

**Telas principais:**
1. **HomeScreen** - Início com resumo de plantas recentes
2. **CameraScreen** - Captura de foto + preview
3. **MapScreen** - Exibe mapa com localizações
4. **PlantDetailsScreen** - Detalhes completos de uma planta
5. **HistoryScreen** - Lista histórico de identificações
6. **ResultScreen** - Exibe resultado da identificação (dentro de CameraScreen ou modal)

---

### 🔌 **src/services/**

**Função:** Chamadas a APIs externas e lógica de negócio

**Exemplo de estrutura:**
```
src/services/
├── api/
│   ├── apiClient.ts        # Configuração Axios
│   ├── plantAPI.ts         # API de identificação de plantas
│   ├── diseaseAPI.ts       # API de detecção de doenças
│   └── endpoints.ts        # URLs e constantes
├── camera/
│   ├── cameraService.ts    # Lógica de câmera
│   └── imageProcessor.ts   # Processamento de imagens
├── location/
│   ├── locationService.ts  # Lógica de GPS
│   └── locationValidator.ts
├── storage/
│   ├── asyncStorageService.ts # AsyncStorage helpers
│   └── imageStorageService.ts # Salvar fotos
└── cache/
    └── cacheService.ts     # Cache de dados
```

**Serviços a implementar:**

```typescript
// plantAPI.ts
export async function identifyPlant(imageBase64: string) {
  // Enviar imagem para API (ex: Plant.io, iNaturalist)
  // Retorna: { name, scientificName, family, confidence }
}

// diseaseAPI.ts
export async function detectDisease(imageBase64: string) {
  // Enviar imagem para API (ex: PlantVillage)
  // Retorna: { disease, confidence, symptoms, recommendations }
}

// locationService.ts
export async function getCurrentLocation() {
  // Usar Expo.Location
  // Retorna: { latitude, longitude, accuracy }
}

// cameraService.ts
export async function takePicture() {
  // Usar Expo.Camera
  // Retorna: URI da imagem
}
```

---

### 🎨 **src/style/**

**Função:** Temas, cores, tipografia e estilos globais

**Exemplo de estrutura:**
```
src/style/
├── theme.ts                # Cores, tamanhos, spacing
├── typography.ts           # Fontes e estilos de texto
├── spacing.ts              # Constantes de espaçamento
├── colors.ts               # Paleta de cores
├── shadows.ts              # Sombras
└── globalStyles.ts         # Estilos globais
```

**Exemplo de conteúdo:**

```typescript
// colors.ts
export const colors = {
  primary: '#2ecc71',        // Verde para plantas
  secondary: '#3498db',      // Azul
  danger: '#e74c3c',         // Vermelho para doenças
  warning: '#f39c12',        // Amarelo/Aviso
  success: '#27ae60',        // Verde escuro
  background: '#f5f5f5',
  white: '#ffffff',
  black: '#000000',
  gray: {
    light: '#ecf0f1',
    medium: '#95a5a6',
    dark: '#34495e',
  }
};

// spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// theme.ts
export const theme = {
  colors,
  spacing,
  borderRadius: 8,
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 24,
  }
};
```

---

### 🛠️ **src/utils/**

**Função:** Funções utilitárias e helpers

**Exemplo de estrutura:**
```
src/utils/
├── formatters.ts           # Formatação de dados
├── validators.ts           # Validações
├── converters.ts           # Conversões (ex: BASE64, coordenadas)
├── constants.ts            # Constantes globais
├── errorHandler.ts         # Tratamento de erros
├── logger.ts               # Logs
├── permissions.ts          # Gerenciar permissões
└── geolocation.ts          # Utilitários de geolocalização
```

**Funções úteis a criar:**

```typescript
// formatters.ts
export function formatCoordinates(lat: number, lng: number) {}
export function formatDate(date: Date) {}
export function formatConfidence(value: number) {} // % de confiança

// validators.ts
export function isValidCoordinate(lat: number, lng: number) {}
export function isValidImageUri(uri: string) {}

// converters.ts
export async function imageUriToBase64(uri: string) {}
export function coordinateToAddress(lat: number, lng: number) {}

// permissions.ts
export async function requestCameraPermission() {}
export async function requestLocationPermission() {}
export async function requestPhotoLibraryPermission() {}

// constants.ts
export const API_KEYS = { /* ... */ }
export const API_ENDPOINTS = { /* ... */ }
export const CONFIDENCE_THRESHOLD = 0.7
```

---

## 🚀 ORDEM RECOMENDADA DE DESENVOLVIMENTO

1. **Setup Base** - Configurar App.tsx e navegação
2. **Estilos** - Criar theme e colors em `src/style/`
3. **Componentes Básicos** - Botões, Cards, Headers
4. **Hooks & Serviços** - useCamera, useLocation, APIs
5. **Database** - Criar tabelas SQLite
6. **Telas** - Implementar screens
7. **Integração** - Conectar componentes e dados
8. **Testes** - Testar fluxos completos

---

## 💡 DICAS IMPORTANTES

✅ **Organize por feature** - Cada feature em sua própria pasta
✅ **Reutilize componentes** - Evite duplicação
✅ **Tipos TypeScript** - Crie interfaces em `types.ts` em cada pasta
✅ **Separação de responsabilidades** - Services fazem chamadas, Hooks gerenciam lógica
✅ **Constantes globais** - Mantenha em `utils/constants.ts`
✅ **Tratamento de erros** - Use try/catch nos serviços
✅ **Async/Await** - Sempre use para operações assíncronas
✅ **Context para estado global** - Use para dados compartilhados entre telas

---

## 📦 DEPENDÊNCIAS QUE VOCÊ VAI PRECISAR

```json
{
  "expo": "~54.0.0",
  "expo-camera": "~14.0.0",
  "expo-location": "~16.0.0",
  "react-native-maps": "~1.7.0",
  "axios": "^1.6.0",
  "@react-navigation/native": "^6.0.0",
  "@react-navigation/bottom-tabs": "^6.0.0",
  "react-native-gesture-handler": "~2.14.0",
  "react-native-screen": "~4.0.0",
  "react-native-sqlite-storage": "^6.0.0",
  "@react-native-async-storage/async-storage": "^1.21.0"
}
```

---

Agora você tem um mapa completo do projeto! 🎯
