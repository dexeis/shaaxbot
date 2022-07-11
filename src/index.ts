import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { validateEnv } from "./utils/validateEnv";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";
import { endRaffleJob } from "./events/endRaffleJob"

(async ()=> {
    if (!validateEnv()) return;

    const BOT = new Client({
        intents: IntentOptions
    });

    BOT.on("ready", async () => await onReady(BOT));

    BOT.on('interactionCreate',
        async (interaction) => await onInteraction(interaction))

    await connectDatabase()

    await endRaffleJob()

    await BOT.login(process.env.BOT_TOKEN);
})();
