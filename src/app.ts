import { Config, accounts, Streamer, streamers as configStreamers} from "./config/config";
import axios from "axios";
import tmi from "tmi.js";
import { Logger } from "./logger/Logger";

const logger = new Logger();
const clients: Array<tmi.Client> = [];
const streamers: Array<Streamer> = configStreamers.slice(0);

let expire = 0;
let currentToken = "";

const login = async (): Promise<string> => {
    const current = Date.now() / 1000;

    if (expire - current <= 0){
        const response = await axios.post(Config.auth.url, new URLSearchParams({
            client_id: Config.auth.clientId,
            client_secret: Config.auth.secret,
            grant_type: Config.auth.grant_type
        }));
    
        expire = current + response.data.expires_in;
        currentToken = response.data.access_token;

        return response.data.access_token;
    }

    return currentToken;
};

const checkStreamerIsLive = async(channel: {userId: number;}): Promise<boolean> => {
    logger.info(`Checking ${channel.userId} Stream Status...`);
    
    const access_token = await login();

    const response = await axios.get(Config.tracker.url, {
        params: {
            user_id: channel.userId
        },
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Client-Id": Config.auth.clientId,
            "Content-Type": "application/json;charset=UTF-8"
        }
    });

    return response.data.data.length === 0? false: true;
};

const initAccounts = (): void => {
    logger.info("Initializing Accounts...");
    for (let i=0; i < accounts.length; i++){
        try{
            const client = new tmi.Client({
                options: {
                    debug: false
                },
                identity: {
                    username: accounts[i].username,
                    password: `oauth:${accounts[i].token}`
                },
                channels: []
            });

            client.connect().catch(err => logger.error(`${err} - ${accounts[i].username}`));
            client.on("connected", (host: string, port: number) => {
                logger.info(`${accounts[i].username}: ready`, host, port);
                clients.push(client);
            });
        }catch(err){
            logger.error(err);
        }
    }
};

const mainLoop = () => {
    logger.info("Start Loop...");
    initAccounts();
    setInterval(async () => {
        for(let i=0; i < streamers.length; i++){
            const isLive = await checkStreamerIsLive({userId: streamers[i].userId});

            if (isLive && !streamers[i].live){
                for (let j=0; j < clients.length; j++){
                    clients[j].join(streamers[i].username);
                    logger.info(`Connected to ${streamers[i].username}`);
                }
            }

            if (!isLive && streamers[i].live){
                for (let j=0; j < clients.length; j++){
                    clients[j].part(streamers[i].username);
                    logger.info(`Disconnected from ${streamers[i].username}`);
                }
            }

            streamers[i].live = isLive;
        }
    }, Config.loop.time);
}

mainLoop();
