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
        secret: "d2rsxz483xlq5525hsfowy7lyh8mcf",
        clientId: "thmz9p6qo7mzwdnbfsm28spmbl8v95",
        grant_type: "client_credentials",
    },

    loop: {
        time: 5 * 60 * 1000
    }
}

export const accounts: Array<IAccount> = [
    {
        username: "typehunter11",
        token: "qr81cgunfgcftcki5hk4qofgwc49to",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "iamjustatoxicguy",
        token: "pulqkeqresuuj5b6bbt9mogivwaclp",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "solidhunter11",
        token: "0vutz1qz3c6bzuaxhc1j9vkbtllvpo",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "TheBearFearerer",
        token: "ux9yb8oounfbt7tzumv43awedvkbap",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "topicdiscover",
        token: "ft91l0kaj4iy3jhlxj606ampdg9h0s",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "batmanbeginspinecone",
        token: "bdfsqux706n8g8rhxs0gzi79yndjsk",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "gymnasticsranleoiran",
        token: "rwh1fpuk0ipbsv4lid4xkx4wrxsxbk",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "thegodfathercrackers",
        token: "xyzk0hyghimy1v4norxbwhki20ddg9",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "cityofgodlightning",
        token: "llvteekqfsm9guf5vadowsil5239v5",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "hyposwasp",
        token: "g7bdu51319a8hakd46mdinbuiit6q2",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "smokepurp00",
        token: "alwdmo4ua2gmrbnnak5kfnca8mzo26",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "lospista",
        token: "b7f643duqvjz31iw8dhxsw6oy977mb",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]

    },
    {
        username: "VRGMRC",
        token: "sz2cr8izoyab3gx4b4h5o1t2xegn6q",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]

    },
    {
        username: "TeTrisKkK",
        token: "91qnnp0m7ii34rgm71tnxgyf5zpxmw",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "req_ries",
        token: "g6jdq0qbuj5lmp6z0fuy25jno1pvh1",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "petichef",
        token: "m7x05sa58mg0u7qhcjfvj5iyw7t921",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    },
    {
        username: "bw3n",
        token: "s8am92z1aj98v4b6vffw3ehyutb7e9",
        channels: ["roshtein", "deuceace", "vondice", "trainwreckstv", "frankdimes", "classybeef"]
    }
];