import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAuth } from "./hooks/useAuth";

//Screens
import HomeScreen from "./screens/HomeScreen";
import Menu from "./screens/Menu";
import RequestScreen from "./screens/RequestScreen";
import ScheduleService from "./screens/ScheduleService";
import LoginScreen from "./screens/LoginScreen";
import ThankyouScreen from "./screens/ThankyouScreen";
import Phones from "./screens/phones/Phones";
import Laptops from "./screens/laptops/Laptops";
import Desktops from "./screens/desktops/Desktops";
import Printers from "./screens/printers/Printers";
import Electronics from "./screens/electronics/Electronics";
import Accessories from "./screens/accessories/Accessories";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { user } = useAuth();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Home"
		>
			{user ? (
				<>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Menu" component={Menu} />
					<Stack.Screen name="Schedule" component={ScheduleService} />
					<Stack.Screen name="Request" component={RequestScreen} />
					<Stack.Screen name="Thanks" component={ThankyouScreen} />
					<Stack.Screen name="Phones" component={Phones} />
					<Stack.Screen name="Laptops" component={Laptops} />
					<Stack.Screen name="Desktops" component={Desktops} />
					<Stack.Screen name="Printers" component={Printers} />
					<Stack.Screen name="Electronics" component={Electronics} />
					<Stack.Screen name="Accessories" component={Accessories} />
				</>
			) : (
				<Stack.Screen name="Login" component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
