import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

// 도메인별 클라이언트 관리
const domains = new Map<string, Set<WebSocket>>();

wss.on('connection', (ws) => {
  let clientDomain: string;

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    
    if (data.type === 'join') {
      clientDomain = data.domain;
      if (!domains.has(clientDomain)) {
        domains.set(clientDomain, new Set());
      }
      domains.get(clientDomain)!.add(ws);
    }
    
    // 같은 도메인의 다른 클라이언트들에게 메시지 전달
    if (clientDomain) {
      domains.get(clientDomain)!.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }
  });

  ws.on('close', () => {
    if (clientDomain) {
      domains.get(clientDomain)?.delete(ws);
    }
  });
}); 