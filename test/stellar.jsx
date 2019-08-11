var ConvertXLMToJIGXUAsset = require("../src/services/UserManagement.jsx");

async () => {
    const res= await ConvertXLMToJIGXUAsset(this.state.amount, this.state.password)
    if(res!=null){
        console.log("success")
    }
}