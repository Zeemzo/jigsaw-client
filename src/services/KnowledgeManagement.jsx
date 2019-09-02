import axios from "axios";
import { jigsawBackend, jigsawGateway, JIGXUPoolAccount, JIGXUDistributorPublicKey, JIGXUIssuerPublicKey, JIGXKIssuerPublicKey } from "variables/constants";
import { AES, enc } from "crypto-js";
import sha256 from "sha256";
import StellarSdk, { Asset } from "stellar-sdk";
import { getUserSession } from "services/UserManagement";
import { stringify } from "canonicalize-json";
import { store } from "variables/redux";

// var StellarSdk = require('stellar-sdk');
const Keypair = StellarSdk.Keypair
// const Asset = StellarSdk.Asset
StellarSdk.Network.useTestNetwork();
// const jwt = require('jsonwebtoken');


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


// function encryptSecret(secret, signer) {
//     try {
//         const ciphertext = AES.encrypt(secret, signer);
//         return ciphertext.toString();
//     } catch (error) {
//         return null;
//     }
// }

/**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export async function createKnowledge(knowledge, password) {
    try {

        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'building knowledge transaction'
        })
        //console.log(knowledge)
        //console.log(password)
        console.log("alive 1")

        var keypair
        var publicKey
        var PreviousTxn
        const user = getUserSession()
        if (user == null) {
            return null
        }

        console.log("alive 2")

        //console.log(user)
        publicKey = user.publicKey
        //console.log(user.encryptedSecret)

        if (password === "") {
            if (localStorage.getItem("secretKey") != null) {
                keypair = Keypair.fromSecret(localStorage.getItem("secretKey"))

            }
        } else {
            keypair = Keypair.fromSecret(decryptSecret(user.encryptedSecret, password))
            
            // localStorage.setItem("secretKey", decryptSecret(user.encryptedSecret, password))

        }
        console.log("alive 3")

        // //console.log(keypair)

        const gatewayRes = await axios
            .get(`${jigsawGateway}/api/transactions/lastKnowledge/${publicKey}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                })

        if (gatewayRes == null) {
            return null
        }

        console.log("alive 4")

        switch (gatewayRes.status) {
            case 200: PreviousTxn = gatewayRes.data.lastTxn; break;
            case 201: PreviousTxn = '';
        }
        console.log(gatewayRes)
        console.log("alive 5")

        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        const sourceAccount = await server.loadAccount(publicKey);
        if (sourceAccount == null) {
            return null
        }

        // //console.log(sha256(JSON.stringify(knowledge)))

        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.manageData({ name: 'Type', value: 'K0', }))
            .addOperation(StellarSdk.Operation.manageData({ name: 'PreviousTxn', value: PreviousTxn, }))
            .addOperation(StellarSdk.Operation.manageData({ name: 'KnowledgeHash', value: sha256(stringify(knowledge)), }))
            .addOperation(StellarSdk.Operation.payment({
                destination: JIGXUPoolAccount,
                asset: new Asset("JIGXU", JIGXUIssuerPublicKey),
                amount: "5"
            }))
            .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(keypair);


        let postBody = {
            timestamp: Math.floor(new Date().getTime() / 1000.0),
            publicKey: publicKey,
            data: knowledge,
            alias: user.alias,
            xdr: transaction.toEnvelope().toXDR('base64'),
            hash: transaction.hash().toString('hex')
        }

        let hash=transaction.hash().toString('hex')
        //console.log(postBody)

        let token
        if (localStorage.getItem("token") != null) {
            token = localStorage.getItem("token")
        }

        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'submitting knowledge transaction'
        })
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
            // localStorage.removeItem("txtTitle");
            // localStorage.removeItem("editorHtml");

            if (res.status == 200) {
                // localStorage.setItem("keypair", JSON.stringify(keypair))
                // localStorage.removeItem("txtTitle");
                // localStorage.removeItem("editorHtml");

                res.data.txn=hash
                return res
            } else {
                return res
            }
        } else {
            return null

        }

    } catch (err) {
        //console.log(err)
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
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'retrieving knowledge from datastore'
        })
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

/**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export async function getKnowledgeList() {
    try {

        // let token
        // if (localStorage.getItem("token") != null) {
        //     token = localStorage.getItem("token")
        // }

        // return postBody
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'retrieving knowledge from datastore'
        })
        const res = await axios
            .get(jigsawBackend + "/api/article/getList",
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
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'retrieving knowledge from datastore'
        })
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


/**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export async function AddKnowledge(kID, knowledge, password) {
    try {
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'building contribution transaction'
        })
        //console.log(kID)
        //console.log(knowledge)
        //console.log(password)


        var keypair
        var publicKey
        var PreviousTxn
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
            // localStorage.setItem("secretKey", decryptSecret(user.encryptedSecret, password))
        }

        // //console.log(keypair)

        const gatewayRes = await axios
            .get(`${jigsawGateway}/api/transactions/lastContribution/${kID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',

                    }
                })

        if (gatewayRes == null) {
            return null
        }
        switch (gatewayRes.status) {
            case 200: PreviousTxn = gatewayRes.data.lastTxn; break;
            case 201: PreviousTxn = '';
        }
        console.log(gatewayRes)




        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        const sourceAccount = await server.loadAccount(publicKey);
        if (sourceAccount == null) {
            return null
        }

        // //console.log(sha256(JSON.stringify(knowledge)))

        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.manageData({ name: 'Type', value: 'K1', }))
            .addOperation(StellarSdk.Operation.manageData({ name: 'PreviousTxn', value: PreviousTxn, }))
            .addOperation(StellarSdk.Operation.manageData({ name: 'KnowledgeTxn', value: kID, }))
            .addOperation(StellarSdk.Operation.manageData({ name: 'KnowledgeHash', value: sha256(stringify(knowledge)), }))
            .addOperation(StellarSdk.Operation.payment({
                destination: JIGXUPoolAccount,
                asset: new Asset("JIGXU", JIGXUIssuerPublicKey),
                amount: "2"
            }))
            .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(keypair);


        let postBody = {
            kId: kID,
            timestamp: Math.floor(new Date().getTime() / 1000.0),
            publicKey: publicKey,
            alias: user.alias,
            data: knowledge,
            xdr: transaction.toEnvelope().toXDR('base64'),
            hash: transaction.hash().toString('hex'),
            votes: 0
        }

        //console.log(postBody)
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'submitting contribution transaction'
        })
        let token
        if (localStorage.getItem("token") != null) {
            token = localStorage.getItem("token")
        }

        // return postBody
        const res = await axios
            .post(jigsawBackend + "/api/article/contribute/", postBody,
                {
                    headers: {
                        'Authorization': "bearer " + token,
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                })

        if (res != null) {
            localStorage.removeItem("txtTitle");
            localStorage.removeItem("editorHtml");

            if (res.status == 200) {
                return res.status
            } else {
                return res.status
            }
        } else {
            return null

        }

    } catch (err) {
        //console.log(err)
        return null
    }


}

export async function getContributions(id) {
    try {
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'retrieving contribution from datastore'
        })
        // let token
        // if (localStorage.getItem("token") === null) {
        //     return null
        // }
        // token = localStorage.getItem("token")

        // return postBody
        const res = await axios
            .get(jigsawBackend + `/api/article/getContributions/${id}`,
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


/**
* @desc 
* @param object 
* @author Azeem Ashraf azeemashraf@outlook.com
* @return 
*/
export async function AddVote(kID, cID, password) {
    try {
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'building vote transaction'
        })
        //console.log(kID)
        //console.log(knowledge)
        //console.log(password)

        var PreviousTxn
        var keypair
        var publicKey
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
            // localStorage.setItem("secretKey", decryptSecret(user.encryptedSecret, password))
        }

        // //console.log(keypair)
        const gatewayRes = await axios
            .get(`${jigsawGateway}/api/transactions/lastVote/${cID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                })

        if (gatewayRes == null) {
            return null
        }
        switch (gatewayRes.status) {
            case 200: PreviousTxn = gatewayRes.data.lastTxn; break;
            case 201: PreviousTxn = '';
        }
        console.log(gatewayRes)




        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        const sourceAccount = await server.loadAccount(publicKey);
        if (sourceAccount == null) {
            return null
        }

        // //console.log(sha256(JSON.stringify(knowledge)))

        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.manageData({ name: 'Type', value: 'V1', }))
            .addOperation(StellarSdk.Operation.manageData({ name: 'PreviousTxn', value: PreviousTxn, }))
            .addOperation(StellarSdk.Operation.manageData({ name: 'KnowledgeTxn', value: kID, }))
            .addOperation(StellarSdk.Operation.manageData({ name: 'ContributionTxn', value: cID, }))
            .addOperation(StellarSdk.Operation.payment({
                destination: JIGXUPoolAccount,
                asset: new Asset("JIGXU", JIGXUIssuerPublicKey),
                amount: "1"
            }))
            .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(keypair);


        let postBody = {
            kId: kID,
            timestamp: Math.floor(new Date().getTime() / 1000.0),
            publicKey: publicKey,
            alias: user.alias,
            xdr: transaction.toEnvelope().toXDR('base64'),
            hash: transaction.hash().toString('hex'),
            cId: cID
        }

        //console.log(postBody)
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: 'submitting vote transaction'
        })
        let token
        if (localStorage.getItem("token") != null) {
            token = localStorage.getItem("token")
        }

        // return postBody
        const res = await axios
            .post(jigsawBackend + "/api/article/vote/", postBody,
                {
                    headers: {
                        'Authorization': "bearer " + token,
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                })

        if (res != null) {
            if (res.status == 200) {
                return res.status
            } else {
                return res.status
            }
        } else {
            return null

        }

    } catch (err) {
        //console.log(err)
        return null
    }


}
