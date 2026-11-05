from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API de Clientes", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ClienteCreate(BaseModel):
    nome: str
    email: str
    telefone: str = ""
    empresa: str = ""

class Cliente(ClienteCreate):
    id: int
    active: bool = True

clients_db: list[Cliente] = []

@app.get("/api/clients", response_model=list[Cliente])
def get_clients():
    return clients_db

@app.post("/api/clients", response_model=Cliente, status_code=201)
def add_client(client: ClienteCreate):
    novo_id = len(clients_db) + 1

    novo_cliente = Cliente(
        id=novo_id,
        nome=client.nome,
        email=client.email,
        telefone=client.telefone,
        empresa=client.empresa,
        active=True
    )
    clients_db.append(novo_cliente)
    return novo_cliente

@app.delete("/api/clients/{client_id}", status_code=204)
def delete_client(client_id: int):
    for cliente in clients_db:
        if cliente.id == client_id:
            clients_db.remove(cliente)
            return
    raise HTTPException(status_code=404, detail="Cliente não encontrado")