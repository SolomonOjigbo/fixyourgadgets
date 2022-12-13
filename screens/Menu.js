import React, { useState, useContext } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	Text,
	Switch,
} from "react-native";
import {} from "react-native-paper";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/core";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../config/themeContext";
import userAvatar from "../assets/avatar.jpg";

const Menu = () => {
	const theme = useContext(themeContext);
	const [mode, setMode] = useState(false);

	return (
		<View
			style={[tw("top-5 p-3 h-full"), { backgroundColor: theme.background }]}
		>
			<Text style={[tw("text-2xl font-bold"), { color: theme.color }]}>
				Settings
			</Text>

			<TouchableOpacity
				style={tw("relative p-4 w-full h-80 items-center p-2")}
				onPress={() => {}}
			>
				<Image
					style={tw("absolute top-0 h-60 w-full rounded-xl")}
					source={userAvatar}
				/>
			</TouchableOpacity>

			<Text style={[tw("text-l font-semibold pt-3"), { color: theme.color }]}>
				Dark Mode
			</Text>
			<Switch
				style={tw("w-20")}
				value={mode}
				onValueChange={(value) => {
					setMode(value);
					EventRegister.emit("changeTheme", value);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
	},
});

export default Menu;
