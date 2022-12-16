import React, {
	useEffect,
	useMemo,
	useState,
	useContext,
	createContext,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
	signOut,
} from "@firebase/auth";
import { ANDROID_CLIENTID, IOS_CLIENTID, EXPO_CLIENTID } from "@env";

const AuthContext = createContext({});

WebBrowser.maybeCompleteAuthSession();

const config = {
	androidClientId: ANDROID_CLIENTID,
	iosClientId: IOS_CLIENTID,
	expoClientId: EXPO_CLIENTID,
	scopes: ["profile", "email"],
	permissions: ["public_profile", "email", "gender"],
};

export default function AuthProvider({ children }) {
	const [message, setMessage] = useState(null);
	const [user, setUser] = useState(null);
	const [auth, setAuth] = useState();
	const [loadingInitial, setLoadingInitial] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config);

	useEffect(() => {
		async function getUserData() {
			let userInfoResponse = await fetch(
				"https://www.googleapis.com/userinfo/v2/me",
				{
					headers: {
						Authorization: `Bearer ${auth.accessToken}`,
					},
				}
			);

			userInfoResponse.json().then((data) => {
				setUser(data);
			});
		}
		setMessage(JSON.stringify(response));
		if (response?.type === "success") {
			setAuth(response.authentication);
			auth && getUserData();
		}
	}, [response, auth]);

	// useEffect(
	// 	() =>
	// 		onAuthStateChanged(auth, (user) => {
	// 			if (user) {
	// 				//Logged in....
	// 				setUser(user);
	// 			} else {
	// 				//Not logged in....
	// 				setUser(null);
	// 			}

	// 			setLoadingInitial(false);
	// 		}),

	// 	[]
	// );

	const logout = () => {
		setLoading(true);

		signOut(auth)
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	};

	const signInWithGoogle = async () => {
		setLoading(true);
		promptAsync()
			.then(async (response) => {
				if (response.type === "success") {
					setAuth(response.authentication);
					//login....
					const { idToken, accessToken } = response.params.id_token;
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
			getUserData,
			signInWithGoogle,
			logout,
		}),
		[user, loading, error]
	);

	return (
		<AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};
