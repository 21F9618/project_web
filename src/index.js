const app = require("./app");
const {PORT}=process.env;


const startApp=()=>{
    app.listen(PORT,()=>{
        console.log('AUTH backend running on port ${PORT}');

    });

}


startApp();

