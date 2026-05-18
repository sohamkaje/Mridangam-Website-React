"""
OllamaFreeAPI proxy for the Mridangam website (from github.com/mfoud444/ollamafreeapi server.py).
Run via: npm run dev (scripts/run_dev.py) or python scripts/ollamafree-proxy.py
"""
import json
import os
import sys
import time
import uuid

try:
    import uvicorn
    from fastapi import FastAPI, HTTPException
    from fastapi.responses import JSONResponse, StreamingResponse
    from pydantic import BaseModel, Field
    from ollamafreeapi import OllamaFreeAPI
except ImportError:
    print(
        "\n[ollamafree] Missing Python packages. Install with:\n"
        "  pip install -r scripts/requirements-ai.txt\n",
        file=sys.stderr,
    )
    sys.exit(1)

DEFAULT_MODEL = os.getenv("DEFAULT_MODEL", "llama3.2:3b")
HOST = os.getenv("OLLAMAFREE_HOST", "127.0.0.1")
PORT = int(os.getenv("OLLAMAFREE_PORT", "8000"))

app = FastAPI(title="OllamaFree Proxy (Mridangam site)")
client = OllamaFreeAPI()


class Message(BaseModel):
    role: str
    content: str


class ChatCompletionRequest(BaseModel):
    model: str | None = None
    messages: list[Message]
    stream: bool | None = False
    temperature: float | None = 0.7


@app.get("/health")
async def health_check():
    return {"status": "ok", "timestamp": time.time()}


@app.get("/models")
async def list_models_simple():
    models = client.list_models()
    return {"models": models, "default_model": DEFAULT_MODEL, "total_models": len(models)}


@app.get("/config")
async def get_config():
    models = client.list_models()
    return {
        "default_model": DEFAULT_MODEL,
        "host": HOST,
        "port": PORT,
        "available_models": models,
        "model_count": len(models),
    }


@app.post("/v1/chat/completions")
async def chat_completions(request: ChatCompletionRequest):
    request_id = f"chatcmpl-{uuid.uuid4().hex[:8]}"
    model = request.model or DEFAULT_MODEL
    user_messages = [m.content for m in request.messages if m.role == "user"]
    if not user_messages:
        raise HTTPException(status_code=400, detail="No user message found")
    prompt = user_messages[-1]

    try:
        if request.stream:
            def stream_wrapper():
                for chunk in client.stream_chat(prompt, model=model):
                    data = {
                        "id": request_id,
                        "object": "chat.completion.chunk",
                        "choices": [{"index": 0, "delta": {"content": chunk}, "finish_reason": None}],
                    }
                    yield f"data: {json.dumps(data)}\n\n"
                yield "data: [DONE]\n\n"

            return StreamingResponse(stream_wrapper(), media_type="text/event-stream")

        full_response = ""
        for chunk in client.stream_chat(prompt, model=model):
            full_response += chunk
        return JSONResponse(
            content={
                "id": request_id,
                "object": "chat.completion",
                "model": model,
                "choices": [
                    {
                        "index": 0,
                        "message": {"role": "assistant", "content": full_response},
                        "finish_reason": "stop",
                    }
                ],
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


if __name__ == "__main__":
    print(f"[ollamafree] Proxy ready at http://{HOST}:{PORT} (default model: {DEFAULT_MODEL})")
    uvicorn.run(app, host=HOST, port=PORT, reload=False)
