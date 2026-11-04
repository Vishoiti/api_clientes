from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="API de Clientes", version="1.0")


class ClienteCreate(BaseModel):
    nome: str
    email: str
    telefone: str = ""
    empresa: str = ""

class Cliente(ClienteCreate):
    id: int
    active: bool = True

clients_db: list[Cliente] = []

@app.get("/api/clients")
def get_clients():
    return []

@app.post("/api/clients", response_model=Cliente, status_code=201)
def add_client(client: ClienteCreate):
    novo_id = max((c.id for c in clients_db), default = 0) + 1
    novo_cliente = Cliente(id = novo_id, **client.model_dump())
    clients_db.append(novo_cliente)
    return novo_cliente