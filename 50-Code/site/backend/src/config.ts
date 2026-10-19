export type Settings={
 databaseUrl:string;gatewayToken:string;rateSalt:string;uploadRoot:string;uploadQuotaBytes:number;
 smtpHost:string;smtpPort:number;smtpUser:string;smtpPassword:string;smtpFrom:string;smtpTo:string;
 port:number;enableWorker:boolean;
};
export function settings():Settings{
 const e=process.env;
 for(const k of ["DATABASE_URL","BACKEND_SHARED_TOKEN","RFQ_RATE_SALT","UPLOAD_ROOT"])if(!e[k])throw Error("Missing backend configuration: "+k);
 if(e.BACKEND_SHARED_TOKEN!.length<32||e.RFQ_RATE_SALT!.length<32)throw Error("Gateway and rate secrets must be at least 32 characters");
 if(!e.UPLOAD_ROOT!.startsWith("/")||e.UPLOAD_ROOT!.includes(".."))throw Error("Uploads require a private absolute path");
 return {databaseUrl:e.DATABASE_URL!,gatewayToken:e.BACKEND_SHARED_TOKEN!,rateSalt:e.RFQ_RATE_SALT!,
 uploadRoot:e.UPLOAD_ROOT!,uploadQuotaBytes:Number(e.UPLOAD_QUOTA_BYTES||100_000_000),
 smtpHost:e.SMTP_HOST||"",smtpPort:Number(e.SMTP_PORT||587),smtpUser:e.SMTP_USER||"",smtpPassword:e.SMTP_PASSWORD||"",
 smtpFrom:e.SMTP_FROM||"",smtpTo:e.SMTP_TO||"",port:Number(e.PORT||4387),enableWorker:e.NOTIFICATION_WORKER==="true"};
}
