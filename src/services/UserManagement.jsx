import axios from "axios";
import { jigsawBackend } from "variables/constants";
import { ApiRespose } from "models/ApiModels";


export async function login(email, password) {

    axios
        .get(jigsawBackend + "/api/request/getall/", {
            // headers: {
            //     'Authorization': "bearer " + token, "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
            // }
        })
        .then(data => {
            let response = new ApiRespose();
            return data;

        })
        .catch((err) => {


        })
}