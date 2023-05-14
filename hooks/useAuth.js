import React, {
	useEffect,
	useMemo,
	useState,
	useContext,
	createContext,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

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
	const [user, setUser] = useState(null);
	const [auth, setAuth] = useState();
	const [requireRefresh, setRequireRefresh] = useState(false);

	const [request, response, promptAsync] = Google.useAuthRequest(config);

	useEffect(() => {
		console.log(response);

		if (response?.type === "success") {
			setAuth(response.authentication);

			const persistAuth = async () => {
				await AsyncStorage.setItem(
					"auth",
					JSON.stringify(response.authentication)
				);
			};
			persistAuth();
		}
	}, [response]);

	useEffect(() => {
		const getPersistedAuth = async () => {
			const jsonValue = await AsyncStorage.getItem("auth");
			if (jsonValue != null) {
				const authFromJson = JSON.parse(jsonValue);
				setAuth(authFromJson);
				console.log(authFromJson);

				setRequireRefresh(
					!AuthSession.TokenResponse.isTokenFresh({
						expiresIn: authFromJson.expiresIn,
						issuedAt: authFromJson.issuedAt,
					})
				);
			}
		};
		getPersistedAuth();
	}, []);

	const getUserData = async () => {
		let userInfoResponse = await fetch(
			"https://www.googleapis.com/userinfo/v2/me",
			{
				headers: { Authorization: `Bearer ${auth.accessToken}` },
			}
		);

		userInfoResponse.json().then((data) => {
			console.log(data);
			setUser(data);
		});
	};

	const getClientId = () => {
		if (Platform.OS === "ios") {
			return IOS_CLIENTID;
		} else if (Platform.OS === "android") {
			return ANDROID_CLIENTID;
		} else {
			console.log("Invalid platform - not handled");
		}
	};

	const refreshToken = async () => {
		const clientId = getClientId();
		console.log(auth);
		const tokenResult = await AuthSession.refreshAsync(
			{
				clientId: clientId,
				refreshToken: auth.refreshToken,
			},
			{
				tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
			}
		);

		tokenResult.refreshToken = auth.refreshToken;

		setAuth(tokenResult);
		await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
		setRequireRefresh(false);
	};

	const logout = async () => {
		await AuthSession.revokeAsync(
			{
				token: auth.accessToken,
			},
			{
				revocationEndpoint: "https://oauth2.googleapis.com/revoke",
			}
		);

		setAuth(undefined);
		setUser(undefined);
		await AsyncStorage.removeItem("auth");
	};

	const memoedValue = useMemo(() => ({
		user,
		auth,
		requireRefresh,
		refreshToken,
		getUserData,
		logout,
		promptAsync,
	}));

	return (
		<AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};
