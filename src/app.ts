import { Config, accounts } from "./config/config";
import axios from "axios";
import tmi from "tmi.js";
import { Logger } from "./logger/Logger";

const logger = new Logger();
const clients: Array<tmi.Client> = [];
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


const checkRoshIsLive = async (): Promise<boolean> => {
    logger.info("Checking stream status...");
    const access_token = await login();

    const response = await axios.get(Config.rosh.url, {
        params: {
            user_id: Config.rosh.userId
        },
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Client-Id": Config.auth.clientId,
            "Content-Type": "application/json;charset=UTF-8"
        }
    });
    if (response.data.data.length === 0)
        return false;
    
    return response.data.data[0].type === "live";
};

const initAndConnectAccounts = (): void => {
    logger.info("Rosh started streaming...");
    logger.info("Connecting accounts...");
    for (let i =0; i < accounts.length; i++){
        try{
            const client = new tmi.Client({
                options: {
                    debug: false
                },
                identity: {
                    username: accounts[i].username,
                    password: `oauth:${accounts[i].token}`,
                },
                channels: accounts[i].channels
            });

            client.connect().catch(error => logger.error(`${error} - ${accounts[i].username}`));

            client.on("connected", (a: string, b: number) => {
                logger.info(`${accounts[i].username}: ready`, a, b);

                clients.push(client);
            })
        }catch(err){
            logger.error(err);
        }
    }
};

const destroyAccounts = (): void => {
    logger.info("Rosh went offline.");
    logger.info("Start disconnecting accounts...");
    for (let i=0; i < clients.length; i++){
        clients[i].disconnect();

        clients.splice(i, 1);
    }

    logger.info("Accounts have been disconnected");
};

const startLoop = (): void => {
    logger.info("Starting loop...");
    setInterval(async () => {
        const live = await checkRoshIsLive();

        if (live){
            if (clients.length === 0){
                initAndConnectAccounts();
            }
        }else{
            if (clients.length !== 0){
                destroyAccounts();
            }
        }
    }, Config.loop.time);
};


startLoop();

