"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const pathname = usePathname();
	return (
		<nav className="w-full h-[10vh] fixed px-8 flex items-center">
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
			</div>
		</nav>
	);
};

export default Navbar;
