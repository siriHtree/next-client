import axios from "axios";

import { NextResponse} from "next/server";


export async function POST(req){
    try{

        let data=await req.json();
        let res = await axios.get(
            `https://api.linkedin.com/v2/userinfo`
        ,{
            headers:{
                'Authorization': `Bearer ${data.token}`
            }
        });
        return NextResponse.json({
            success:true,
            data:res.data
        })

    }catch(err){

        return NextResponse.json({
            success:false,
            message:err.response.data.message,
        })

    }
}