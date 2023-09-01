import { NextResponse,NextRequest } from "next/server"

export async function GET(){
    try{
        const params={
            response_type:"code",
            client_id:process.env.LINKEDIN_CLIENT_KEY,
        }

    }catch(err){

    }
}