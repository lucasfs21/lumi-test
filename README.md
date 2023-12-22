# Backend
O backend foi criado em node
## Dependencies
    "@prisma/client": "^5.7.1",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "pdfreader": "^1.2.14"

## Port Allocation
`3001`
    
## Routes
  `/getData/:numeroCliente` Responsável por trazer os dados de todas as contas de luz de um cliente. O parâmetro "numeroCliente" é utilizado para trazer os dados apenas do cliente selecionado.
  
  `/getPdf/` Responsável por trazer a visualização do pdf (conta de luz) do usuário selecionado. O parâmetros "pdf" contém o path de onde o PDF é salvo.

## Leitura do PDF e gravação de dados no Postgree
Toda a leitura e gração dos dados que estão em pdf são feitos através do "pdf-parser". Para inicializá-lo é necessário rodar o comando `node index.js` com o path da pasta "faturas" como argumento.

##Obs:
É necessário ter um arquivo ".env" com as variáveis de ambientes correspondentes à conexão com o banco de dados.

# Frontend
O frontend foi criado em node, utilizando o framework React.js
## Dependencies
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.15.1",
    "@mui/material": "^5.15.1",
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "recharts": "^2.10.3",
    "styled-components": "^6.1.2"
    
## Port Allocation
`3000`
