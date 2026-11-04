from fastapi import FastAPI

app = FastAPI(title="API de Clientes", version="1.0")

@app.get("/api/clients")
def get_clients():
    return []