const Eris = require("eris");
const keep_alive = require('./keep_alive.js');

// Token do seu usuário pessoal (não bot)
const user = new Eris(process.env.token);

user.on("ready", () => {
    console.log(`✅ Conectado como: ${user.user.username}`);
    console.log(`📊 Status definido como: Indisponível`);
    
    // Definir status como "Indisponível" (dnd)
    user.editStatus("dnd", {
        name: "Online 24/7",
        type: 3 // WATCHING
    });
});

user.on("error", (err) => {
    console.error("❌ Erro:", err);
});

user.on("disconnect", () => {
    console.log("🔌 Desconectado... Reconectando...");
});

user.on("reconnecting", () => {
    console.log("🔄 Reconectando...");
});

// Reconexão automática
user.connect();

// Atualizar status periodicamente para evitar timeout
setInterval(() => {
    if (user.ready) {
        user.editStatus("dnd", {
            name: "Online 24/7",
            type: 3
        });
        console.log(`❤️ Status renovado: ${new Date().toLocaleTimeString()}`);
    }
}, 60000); // A cada 1 minuto

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('🛑 Desligando...');
    user.disconnect();
    process.exit(0);
});
