import axios from "axios";
import { jigsawBackend, issuerPublicKey } from "variables/constants";
import { AES, enc } from "crypto-js";
import sha256 from "sha256";
import StellarSdk from "stellar-sdk";
// var StellarSdk = require('stellar-sdk');
const Keypair = StellarSdk.Keypair
const Asset = StellarSdk.Asset
StellarSdk.Network.useTestNetwork();
const jwt = require('jsonwebtoken');


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

 /**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export async function login(email, password) {
    try {
        let emailHash = hashEmail(email.toLowerCase());

        let postBody = {
            emailHash: emailHash,
            password: password
        }
        const res = await axios
            .post(jigsawBackend + "/api/user/login/", postBody,
                {
                    headers: {
                        // 'Authorization': "bearer " + token, 
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                })

        if (res != null) {
            if (res.status == 200) {
                // localStorage.setItem("keypair", JSON.stringify(keypair))
                localStorage.setItem("token", res.data.token)
                return res.status
            } else {
                return res.status
            }
        } else {
            return null

        }

    } catch (err) {
        return null
    }


}

 /**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export async function loginWithSecret(secretKey) {
    try {

        let postBody = {
            secretKey: secretKey
        }
        const res = await axios
            .post(jigsawBackend + "/api/user/loginWithSecret/", postBody,
                {
                    headers: {
                        // 'Authorization': "bearer " + token, 
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                })

        if (res != null) {
            if (res.status == 200) {
                // localStorage.setItem("keypair", JSON.stringify(keypair))
                localStorage.setItem("token", res.data.token)
                return res.status
            } else {
                return res.status
            }
        } else {
            return null

        }

    } catch (err) {
        return null
    }


}

 /**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export async function register(email, password, nameAlias) {

    try {
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

        const STELLAT_FRIEND_BOT_URL = `https://friendbot.stellar.org/?addr=`;
        const stellarResponse = await axios.get(`${STELLAT_FRIEND_BOT_URL}${publicKey}`);

        if (stellarResponse != null && stellarResponse.status !== 200) {
            return null;
        }
        console.log("BOT funded")

        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        const sourceAccount = await server.loadAccount(publicKey);
        if (sourceAccount == null) {
            return null
        }
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.changeTrust({
                // Because Stellar allows transaction in many currencies, you must
                // specify the asset type. The special "native" asset represents Lumens.
                asset: new Asset("JIGXU", issuerPublicKey),
                limit: "100",
                source: publicKey
            }))
            .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(keypair);
        // And finally, send it off to Stellar!
        const transactionResponse = await server.submitTransaction(transaction);
        if (transactionResponse == null) {
            return null;
        }

        console.log("CHANGE ASSET DONE")

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
                console.log("Success:" + res.status)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("secretKey",keypair.secret());
                localStorage.setItem("publicKey",keypair.publicKey());

                return res.status
            } else if (res.status == 203) {
                console.log("already: " + res.status)
                return res.status
            }
        } else {
            return null

        }

    } catch (err) {
        return null
    }

}

 /**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export async function getWalletBalance(publicKey) {

    try {
        let assets = [];

        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        // the JS SDK uses promises for most actions, such as retrieving an account
        const account = await server.loadAccount(publicKey);
        if (account == null) {
            return null
        }
        account.balances.forEach(function (balance) {
            // @ts-ignore
            // console.log('Asset_code:', balance.asset_code, ', Balance:', balance.balance);
            let bal = parseFloat(balance.balance)
            // @ts-ignore
            assets.push({ 'assetCode': balance.asset_code, 'balance': bal.toFixed(0) });
        });
        // assets.pop();
        console.log(assets)
        return assets;
    } catch (err) {
        return null;
    }

}

 /**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export function getUserSession() {
    if (localStorage.getItem("token") != null) {
        // jwt.decode(localStorage.getItem("token"))
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken == null) {
            return null;
        } else {
            // console.log(decodedToken)
            return decodedToken;
        }

    }
}
