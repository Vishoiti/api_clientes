# Painel de Clientes

Projeto acadêmico full stack desenvolvido a partir de conceitos vistos em aula e evoluído por mim, com commits acompanhando o aprendizado passo a passo.

A aplicação tem um back-end em Python que expõe uma API REST de clientes e um front-end em React que consome essa API, além de uma segunda aba que consome uma API pública externa.

## Tecnologias

**Back-end**
- Python
- FastAPI
- Pydantic (validação de dados)
- Uvicorn (servidor)

**Front-end**
- React
- TypeScript
- Vite
- Tailwind CSS

## Funcionalidades

- Listar, cadastrar e excluir clientes pela API Python
- Consumir uma API externa pública (JSONPlaceholder) em uma segunda aba
- Validação dos dados no back-end e configuração de CORS

## Minhas contribuições além do projeto base

- Criei a rota `DELETE` no back-end, que não existia
- Corrigi o bug de ids duplicados após a exclusão de clientes
- O front só remove o cliente da tela quando a API confirma a exclusão

## Como rodar

### Pré-requisitos
- Python 3
- Node.js (versão LTS)

### 1. Back-end
```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate   # Windows (Git Bash). No Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 5000
```
A API fica em `http://localhost:5000` e a documentação automática em `http://localhost:5000/docs`.

### 2. Front-end
Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```
O front fica em `http://localhost:5173`.

> Se o `npm install` acusar conflito de dependências (`ERESOLVE`), use `npm install --legacy-peer-deps`.

## Observação
Os clientes ficam guardados em uma lista em memória, então os dados são perdidos quando o servidor reinicia.