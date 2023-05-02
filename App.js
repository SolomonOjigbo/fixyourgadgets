import React, { useState, useEffect } from "react";
import StackNavigator from "./StackNavigator";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); //Ignore log notification by message
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./hooks/useAuth";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./config/themeContext";
import theme from "./config/Theme";

export default function App() {
	const [mode, setMode] = useState(false);
	useEffect(() => {
		let eventListener = EventRegister.addEventListener(
			"changeTheme",
			(data) => {
				setMode(data);
				console.log(data);
			}
		);
		return () => {
			EventRegister.removeEventListener(eventListener);
		};
	});

	return (
		<themeContext.Provider value={mode === true ? theme.dark : theme.light}>
			<NavigationContainer>
				<AuthProvider>
					<StackNavigator />
				</AuthProvider>
			</NavigationContainer>
		</themeContext.Provider>
	);
}
