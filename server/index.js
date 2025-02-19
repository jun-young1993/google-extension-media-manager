"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var wss = new ws_1.default.Server({ port: 8080 });
// 도메인별 클라이언트 관리
var domains = new Map();
wss.on('connection', function (ws) {
    var clientDomain;
    ws.on('message', function (message) {
        var data = JSON.parse(message.toString());
        if (data.type === 'join') {
            clientDomain = data.domain;
            if (!domains.has(clientDomain)) {
                domains.set(clientDomain, new Set());
            }
            domains.get(clientDomain).add(ws);
        }
        // 같은 도메인의 다른 클라이언트들에게 메시지 전달
        if (clientDomain) {
            domains.get(clientDomain).forEach(function (client) {
                if (client !== ws && client.readyState === ws_1.default.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        }
    });
    ws.on('close', function () {
        var _a;
        if (clientDomain) {
            (_a = domains.get(clientDomain)) === null || _a === void 0 ? void 0 : _a.delete(ws);
        }
    });
});
