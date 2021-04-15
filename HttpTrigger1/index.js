const {MongoClient} = require('mongodb');

async function main(){

    const uri = "mongodb://habitanto:yV9uAceDbPvNFu3RhEjJ0deGLocL0UIP88ts9z2Ox2zPwEENjMF6CEuFPOdbzDwYoJqmhWI8aGLobg0voj3OXg%3D%3D@habitanto.mongo.cosmos.azure.com:10255/habitanto_data?appName=%40habitanto%40&maxIdleTimeMS=120000&retrywrites=false&ssl=true&replicaSet=globaldb";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
       list = await  listDatabases(client);
       return list;
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    base = await client.db("habitanto_data");
    result = await base.collection("NotificationApp").find().limit(100);
    return result.toArray();
};




module.exports = async function (context, req) {
    let result_list = await main().catch(console.error);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result_list
    };
}