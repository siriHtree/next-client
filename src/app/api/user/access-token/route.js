import axios from "axios";

import { NextResponse} from "next/server";


export async function POST(req){
    try{

        let data=await req.json();
        let res = await axios.post(
            `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${data.code}&client_id=${process.env.LINKEDIN_CLIENT_KEY}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}&redirect_uri=http://localhost:3000`
        );
        console.log(res.data);
        return NextResponse.json({
            success:true,
            data:res.data
        })

    }catch(err){
        console.log()
        return NextResponse.json({
            success:false,
            message:err.response.data.error,
            detail:err.response.data.error_description
        })

    }
}