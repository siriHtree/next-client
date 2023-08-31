"use client";
import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import axios from "axios";

/**
 * Material UI
 */
import Button from "@mui/material/Button";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const LinkedInLogin = () => {
	const [code, setCode] = useState("");
	const searchParams = useSearchParams();
	const getAccessToken = async () => {
		try {
			let res = await axios.post("/api/user/access-token", {
				code: searchParams.get("code"),
			});
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (searchParams.get("code")) {
			console.log(searchParams.get("code"));
			console.log("--------------");
			console.log(searchParams.get("state"));
			getAccessToken();
		}
	}, []);
	return (
		<div>
			<a
				href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78tizxtpgb5v5y&redirect_uri=http://localhost:3000&scope=openid%20profile%20email&state=MdhekfHJIELKJf"
				target="_blank"
			>
				<Button
					variant="contained"
					size="large"
					startIcon={<LinkedInIcon />}
				>
					Login
				</Button>
			</a>
		</div>
	);
};

export default LinkedInLogin;
