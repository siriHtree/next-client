import { NextResponse,NextRequest } from "next/server";
import querystring from "querystring";
import axios from "axios";
import { nanoid } from 'nanoid';

export async function GET(req){
    // const state=nanoid();
    // const scope="openid%20profile%20email";
    try{
        // const params={
        //     response_type:"code",
        //     client_id:process.env.LINKEDIN_CLIENT_KEY,
        //     redirect_uri:process.env.REDIRECT_URI,
        //     scope,
        // }
        // let data=querystring.stringify(params,"&","=")
        // console.log(data)
        NextResponse.json({
            success:true,
        })

        // const res=axios.get("https://www.linkedin.com/oauth/v2/authorization",{})
    }catch(err){
        NextResponse.json({
            success:false})
    }
}