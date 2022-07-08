export type Account = {
    username: string;
    token: string;
}
export type Streamer = {
    userId: number;
    username: string;
    live: boolean;
}

export const Config = {
    tracker: {
        url: "https://api.twitch.tv/helix/streams" 
    },
    auth: {
        url: "https://id.twitch.tv/oauth2/token",
        secret: "d2rsxz483xlq5525hsfowy7lyh8mcf",
        clientId: "thmz9p6qo7mzwdnbfsm28spmbl8v95",
        grant_type: "client_credentials",
    },

    loop: {
        time: 5 * 60 * 1000
    }
}

export const streamers: Array<Streamer> = [
    {
        userId: 72550899,
        username: "roshtein",
        live: false
    },
    {
        userId: 547554019,
        username: "deuceace",
        live: false
    },
    {
        userId: 638511570,
        username: "vondice",
        live: false
    },
    {
        userId: 71190292,
        username: "trainwreckstv",
        live: false
    },
    {
        userId: 694037165,
        username: "frankdimes",
        live: false
    },
    {
        userId: 402991688,
        username: "classybeef",
        live: false
    }
];


export const accounts: Array<Account> = [
    {
        username: "typehunter11",
        token: "qr81cgunfgcftcki5hk4qofgwc49to",
    },
    // {
    //     username: "iamjustatoxicguy",
    //     token: "pulqkeqresuuj5b6bbt9mogivwaclp",
    // },
    // {
    //     username: "solidhunter11",
    //     token: "0vutz1qz3c6bzuaxhc1j9vkbtllvpo",
    // },
    // {
    //     username: "TheBearFearerer",
    //     token: "ux9yb8oounfbt7tzumv43awedvkbap",
    // },
    // {
    //     username: "topicdiscover",
    //     token: "ft91l0kaj4iy3jhlxj606ampdg9h0s",
    // },
    // {
    //     username: "batmanbeginspinecone",
    //     token: "bdfsqux706n8g8rhxs0gzi79yndjsk",
    // },
    // {
    //     username: "gymnasticsranleoiran",
    //     token: "rwh1fpuk0ipbsv4lid4xkx4wrxsxbk",
    // },
    // {
    //     username: "thegodfathercrackers",
    //     token: "xyzk0hyghimy1v4norxbwhki20ddg9",
    // },
    // {
    //     username: "cityofgodlightning",
    //     token: "llvteekqfsm9guf5vadowsil5239v5",
    // },
    // {
    //     username: "hyposwasp",
    //     token: "g7bdu51319a8hakd46mdinbuiit6q2",
    // },
    // {
    //     username: "smokepurp00",
    //     token: "alwdmo4ua2gmrbnnak5kfnca8mzo26",
    // },
    // {
    //     username: "lospista",
    //     token: "b7f643duqvjz31iw8dhxsw6oy977mb",
    // },
    // {
    //     username: "VRGMRC",
    //     token: "sz2cr8izoyab3gx4b4h5o1t2xegn6q",
    // },
    // {
    //     username: "TeTrisKkK",
    //     token: "91qnnp0m7ii34rgm71tnxgyf5zpxmw",
    // },
    // {
    //     username: "petichef",
    //     token: "m7x05sa58mg0u7qhcjfvj5iyw7t921",
    // },
    // {
    //     username: "bw3n",
    //     token: "s8am92z1aj98v4b6vffw3ehyutb7e9",
    // }
];