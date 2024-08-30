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
│   └── types.ts                  # Types/interfaces
│   │   └── validators.ts         # Validação de dados
│   ├── services
│   │   └── geminiService.ts      # Integração com a API Gemini para análise de imagens
│   ├── app.ts                    # Arquivo que configura o aplicativo Express
│   └── server.ts                 # Arquivo que inicializa o servidor Express
├── .env.example                  # Exemplos das variáveis de ambiente necessárias para o projeto
├── docker-compose.yml            # Arquivo para subir o ambiente Docker
├── Dockerfile                    # Dockerfile para construir a imagem da aplicação
└── README.md                     # Documentação do projeto
```

## Requisitos

Node.js v16 ou superior
Docker e Docker Compose
MongoDB (local ou hospedado)

## Instruções para Rodar o Projeto

### Clonar projeto:
````
    git clone https://github.com/Robsonnsbr/water-gas-measurement-api.git
```` 
### Abrir projeto:   
````
    cd water-gas-measurement-api
````    
# IMPORTANTE!
### 1. Configuração do Ambiente
Crie um arquivo .env na raiz do projeto e configure as seguinte variável de ambiente: *GEMINI_API_KEY=your_api_key_here*

As variáveis de ambiente MONGO_URI e BASE_URL_SERVICE já estão configuradas na raiz do projeto, eliminando a necessidade de configuração manual.
A chave MONGO_URI, embora sensível, foi incluída para facilitar a execução do projeto em ambiente de teste, com acesso limitado ao banco de dados. 
Para maior segurança, você pode optar por usar um banco local, definindo MONGO_URI no arquivo .env ou diretamente ao subir o container.

### 2. Rodando com Docker

1 - Subir projeto utilizando Docker, siga os passos abaixo:
Sem arquivo .env criado e variável configurada.
Linux:
````
GEMINI_API_KEY="your_api_key_here"; docker-compose up --build 
````
PowerShell
````
 $env:GEMINI_API_KEY="your_api_key_here"; docker-compose up --build 
````

Com arquivo .env criado e variável configurada, conforme em (1. Configuração do Ambiente)
````
docker-compose up --build
````

2 - Acesse a API:
A API estará disponível: [http://localhost:3000/api](http://localhost:3000/api).

### 3. Rodando Localmente

Caso prefira rodar o projeto localmente sem Docker:

1 - Instale as dependências:
   ````  
   npm install
   ````
2 - Inicie o servidor:
  ````
  npm run dev
  ````
Acesse a API:

3 - A API estará disponível: [http://localhost:3000/api](http://localhost:3000/api).

## Endpoints da API

- **GET** /api/:customer_code/list: Lista todas as medidas de um cliente específico.
- **POST** /api/upload: Faz o upload de um arquivo de medição.
- **PATCH** /api/confirm: Confirma uma medida.
