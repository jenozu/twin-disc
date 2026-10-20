import {createPool} from "./database.ts";
import {settings} from "./config.ts";
import {createApp} from "./app.ts";
import {sendOutbox} from "./mail.ts";
const config=settings();
const db=createPool(config.databaseUrl);
const app=await createApp(db,config);
await app.listen({host:"0.0.0.0",port:config.port});
let running=false;
if(config.enableWorker)setInterval(async()=>{
 if(running)return;running=true;
 try{await sendOutbox(db,config);}catch{}finally{running=false;}
},60_000).unref();
async function shutdown(){
 await app.close();await db.end();process.exit(0);
}
process.on("SIGTERM",shutdown);process.on("SIGINT",shutdown);
