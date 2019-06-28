import axios from "axios";
import { jigsawBackend } from "variables/constants";
import { AES, enc } from "crypto-js";
import sha256 from "sha256";
import { Keypair } from "stellar-sdk";



function hashEmail(email) {
    return sha256(email);
}

function decyrptSecret(secret, signer) {
    try {
        const decrypted = AES.decrypt(secret, signer);
        const plaintext = decrypted.toString(enc.Utf8);
        return plaintext;
    } catch (error) {
        return null;
    }
}


function encyrptSecret(secret, signer) {
    try {
        const ciphertext = AES.encrypt(secret, signer);
        return ciphertext.toString();
    } catch (error) {
        return null;
    }
}


export async function login(email, password) {

    axios
        .get(jigsawBackend + "/api/user/login/", {
            // headers: {
            //     'Authorization': "bearer " + token, 
            //     "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
            // }
        })
        .then(data => {
            return data;
        })
        .catch((err) => {

        })
}

export async function register(email, password, nameAlias) {

    let emailHash = hashEmail(email.toLowerCase());
    let keypair = Keypair.random();
    let publicKey = keypair.publicKey();
    let encryptedSecret = encyrptSecret(keypair.secret(), password);
    let alias = nameAlias.toLowerCase();

    let postBody = {
        emailHash: emailHash,
        publicKey: publicKey,
        encryptedSecret: encryptedSecret,
        alias: alias
    }

    const res = await axios
        .post(jigsawBackend + "/api/user/add/", postBody,
            {
                headers: {
                    // 'Authorization': "bearer " + token, 
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );

    if (res != null) {
        if (res.status == 200) {
            localStorage.setItem("keypair", JSON.stringify(keypair))
            localStorage.setItem("token", JSON.stringify(res.data.token))
            return res.status
        } else if (res.status == 203) {
            return res.status
        }
    } else {
        return null

    }
    // .then(res => {
    //     if (res.status == 200) {
    //         localStorage.setItem("keypair", JSON.stringify(keypair))
    //         localStorage.setItem("token", JSON.stringify(res.data.token))
    //         return res.status
    //     } else if (res.status == 203) {
    //         return res.status
    //     }
    // })
    // .catch((err) => {
    //     return null
    // })
}
