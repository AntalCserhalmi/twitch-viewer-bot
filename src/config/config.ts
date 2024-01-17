interface IAccount{
    username: string;
    token: string;
    channels: Array<string>;
} 

export const Config = {

    rosh: {
        url: "https://api.twitch.tv/helix/streams",
        userId: 72550899
    },
    auth: {
        url: "https://id.twitch.tv/oauth2/token",
        secret: "",
        clientId: "",
        grant_type: "client_credentials",
    },

    loop: {
        time: 5 * 60 * 1000
    }
}

export const accounts: Array<IAccount> = [
    {
        username: "iamjustatoxicguy",
        token: "",
        channels: []
    }
];
