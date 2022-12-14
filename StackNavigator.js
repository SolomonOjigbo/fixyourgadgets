import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
// import useAuth from "./hooks/useAuth";

//Screens
import HomeScreen from "./screens/HomeScreen";
import RequestScreen from "./screens/RequestScreen";
import Menu from "./screens/Menu";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	// const { user } = useAuth();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Request" component={RequestScreen} />
			<Stack.Screen name="Menu" component={Menu} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
