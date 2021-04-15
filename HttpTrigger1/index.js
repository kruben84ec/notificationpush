const {MongoClient} = require('mongodb');

async function main(){

    const uri = "mongodb://habitanto:yV9uAceDbPvNFu3RhEjJ0deGLocL0UIP88ts9z2Ox2zPwEENjMF6CEuFPOdbzDwYoJqmhWI8aGLobg0voj3OXg%3D%3D@habitanto.mongo.cosmos.azure.com:10255/habitanto_data?appName=%40habitanto%40&maxIdleTimeMS=120000&retrywrites=false&ssl=true&replicaSet=globaldb";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
       return await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function listDatabases(client){

    base = await client.db("habitanto_data");
 
    console.log("conexion a la base de datos");

    return  await base.collection("NotificationApp").find().limit(1);

};




module.exports = async function (context, req) {

    let list_notificaciones = await main().catch(console.error);
    context.log('JavaScript HTTP trigger function processed a request.  ');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = {
        "result": "datos"
    };

    list_notificaciones.each( notificaction_row => {
        console.log(notificaction_row);
    });


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}