import pg from "pg";
import type {PoolClient,QueryResultRow} from "pg";
export type DB=pg.Pool;
export function createPool(url:string):DB{return new pg.Pool({connectionString:url,max:8,idleTimeoutMillis:15000,connectionTimeoutMillis:5000});}
export async function transaction<T>(pool:DB,work:(client:PoolClient)=>Promise<T>):Promise<T>{
 const c=await pool.connect();
 try{await c.query("BEGIN");const result=await work(c);await c.query("COMMIT");return result;}
 catch(error){await c.query("ROLLBACK").catch(()=>{});throw error;}
 finally{c.release();}
}
export async function one<T extends QueryResultRow>(client:PoolClient,query:string,values:unknown[]):Promise<T|undefined>{
 return (await client.query<T>(query,values)).rows[0];
}
