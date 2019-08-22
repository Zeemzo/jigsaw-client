import axios from "axios";
import { jigsawBackend, issuerPublicKey, JIGXUDistributorPublicKey, JIGXUIssuerPublicKey, JIGXKIssuerPublicKey } from "variables/constants";
import { AES, enc } from "crypto-js";
import sha256 from "sha256";
import StellarSdk from "stellar-sdk";
import { store } from "variables/redux";
import { number } from "prop-types";
// var StellarSdk = require('stellar-sdk');
const Keypair = StellarSdk.Keypair
const Asset = StellarSdk.Asset
StellarSdk.Network.useTestNetwork();
const jwt = require('jsonwebtoken');


export function hashEmail(email) {
    return sha256(email);
}

function decryptSecret(secret, signer) {
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
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'validating credentials'
        })
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
            if (res.status === 200) {
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
export async function UpdatePushToken(emailHash, pushToken) {
    try {
        // store.dispatch({
        //     type: 'ADD_MESSAGE',
        //     text: 'updating pushtoken'
        // })

        let postBody = {
            pushToken: pushToken,
            emailHash: emailHash
        }

        let token
        if (localStorage.getItem("token") != null) {
            token = localStorage.getItem("token")
        }

        const res = await axios
            .post(jigsawBackend + "/api/user/pushToken/", postBody,
                {
                    headers: {
                        'Authorization': "bearer " + token,
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                })

        if (res != null) {

            return res

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
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'validating credentials'
        })
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
            if (res.status === 200) {
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
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'creating keypair in testnet'
        })

        // store.dispatch('creating keys')

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

        if (stellarResponse !== null && stellarResponse.status !== 200) {
            return null;
        }
        //console.log("BOT funded")
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'trusting asset issuer'
        })

        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        const sourceAccount = await server.loadAccount(publicKey);
        if (sourceAccount === null) {
            return null
        }
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.changeTrust({
                // Because Stellar allows transaction in many currencies, you must
                // specify the asset type. The special "native" asset represents Lumens.
                asset: new Asset("JIGXU", JIGXUIssuerPublicKey),
                limit: "100",
                source: publicKey
            }))
            .addOperation(StellarSdk.Operation.changeTrust({
                // Because Stellar allows transaction in many currencies, you must
                // specify the asset type. The special "native" asset represents Lumens.
                asset: new Asset("JIGXK", JIGXKIssuerPublicKey),
                limit: "100",
                source: publicKey
            }))
            .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(keypair);
        // And finally, send it off to Stellar!
        const transactionResponse = await server.submitTransaction(transaction);
        if (transactionResponse === null) {
            return null;
        }


        //console.log("CHANGE ASSET DONE")

        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'creating user instance'
        })
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

        if (res !== null) {

            if (res.status === 200) {
                //console.log("Success:" + res.status)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("secretKey", keypair.secret());
                localStorage.setItem("publicKey", keypair.publicKey());

                return res.status
            } else if (res.status === 203) {
                //console.log("already: " + res.status)
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
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'accessing wallet'
        })
        let assets = [];

        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        // the JS SDK uses promises for most actions, such as retrieving an account
        const account = await server.loadAccount(publicKey);
        if (account === null) {
            return null
        }
        account.balances.forEach(function (balance) {
            // @ts-ignore
            // //console.log('Asset_code:', balance.asset_code, ', Balance:', balance.balance);
            let bal = parseFloat(balance.balance)
            let lim = parseFloat(balance.limit)

            // @ts-ignore
            assets.push({ 'assetCode': balance.asset_code, 'balance': bal.toFixed(0), 'limit': lim.toFixed(0) });
        });
        // assets.pop();
        //console.log(assets)
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
    if (localStorage.getItem("token") !== null) {
        // jwt.decode(localStorage.getItem("token"))
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken === null) {
            return null;
        } else {
            // //console.log(decodedToken)
            return decodedToken;
        }

        // jwt.verify(localStorage.getItem("token"), 'ijk3dp4n', (err, decodedToken) => {
        //     if (err || !decodedToken) {
        //         return null;
        //     } else {
        //         return decodedToken;
        //     }
        // });

    }
}





export async function TransferJIGXUAsset(DestinationPublicKey, Amount, password) {
    try {

        let publicKey
        let keypair
        const user = getUserSession()
        if (user == null) {
            return null
        }
        //console.log(user)
        publicKey = user.publicKey

        //console.log(user.encryptedSecret)

        if (password == "") {
            if (localStorage.getItem("secretKey") != null) {
                keypair = Keypair.fromSecret(localStorage.getItem("secretKey"))
            }
        } else {
            keypair = Keypair.fromSecret(decryptSecret(user.encryptedSecret, password))
            localStorage.setItem("secretKey", decryptSecret(user.encryptedSecret, password))
        }
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'transfering asset'
        })

        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        const sourceAccount = await server.loadAccount(publicKey);
        if (sourceAccount === null) {
            return null
        }
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.payment({
                destination: DestinationPublicKey,
                asset: new Asset("JIGXU", JIGXUIssuerPublicKey),
                amount: Amount
            }))
            .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(keypair);
        // And finally, send it off to Stellar!
        const transactionResponse = await server.submitTransaction(transaction);
        if (transactionResponse === null) {
            return null;
        }
        

        return transactionResponse

    } catch (e) {
        return null

    }
}



export async function ConvertXLMToJIGXUAsset(Amount, password, balances) {
    try {

        let publicKey
        let keypair
        const user = getUserSession()
        if (user == null) {
            return null
        }
        //console.log(user)
        publicKey = user.publicKey
        console.log(publicKey)
        //console.log(user.encryptedSecret)

        if (password == "") {
            if (localStorage.getItem("secretKey") != null) {
                keypair = Keypair.fromSecret(localStorage.getItem("secretKey"))
            }
        } else {
            keypair = Keypair.fromSecret(decryptSecret(user.encryptedSecret, password))
            localStorage.setItem("secretKey", decryptSecret(user.encryptedSecret, password))
        }

        console.log(keypair)

        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'Converting XLMs to JIGXU'
        })

        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        const sourceAccount = await server.loadAccount(publicKey);
        if (sourceAccount === null) {
            return null
        }


        let limit
        balances.forEach(function (balance) {
            if (balance.assetCode == "JIGXU") {
                if (Number(Amount) + Number(balance.balance) > Number(balance.limit)) {

                    limit = Number(Amount) + Number(balance.balance)
                    console.log(limit)
                    //  transaction.addOperation(StellarSdk.Operation.changeTrust({
                    //     // Because Stellar allows transaction in many currencies, you must
                    //     // specify the asset type. The special "native" asset represents Lumens.
                    //     asset: new Asset("JIGXU", JIGXUIssuerPublicKey),
                    //     limit: limit.toString(),
                    //     source: publicKey
                    // }))
                } else {
                    limit = Number(balance.limit)
                }

            }
        });

        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.changeTrust({
                // Because Stellar allows transaction in many currencies, you must
                // specify the asset type. The special "native" asset represents Lumens.
                asset: new Asset("JIGXU", JIGXUIssuerPublicKey),
                limit: limit.toString(),
                source: publicKey
            }))
            .addOperation(StellarSdk.Operation.payment({
                destination: JIGXUDistributorPublicKey,
                asset: StellarSdk.Asset.native(),
                amount: Amount,
                // source:publicKey
            }))
            .addOperation(StellarSdk.Operation.payment({
                destination: publicKey,
                asset: new Asset("JIGXU", JIGXUIssuerPublicKey),
                amount: Amount,
                source: JIGXUDistributorPublicKey,
            }))
            .build();



        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(keypair);

        // And finally, send it off to Stellar!
        const xdr = transaction.toEnvelope().toXDR('base64')
        console.log(xdr)
        let token
        if (localStorage.getItem("token") != null) {
            token = localStorage.getItem("token")
        }

        // return postBody
        const res = await axios
            .post(jigsawBackend + "/api/stellar/signDeal/", { xdr: xdr },
                {
                    headers: {
                        'Authorization': "bearer " + token,
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                })

        return res

    } catch (e) {
        return null

    }
}


/**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export async function GetAllUsers() {
    try {

        const res = await axios
            .get(jigsawBackend + "/api/user/getAllPublicKeys/",
                {
                    headers: {
                        // 'Authorization': "bearer " + token, 
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                })

        if (res != null) {
            if (res.status === 200) {
                return res
            } else {
                return null
            }
        } else {
            return null
        }

    } catch (err) {
        return null
    }


}