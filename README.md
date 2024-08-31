# Water Gas Measurement API

Este projeto é uma API para gerenciar medições de água e gás, permitindo o upload de arquivos de
medição, a confirmação de medidas e a listagem de medições por código de cliente. A API foi construída
utilizando Node.js, Express e MongoDB, com suporte para integração com a API Gemini para análise de imagens.

## Funcionalidades

- **Upload de Medições:** Permite o upload de arquivos de medição.
- **Confirmação de Medições:** Confirma a precisão e a integridade das medições enviadas.
- **Listagem de Medições:** Lista todas as medições associadas a um determinado código de cliente.

## Estrutura de Pastas

```plaintext
├── src
│   ├── config
│   │   └── db.ts                  # Configuração da conexão com o MongoDB
│   ├── controllers
│   │   └── measureController.ts   # Lógica para lidar com as rotas da API
│   ├── models
│   │   └── measureModel.ts        # Modelo de dados para medições
│   ├── routes
│   │   └── measureRoutes.ts       # Define as rotas da API
│   ├── utils
│   │   └── types.ts               # Tipos/Interfaces
│   │   └── validators.ts          # Validação de dados
│   ├── services
│   │   └── geminiService.ts       # Integração com a API Gemini para análise de imagens
│   ├── app.ts                     # Arquivo que configura o aplicativo Express
│   └── server.ts                  # Arquivo que inicializa o servidor Express
├── .env.example                   # Exemplos das variáveis de ambiente necessárias para o projeto
├── docker-compose.yml             # Arquivo para subir o ambiente Docker
├── Dockerfile                     # Dockerfile para construir a imagem da aplicação
└── README.md                      # Documentação do projeto
```

## Requisitos

Node.js v16 ou superior
Docker e Docker Compose
MongoDB (local ou hospedado)

## Instruções para Rodar o Projeto

### Clonar projeto:

```
    git clone https://github.com/Robsonnsbr/water-gas-measurement-api.git
```

### Abrir projeto:

```
    cd water-gas-measurement-api
```

# IMPORTANTE!

### 1. Configuração do Ambiente

Crie um arquivo .env na raiz do projeto e configure as seguinte variável de ambiente: _GEMINI_API_KEY=your_api_key_here_

As variáveis de ambiente MONGO_URI e BASE_URL_SERVICE já estão configuradas na raiz do projeto, eliminando a necessidade de configuração manual.
A chave MONGO_URI, embora sensível, foi incluída para facilitar a execução do projeto em ambiente de teste, com acesso limitado ao banco de dados.
Para maior segurança, você pode optar por usar um banco local, definindo MONGO_URI no arquivo .env ou diretamente ao subir o container.

### 2. Rodando com Docker

1 - Subir projeto utilizando Docker, siga os passos abaixo:
Sem arquivo .env criado e variável configurada.
Linux:

```
GEMINI_API_KEY="your_api_key_here"; docker-compose up --build
```

PowerShell

```
 $env:GEMINI_API_KEY="your_api_key_here"; docker-compose up --build
```

Com arquivo .env criado e variável configurada, conforme em (1. Configuração do Ambiente)

```
docker-compose up --build
```

2 - Acesse a API:
A API estará disponível: [http://localhost:3000/api](http://localhost:3000/api).

### 3. Rodando Localmente

Caso prefira rodar o projeto localmente sem Docker:

1 - Instale as dependências:

```
npm install
```

2 - Inicie o servidor:

```
npm run dev
```

Acesse a API:

3 - A API estará disponível: [http://localhost:3000/api](http://localhost:3000/api).

## Endpoints da API

- **GET** /api/:customer_code/list: Lista todas as medidas de um cliente específico.
- **POST** /api/upload: Faz o upload de um arquivo de medição.
- **PATCH** /api/confirm: Confirma uma medida.

## Exemplos de utilização

**Endpoint:** `POST /api/upload`
**Request Body:**

**IMPORTANTE!** O mimeType deve ser compativel com a imagem base64 informada, mimeType aceitos:
   'image/png' | 'image/jpeg' | 'image/webp' | 'image/heic' | 'image/heif'

```json
{
  "inlineData": {
    "data": "/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgL.....",
    "mimeType": "mimeType da imagem"
  },
  "customer_code": "your-customer_code-here ex: clienter123",
  "measure_datetime": "Date frontend ex: 2024-07-30T10:25:30Z",
  "measure_type": "informar o tipo ex: GAS/WATER"
}
```

**Endpoint:** `PATCH /api/confirm`
**Request Body:**

```json
{
  "measure_uuid": "UUID fornecido da leitura",
  "confirmed_value": "Dados retornados da api gemini"
}
```

**Endpoint:** `GET /api/Cliente2/list`
**Response**

```json
{
  "customer_code": "Cliente2",
  "measures": [
    {
      "_id": "66d380c6ab5a0dd19f1c81c9",
      "customer_code": "Cliente2",
      "measure_datetime": "2024-07-30T10:25:30.000Z",
      "measure_type": "WATER",
      "measure_value": "## Dados da conta de água:\n\n* **Consumo total:** 20 m³ \n* **Valor total:** 105,53\n* **Data de vencimento:** 10/10/2019\n* **Código do cliente:** 99999-9 \n",
      "measure_uuid": "3bfc30a8-ef9d-4cb4-bea4-25a6927bbc0e",
      "image_url": "http://localhost:3000/images/3bfc30a8-ef9d-4cb4-bea4-25a6927bbc0e",
      "has_confirmed": false,
      "__v": 0
    }
  ]
}
```
