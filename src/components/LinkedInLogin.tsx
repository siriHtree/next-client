"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

/**
 * Material UI
 */
import Button from "@mui/material/Button";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { ContactsOutlined } from "@mui/icons-material";

interface USERDATA {
	name: string;
	email: string;
	picture?: string;
}

function stringToColor(str: string) {
	let hash = 0;
	let i;
	for (i = 0; i < str.length; i += 1) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = "#";
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-1);
	}
	return color;
}
function stringAvatar(name: string) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}

const LinkedInLogin = () => {
	const [userDetails, setUserDetails] = useState<USERDATA | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const searchParams = useSearchParams();

	const getAccessToken = async () => {
		try {
			let res = await axios.post("/api/user/access-token", {
				code: searchParams.get("code"),
			});
			console.log(res);
			if (localStorage.getItem("linkedin-tokens") === null) {
				localStorage.setItem(
					"linkedin-tokens",
					JSON.stringify(res.data.data),
				);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const getUserInfo = async () => {
		try {
			let data = JSON.parse(localStorage.getItem("linkedin-tokens")!);
			let res = await axios.post("/api/user/info", {
				token: data.access_token,
			});
			console.log(res);
			let tmp = {
				name: res.data.data.name,
				email: res.data.data.email,
				picture: res.data.data?.picture,
			};
			setUserDetails(tmp);
		} catch (err) {}
	};
	const logout = () => {
		localStorage.clear();
		setIsAuthenticated(false);
	};
	const authHandler = async () => {
		try {
			let res = await axios.get("/api/user/url");
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (
			searchParams.get("code") &&
			localStorage.getItem("linkedin-tokens") == undefined
		) {
			getAccessToken();
			setIsAuthenticated(true);
			console.log("code is generated");
		} else if (localStorage.getItem("linkedin-tokens") !== null) {
			getUserInfo();
			setIsAuthenticated(true);
			console.log("access token is stored in localstorage");
		}
	}, [isAuthenticated]);
	return (
		<div>
			{!isAuthenticated ? (
				<Button
					variant="contained"
					size="large"
					startIcon={<LinkedInIcon />}
					onClick={authHandler}
				>
					Login
				</Button>
			) : userDetails !== null ? (
				userDetails.picture ? (
					<div className="flex items-center">
						<Avatar
							alt={userDetails.name}
							src={userDetails.picture}
							sx={{ boxShadow: "0 0 10px #0004" }}
						/>
						<Typography variant="h6" className="ml-4">
							{userDetails.name}
						</Typography>

						{/* <Button
							variant="contained"
							size="large"
							startIcon={<LogoutIcon />}
							className="ml-4 bg-red-400"
							onClick={logout}
						>
							Logout
						</Button> */}
					</div>
				) : (
					<div>
						<Avatar {...stringAvatar(userDetails.name)} />
						<Typography variant="h6" className="ml-4">
							{userDetails.name}
						</Typography>
						{/* <Button
							variant="contained"
							size="large"
							startIcon={<LogoutIcon />}
							className="ml-4 bg-red-400"
							onClick={logout}
						>
							Logout
						</Button> */}
					</div>
				)
			) : (
				""
			)}
		</div>
	);
};

export default LinkedInLogin;
