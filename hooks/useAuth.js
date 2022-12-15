import React, { useEffect, useMemo, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
	signOut,
} from "@firebase/auth";

const AuthContext = createContext({});

WebBrowser.maybeCompleteAuthSession();

const config = {
	androidClientId: process.env.REACT_APP_ANDROID_CLIENTID,
	iosClientId: process.env.REACT_APP_IOS_CLIENTID,
	expoClientId: process.env.REACT_APP_EXPO_CLIENTID,
	scopes: ["profile", "email"],
	permissions: ["public_profile", "email", "gender"],
};

export const AuthProvider = ({ children }) => {
	const [message, setMessage] = useState(null);
	const [user, setUser] = useState(null);
	const [auth, setAuth] = useState();
	const [loadingInitial, setLoadingInitial] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: REACT_APP_ANDROID_CLIENTID,
		iosClientId: REACT_APP_IOS_CLIENTID,
		expoClientId: REACT_APP_EXPO_CLIENTID,
	});

	useEffect(() => {
		setMessage(JSON.stringify(response));
		if (response?.type === "success") {
			setAuth(response.authentication);
		}
		getUserData();
	}, [response]);

	async function getUserData() {
		let userInfoResponse = await fetch(
			"https://www.googleapis.com/userinfo/v2/me",
			{
				headers: { Authorization: `Bearer ${auth.accessToken}` },
			}
		);

		userInfoResponse.json().then((data) => {
			setUser(data);
		});
	}

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					//Logged in....
					setUser(user);
				} else {
					//Not logged in....
					setUser(null);
				}

				setLoadingInitial(false);
			}),

		[]
	);

	const logout = () => {
		setLoading(true);

		signOut(auth)
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	};

	const signInWithGoogle = async () => {
		setLoading(true);

		await Google.useAuthRequest(config)
			.then(async (response) => {
				if (response.type === "success") {
					//login....
					const { idToken, accessToken } = response;
					const credential = GoogleAuthProvider.credential(
						idToken,
						accessToken
					);

					await signInWithCredential(auth, credential);
				}
				return Promise.reject();
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	};

	const memoedValue = useMemo(
		() => ({
			user,
			loading,
			error,
			signInWithGoogle,
			logout,
		}),
		[user, loading, error]
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{!loadingInitial && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	useContext(AuthContext);
};
