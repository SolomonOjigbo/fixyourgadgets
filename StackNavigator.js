import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
// import useAuth from "./hooks/useAuth";

//Screens
import HomeScreen from "./screens/HomeScreen";
import Menu from "./screens/Menu";
import RequestScreen from "./screens/RequestScreen";
import ScheduleService from "./screens/ScheduleService";

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
			<Stack.Screen name="Menu" component={Menu} />
			<Stack.Screen name="Schedule" component={ScheduleService} />
			<Stack.Screen name="Request" component={RequestScreen} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
