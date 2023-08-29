"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import StripePayment from "@/components/StripePayment";
const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const page = () => {
	const [clientSecret, setClientSecret] = useState("");

	const getPaymentIntent = async () => {
		try {
			const res = await axios.post(
				"/api/create-payment-intent",
				{
					items: [
						{
							id: "some-random#id",
						},
					],
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			let { data } = res.data;
			setClientSecret(data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		//Create PaymentIntent as soon as the page loads
		getPaymentIntent();
	}, []);
	const optionsPass = {
		clientSecret,
	};

	return (
		<div>
			{clientSecret && (
				<Elements options={optionsPass!} stripe={stripePromise}>
					<StripePayment />
				</Elements>
			)}
		</div>
	);
};

export default page;
