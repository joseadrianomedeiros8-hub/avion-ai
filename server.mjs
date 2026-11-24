import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", (_req, res) => {
  res.json({ ok: true, configured: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/chat", async (req, res) => {
  try {
    const key = process.env.OPENAI_API_KEY;
    if (!key) return res.status(503).json({ error: "A IA ainda não foi configurada pelo administrador." });
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const input = messages.slice(-20).map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || "").slice(0, 12000)
    }));
    if (!input.length || !input.some(m => m.role === "user")) {
      return res.status(400).json({ error: "Escreva uma mensagem primeiro." });
    }
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5",
        instructions: "Você é a AVION AI, uma assistente útil, clara e amigável. Responda em português quando o usuário escrever em português.",
        input
      })
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || "A API não conseguiu responder." });
    }
    const answer = (data.output || []).flatMap(item => item.content || [])
      .filter(part => part.type === "output_text")
      .map(part => part.text).join("\n").trim();
    res.json({ answer: answer || "Não consegui gerar uma resposta. Tente novamente." });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor. Tente novamente." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log(`AVION AI rodando na porta ${port}`));
