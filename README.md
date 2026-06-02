# PlantMap AI – Identificador e Mapeador Inteligente de Plantas

## Visão Geral

O PlantMap AI é um aplicativo mobile desenvolvido para auxiliar na identificação, monitoramento e registro geográfico de plantas. O aplicativo utiliza a câmera do dispositivo para capturar imagens de plantas, integra APIs de inteligência artificial para identificar a espécie fotografada e detectar possíveis doenças, além de registrar automaticamente a localização onde a planta foi encontrada através do GPS do dispositivo.

A proposta é unir tecnologia, sustentabilidade e geolocalização em uma única plataforma, permitindo que estudantes, pesquisadores, produtores rurais e entusiastas da natureza criem um histórico digital das plantas encontradas em diferentes locais.

## Objetivos do Projeto

* Identificar automaticamente espécies de plantas através de fotografias.
* Detectar possíveis doenças ou anomalias presentes na planta.
* Registrar a localização exata onde a planta foi encontrada.
* Exibir todas as plantas registradas em um mapa interativo.
* Armazenar localmente o histórico de identificações realizadas pelo usuário.
* Criar uma ferramenta prática para catalogação e monitoramento da flora.

## Funcionamento do Aplicativo

### 1. Captura da Imagem

O usuário utiliza a câmera do celular para fotografar uma planta.

### 2. Identificação da Planta

A imagem é enviada para uma API de reconhecimento de plantas que retorna informações como:

* Nome popular;
* Nome científico;
* Família botânica;
* Descrição da espécie;
* Nível de confiança da identificação.

### 3. Diagnóstico de Doenças

A mesma imagem pode ser analisada por uma API especializada em doenças vegetais, retornando:

* Possível doença identificada;
* Grau de confiança da análise;
* Sintomas observados;
* Recomendações básicas de cuidado.

### 4. Registro da Localização

O aplicativo obtém automaticamente as coordenadas GPS do dispositivo no momento da captura da imagem.

### 5. Salvamento do Registro

Todas as informações são armazenadas localmente, incluindo:

* Foto da planta;
* Nome da espécie;
* Diagnóstico;
* Data da identificação;
* Latitude e longitude.

### 6. Visualização no Mapa

Cada planta cadastrada aparece como um marcador em um mapa interativo. Ao selecionar um marcador, o usuário poderá visualizar os detalhes completos do registro.

## Principais Funcionalidades

* Captura de fotos utilizando a câmera do dispositivo;
* Identificação automática de plantas;
* Diagnóstico de possíveis doenças;
* Geolocalização por GPS;
* Exibição de registros em mapa interativo;
* Histórico de plantas cadastradas;
* Consulta dos detalhes de cada registro;
* Armazenamento local das informações.

## Tecnologias Utilizadas

### Front-end Mobile

* React Native
* Expo

### Integrações

* Axios para consumo de APIs
* API de identificação de plantas
* API de diagnóstico de doenças vegetais

### Recursos do Dispositivo

* Expo Camera
* Expo Location

### Mapas

* React Native Maps

### Armazenamento Local

* AsyncStorage ou SQLite

## Requisitos da Disciplina Atendidos

O projeto contempla diversos conteúdos trabalhados na disciplina:

✅ Consumo de APIs utilizando Axios e JSON

✅ Persistência local utilizando AsyncStorage ou SQLite

✅ Utilização de GPS e integração com mapas

✅ Uso da câmera e captura de imagens

✅ Desenvolvimento de interface mobile funcional

## Público-Alvo

* Estudantes de biologia;
* Pesquisadores;
* Produtores rurais;
* Técnicos agrícolas;
* Entusiastas da natureza;
* Pessoas interessadas em catalogação ambiental.

## Diferencial do Projeto

O principal diferencial do PlantMap AI é a combinação entre identificação inteligente de plantas, diagnóstico de doenças e mapeamento geográfico dos registros. Além de reconhecer espécies vegetais, o aplicativo cria um banco de dados georreferenciado que permite visualizar onde cada planta foi encontrada, tornando a ferramenta útil para estudos ambientais, monitoramento da biodiversidade e acompanhamento da saúde vegetal.
