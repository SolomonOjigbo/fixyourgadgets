import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useLayoutEffect } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import tw from "tailwind-rn";

const LoginScreen = () => {
	const { auth, getUserData, promptAsync } = useAuth();
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<View style={tw("flex-1")}>
			<ImageBackground
				resizeMode="contain"
				style={tw("flex-1")}
				source={require("./../assets/logo.png")}
			>
				<TouchableOpacity
					style={[
						tw("absolute bottom-40 w-52 p-4 bg-black rounded-2xl"),
						{ marginHorizontal: "25%" },
					]}
					onPress={auth ? getUserData() : () => promptAsync()}
				>
					<Text style={tw("text-center font-bold text-white")}>
						Get Started
					</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
};

export default LoginScreen;
