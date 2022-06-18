import { Config, accounts } from "./config/config";
import axios from "axios";
import tmi from "tmi.js";

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
    console.log("[\x1b[36mACTION\x1b[0m]: Checking stream status...");
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
    console.log("[\x1b[36mDETECTED\x1b[0m]: Rosh started streaming...");
    console.log("[\x1b[36mACTION\x1b[0m]: Connecting accounts...");
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

            client.connect().catch(error => console.log(`${error} - ${accounts[i].username}`));

            client.on("connected", (a: string, b: number) => {
                console.log(`${accounts[i].username}: ready`, a, b);

                clients.push(client);
            })
        }catch(err){
            console.log(err);
        }
    }
};

const destroyAccounts = (): void => {
    console.log("[\x1b[36mDETECTED\x1b[0m]: Rosh went offline.")
    console.log("[\x1b[36mACTION\x1b[0m]: Start disconnecting accounts...");
    for (let i=0; i < clients.length; i++){
        clients[i].disconnect();

        clients.splice(i, 1);
    }

    console.log("Accounts have been disconnected");
};

const startLoop = (): void => {
    console.log("[\x1b[36mACTION\x1b[0m]: Starting loop...");
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

