"use client";



import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkedInLogin from "./LinkedInLogin";

const Navbar = () => {
	const pathname = usePathname();
	return (
		<nav className="w-full h-[10vh] fixed px-24 flex items-center justify-between">
			<div id="nLinks">
				<Link
					href="/"
					className={`${
						pathname === "/"
							? "text-blue-700 font-bold"
							: "text-black"
					} no-underline cursor-pointer font-medium text-xl`}
				>
					Home
				</Link>
				<Link
					href="/payment"
					className={`${
						pathname === "/payment"
							? "text-blue-700 font-bold"
							: "text-black"
					} no-underline cursor-pointer font-medium text-xl ml-8`}
				>
					Stripe payment
				</Link>
				<Link
					href="/random"
					className={`${
						pathname === "/random"
							? "text-blue-700 font-bold"
							: "text-black"
					} no-underline cursor-pointer font-medium text-xl ml-8`}
				>
					Random
				</Link>
			</div>
			<LinkedInLogin></LinkedInLogin>
		</nav>
	);
};

export default Navbar;
