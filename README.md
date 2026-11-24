# AVION AI

Aplicativo web de chat com servidor Node.js e OpenAI Responses API.

## Publicar no Render

1. Crie um repositório GitHub chamado `avion-ai`.
2. Extraia o ZIP e envie **o conteúdo da pasta** para a raiz do repositório (não envie o ZIP fechado).
3. No Render: New > Web Service > conecte o repositório `avion-ai`.
4. Configure:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Em Environment, adicione `OPENAI_API_KEY` com sua chave secreta. Opcional: `OPENAI_MODEL` com `gpt-5`.
6. Clique em Deploy.

A chave da API deve ficar somente nas variáveis de ambiente do Render. Nunca coloque a chave em `public/index.html`, GitHub ou mensagens.

## Observações importantes

Esta primeira versão fornece chat real via API e mantém as conversas somente na memória da página enquanto ela está aberta. Ainda não inclui cadastro/login, banco de dados persistente nem cobrança/assinaturas. Esses recursos exigem configurar um banco de dados e credenciais do provedor de pagamentos (por exemplo, Mercado Pago); não informe senha bancária ou chave privada em chats.
