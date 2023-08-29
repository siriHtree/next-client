import Image from 'next/image'
import StripePayment from "./components/StripePayment";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1 className="mb-4">hello to the world</h1>
			<StripePayment></StripePayment>
		</main>
	);
}
