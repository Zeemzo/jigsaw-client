import axios from "axios";
import { jigsawBackend, issuerPublicKey } from "variables/constants";
import { AES, enc } from "crypto-js";
import sha256 from "sha256";
import StellarSdk from "stellar-sdk";
import { getWalletBalance, getUserSession } from "services/UserManagement";

// var StellarSdk = require('stellar-sdk');
const Keypair = StellarSdk.Keypair
const Asset = StellarSdk.Asset
StellarSdk.Network.useTestNetwork();
const jwt = require('jsonwebtoken');


// function hash(email) {
//     return sha256(email);
// }

function decryptSecret(secret, signer) {
    try {
        const decrypted = AES.decrypt(secret, signer);
        const plaintext = decrypted.toString(enc.Utf8);
        return plaintext;
    } catch (error) {
        return null;
    }
}


function encryptSecret(secret, signer) {
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
export async function createKnowledge(knowledge, password) {
    try {

        console.log(knowledge)
        console.log(password)


        var keypair
        var publicKey
        const user = getUserSession()
        if (user == null) {
            return null
        }
        console.log(user)
        publicKey = user.publicKey
        console.log(user.encryptedSecret)

        if (password === "") {
            if (localStorage.getItem("secretKey") != null) {
                keypair = Keypair.fromSecret(localStorage.getItem("secretKey"))

            }
        } else {
            keypair = Keypair.fromSecret(decryptSecret(user.encryptedSecret, password))
            localStorage.setItem("secretKey", decryptSecret(user.encryptedSecret, password))

        }

        // console.log(keypair)

        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        const sourceAccount = await server.loadAccount(publicKey);
        if (sourceAccount == null) {
            return null
        }

        // console.log(sha256(JSON.stringify(knowledge)))

        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.manageData({ name: 'Type', value: 'K0', }))
            .addOperation(StellarSdk.Operation.manageData({ name: 'KnowledgeHash', value: sha256(JSON.stringify(knowledge)), }))
            .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(keypair);


        let postBody = {
            publicKey:publicKey,
            data: knowledge,
            xdr: transaction.toEnvelope().toXDR('base64'),
            hash: transaction.hash().toString('hex')
        }

        console.log(postBody)

        let token
        if (localStorage.getItem("token") != null) {
            token = localStorage.getItem("token")
        }

        // return postBody
        const res = await axios
            .post(jigsawBackend + "/api/article/create/", postBody,
                {
                    headers: {
                        'Authorization': "bearer " + token,
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                })

        if (res != null) {
            if (res.status == 200) {
                // localStorage.setItem("keypair", JSON.stringify(keypair))
                return res.status
            } else {
                return res.status
            }
        } else {
            return null

        }

    } catch (err) {
        console.log(err)
        return null
    }


}

/**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export async function findKnowledge() {
    try {

        // let token
        // if (localStorage.getItem("token") != null) {
        //     token = localStorage.getItem("token")
        // }

        // return postBody
        const res = await axios
            .get(jigsawBackend + "/api/article/find",
                {
                    headers: {
                        // 'Authorization': "bearer " + token,
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


export async function getKnowledge(id) {
    try {

        // let token
        // if (localStorage.getItem("token") === null) {
        //     return null
        // }
        // token = localStorage.getItem("token")

        // return postBody
        const res = await axios
            .get(jigsawBackend + `/api/article/get/${id}`,
                {
                    headers: {
                        // 'Authorization': "bearer " + token,
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