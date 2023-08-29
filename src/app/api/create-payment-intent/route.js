import Stripe from "stripe";
import 'dotenv/config';

import {NextResponse, NextRequest} from 'next/server';

const stripe=new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);


export async function POST(req){
    try{
        let data=await req.json();

        //Creating a PaymentIntent with the order amount and curreny
        const paymentIntent=await stripe.paymentIntents.create({
            amount:1000,
            currency:'inr',
        })
        return NextResponse.json({
            success:true,
            data:paymentIntent.client_secret
        })
    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }

}