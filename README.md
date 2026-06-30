# PlantMap AI

Aplicativo mobile de identificação, mapeamento e monitoramento de plantas, desenvolvido em React Native com Expo. O PlantMap AI permite que o usuário fotografe uma planta, descubra qual é, detecte possíveis doenças e registre onde a encontrou em um mapa.

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Telas e Componentes](#telas-e-componentes)
- [Dados e Banco Local](#dados-e-banco-local)
- [Integrações de API](#integrações-de-api)
- [Paleta de Cores](#paleta-de-cores)
- [Como Executar](#como-executar)
- [Scripts Disponíveis](#scripts-disponíveis)

## Sobre o Projeto

O PlantMap AI é um aplicativo mobile voltado para o público brasileiro que deseja conhecer e cuidar das plantas ao seu redor. A proposta é simples: o usuário aponta a câmera para uma folha, flor ou árvore, o app identifica a espécie por inteligência artificial, verifica se há sinais de doença e permite registrar a planta com foto e localização em um mapa.

Cada planta registrada vira um ponto no mapa e entra no feed e no histórico do usuário, formando uma coleção pessoal da natureza explorada. O aplicativo conta com uma interface amigável, com identidade visual verde e em português do Brasil.

## Funcionalidades

- Telas de onboarding (boas-vindas) exibidas apenas na primeira abertura do app
- Identificação de plantas por foto usando a API da Pl@ntNet (nome popular, nome científico e confiança)
- Detecção de doenças e estado de saúde da planta usando a API da Plant.id
- Captura de foto pela câmera ou seleção pela galeria
- Registro automático da localização (GPS) da planta para aparecer no mapa
- Mapa interativo com marcadores das plantas registradas
- Registro manual de plantas no mapa por toque longo, busca de endereço (geocodificação) ou "Registrar aqui"
- Feed da comunidade com as plantas publicadas
- Histórico com estatísticas (plantas mapeadas e plantas saudáveis)
- Tela de perfil do usuário
- Persistência local das plantas em banco SQLite e das fotos no armazenamento do app
- Barra de navegação inferior com abas: Home, Mapa, Câmera, Histórico e Perfil

## Tecnologias Utilizadas

| Tecnologia                                | Versão  | Finalidade                                |
| ----------------------------------------- | ------- | ----------------------------------------- |
| React Native                              | 0.81.5  | Framework principal mobile                |
| Expo                                      | 54.0.34 | Toolchain e build system                  |
| React                                     | 19.1.0  | Biblioteca de UI                          |
| TypeScript                                | 5.9.2   | Tipagem estática                          |
| React Navigation (Native)                 | 7.2.5   | Navegação entre telas                     |
| React Navigation (Native Stack)           | 7.16.0  | Stack Navigator                           |
| React Navigation (Bottom Tabs)            | 7.16.2  | Navegação por abas                        |
| react-native-maps                         | 1.20.1  | Mapa e marcadores                         |
| expo-camera                               | 17.0.10 | Acesso à câmera                           |
| expo-image-picker                         | 17.0.11 | Seleção de imagens da galeria             |
| expo-location                             | 19.0.8  | GPS e geocodificação                      |
| expo-sqlite                               | 16.0.10 | Banco de dados local                      |
| expo-file-system                          | 19.0.23 | Armazenamento permanente das fotos        |
| @react-native-async-storage/async-storage | 2.2.0   | Persistência de preferências (onboarding) |
| axios                                     | 1.18.0  | Requisições HTTP às APIs de plantas       |
| react-native-safe-area-context            | 5.6.0   | Áreas seguras de tela                     |
| react-native-screens                      | 4.16.0  | Otimização de telas nativas               |

## Estrutura do Projeto

```
PlantMap/
├── App.tsx                       # Inicializa o banco, decide a rota inicial e monta os providers
├── index.ts                      # Ponto de entrada — registra o App com o Expo
├── src/
│   ├── components/
│   │   └── PlantCard.tsx          # Card de planta exibido no feed
│   ├── context/
│   │   └── PlantContext.tsx       # Estado global das plantas (lista e adição)
│   ├── database/
│   │   └── squilite.tsx           # Configuração do SQLite e criação das tabelas
│   ├── hooks/
│   │   ├── useCamera.tsx          # Lógica de câmera e galeria
│   │   └── usePlantAnalysis.tsx   # Orquestra a análise da planta (identificação + doença)
│   ├── navegation/
│   │   ├── RootNavigator.tsx      # Stack principal (onboarding → app)
│   │   ├── MainTabs.tsx           # Navegação por abas (Home, Mapa, Câmera, Histórico, Perfil)
│   │   └── types.ts               # Tipos das rotas
│   ├── screens/
│   │   ├── WelcomeScreen/          # Boas-vindas (onboarding 1)
│   │   ├── OnboardingScreen/       # Onboarding 2
│   │   ├── ThirdonboardingScreen/  # Onboarding 3
│   │   ├── HomeScreeen/            # Feed da comunidade
│   │   ├── MapScreen/              # Mapa com as plantas registradas
│   │   ├── CameraScreen/           # Câmera + análise da planta
│   │   ├── HistoryScreen/          # Histórico e estatísticas
│   │   └── ProfileScreen/          # Perfil do usuário
│   ├── services/
│   │   ├── plantnetService.ts      # Identificação de plantas (Pl@ntNet)
│   │   ├── plantidService.ts       # Detecção de doenças (Plant.id)
│   │   ├── plantAnalysisService.ts # Combina as duas APIs em um único resultado
│   │   ├── plantService.ts         # CRUD de plantas no SQLite
│   │   ├── locationService.ts      # GPS, geocodificação e reverse geocoding
│   │   ├── imageStorage.ts         # Salva/remove as fotos na pasta do app
│   │   ├── storageService.ts       # Flag de onboarding (AsyncStorage)
│   │   └── likeService.ts          # Curtidas das plantas
│   └── style/
│       └── colors.ts               # Paleta de cores do app
├── assets/                         # Imagens, ícones e logo do app
├── tsconfig.json                   # Configuração TypeScript (modo strict, base Expo)
└── package.json                    # Dependências e scripts
```

## Telas e Componentes

### 1. Onboarding — Boas-vindas

Arquivos: `screens/WelcomeScreen`, `screens/OnboardingScreen`, `screens/ThirdonboardingScreen`

Três telas de apresentação exibidas sobre um gradiente verde, mostrando as propostas do app (Identificar, Verificar saúde e Mapear). Ao concluir, uma flag é gravada no AsyncStorage para que o onboarding não apareça novamente — nas próximas aberturas o app vai direto para a Home.

### 2. Home — Feed da Comunidade

Arquivo: `screens/HomeScreeen/HomeScreen.tsx`

Tela principal do app. Apresenta o cabeçalho com a marca, uma citação de destaque e o feed com as plantas registradas pelo usuário somadas a publicações de exemplo da comunidade.

Elementos da tela:

- Cabeçalho com logo, marca e atalhos de notificações/perfil
- Card de citação motivacional
- Feed em lista de `PlantCard`, cada um com foto, autor, local, nome da planta, confiança da identificação e status de saúde
- Barra de navegação inferior

### 3. Map — Mapa de Plantas

Arquivo: `screens/MapScreen/MapScreen.tsx`

Exibe um mapa (`react-native-maps`) com marcadores para todas as plantas que possuem coordenadas registradas.

Elementos da tela:

- Mapa centralizado na localização atual do usuário (ou em um ponto padrão)
- Marcadores das plantas; ao tocar, abre um modal com foto, nome, local, data e doença
- Botão "Registrar aqui" para cadastrar uma planta na localização atual
- Botão para recentralizar o mapa na sua posição
- Formulário de registro com local (obrigatório), foto da galeria, nome e doença opcional

Lógica de registro:

- O ponto pode vir de um toque longo no mapa, da localização atual ("Registrar aqui") ou de um endereço buscado (geocodificação)
- "Registrar aqui" tenta preencher o campo de local automaticamente via reverse geocoding
- Local, nome e foto são obrigatórios para salvar o ponto

### 4. Camera — Identificação por Foto

Arquivo: `screens/CameraScreen/CameraScreen.tsx`

Permite capturar (ou escolher da galeria) a foto de uma planta e analisá-la por IA.

Elementos da tela:

- Câmera ao vivo com botões de disparo, troca de câmera e galeria
- Pré-visualização da foto com a opção de refazer ou analisar
- Resultado da análise: nome popular, nome científico, confiança e estado de saúde/doença
- Botão "Postar no feed" que salva a planta (com o GPS atual) no banco e no feed

### 5. History — Histórico e Estatísticas

Arquivo: `screens/HistoryScreen/HistoryScreen.tsx`

Lista todas as plantas registradas pelo usuário, com estatísticas de total mapeado e plantas saudáveis.

Elementos da tela:

- Cabeçalho com a marca e atalhos
- Card de estatísticas (plantas mapeadas e plantas saudáveis)
- Lista de plantas com miniatura, nome, nome científico, local e indicador de saúde
- Estado vazio quando nenhuma planta foi registrada

### 6. Profile — Perfil do Usuário

Arquivo: `screens/ProfileScreen/ProfileScreen.tsx`

Exibe os dados do usuário (nome, username, bio), estatísticas de uso e os últimos registros realizados.

## Dados e Banco Local

Arquivo: `database/squilite.tsx`

Os dados são persistidos localmente em um banco **SQLite** (`expo-sqlite`), criado na primeira execução com controle de versão de schema. As fotos das plantas são copiadas do cache temporário para a pasta de documentos do app (`imageStorage.ts`), garantindo que continuem válidas após fechar o aplicativo.

Tabelas principais:

```text
users        # usuário local (semente com id = 1)
plants       # plantas identificadas (nome, nome científico, foto, confiança, doença)
locations    # coordenadas de cada planta para o mapa
statistics   # registros de análises realizadas
likes        # curtidas (relação planta/usuário)
comments     # comentários das plantas
```

Estrutura simplificada de uma planta gravada:

```text
plants {
  id: INTEGER PRIMARY KEY
  user_id: INTEGER
  plant_name: TEXT
  scientific_name: TEXT
  image_uri: TEXT
  confidence: REAL
  disease: TEXT
  notes: TEXT
  created_at: TEXT
}
```

## Integrações de API

O app combina duas APIs externas para analisar cada foto (em paralelo, tolerando falha de uma delas):

| Serviço | API | Retorno |
| --- | --- | --- |
| `plantnetService.ts` | Pl@ntNet | Nome popular, nome científico e confiança da identificação |
| `plantidService.ts` | Plant.id | Se é planta, estado de saúde, doença e confiança da doença |

O `plantAnalysisService.ts` une os dois resultados em um único objeto `PlantAnalysis`, usado pela câmera para exibir o resultado e publicar a planta.

> As chaves de API estão embutidas nos serviços apenas para fins acadêmicos/demonstração. Em produção, mova-as para variáveis de ambiente.

## Paleta de Cores

| Nome | Hex | Uso |
| --- | --- | --- |
| Verde Escuro (topo) | `#3F7159` | Gradiente das telas de onboarding |
| Verde Escuro (base) | `#172D22` | Gradiente, textos sobre fundo claro |
| Verde Forte | `#2E9E5B` | Acentos, ícones, abas ativas |
| Verde Destaque | `#7FE3A1` | Indicadores, botões |
| Verde Botão | `#8FE0A8` | Botões primários |
| Branco | `#FFFFFF` | Fundos de tela e cards |
| Verde Claro (chip) | `#EEF4EF` | Chips e placeholders |
| Cinza Texto | `#6B7B72` | Textos secundários |
| Cinza Suave | `#9AA8A0` | Abas inativas e textos discretos |

## Como Executar

### Pré-requisitos

- Node.js (versão LTS recomendada)
- Expo CLI (pode ser usado via `npx`)
- Aplicativo Expo Go no celular (iOS ou Android) para teste em dispositivo físico
- Emulador Android ou simulador iOS configurado (opcional)

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd PlantMap

# Instale as dependências
npm install
```

### Executando o Projeto

```bash
# Inicia o servidor de desenvolvimento
npm start

# Ou diretamente via Expo
npx expo start
```

Após iniciar, escaneie o QR Code com o aplicativo Expo Go (Android) ou com a câmera do iPhone (iOS).

> A câmera, o GPS e a identificação por IA dependem de recursos nativos e de internet — recomenda-se testar em um dispositivo físico com Expo Go.

## Scripts Disponíveis

| Script | Comando | Descrição |
| --- | --- | --- |
| start | `expo start` | Inicia o servidor de desenvolvimento |
| android | `expo start --android` | Executa no emulador/dispositivo Android |
| ios | `expo start --ios` | Executa no simulador/dispositivo iOS |
| web | `expo start --web` | Executa na versão web do app |

## Autores

Mayara Rodrigues Pereira — Desenvolvido para o PlantMap AI

Desenvolvido com React Native
