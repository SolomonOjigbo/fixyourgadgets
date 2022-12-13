import React, { useState, route, useContext } from "react";
import {
	View,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/core";
import Laptop from "../assets/laptop-repairs.jpg";
import Phone from "../assets/phone-repairs.jpg";
import Desktop from "../assets/desktop-repairs.jpg";
import Accessories from "../assets/accessories.jpg";
import Printers from "../assets/printer.jpg";
import Electronics from "../assets/electronics.jpg";
import themeContext from "../config/themeContext";

const RequestScreen = (props) => {
	const nav = useNavigation();
	const theme = useContext(themeContext);
	const { navigation, route } = props;
	const { title } = route.params;

	console.log(title);

	return (
		<SafeAreaView
			style={[tw("top-5 h-full p-3"), { backgroundColor: theme.background }]}
		>
			<Text style={[tw("text-2xl font-bold"), { color: theme.color }]}>
				Choose Type of Repair
			</Text>

			<View style={tw("bg-white-200 w-full h-20 justify-between ")}>
				<TouchableOpacity
					style={tw("absolute p-4 w-full h-20 items-center p-2")}
					onPress={() => nav.navigate("Desktops")}
				>
					<Image
						style={tw("absolute top-0 h-full w-full rounded-xl")}
						source={Desktop}
					/>
				</TouchableOpacity>
			</View>
			<View style={tw("bg-white-200 w-full h-20 justify-between ")}>
				<TouchableOpacity
					style={tw("absolute p-4 w-full h-20 items-center p-2")}
					onPress={() => nav.navigate("Laptops")}
				>
					<Image
						style={tw("absolute top-0 h-full w-16 rounded-xl")}
						source={Laptop}
					/>
				</TouchableOpacity>
			</View>
			<View style={tw("bg-white-200 w-full h-20 justify-between ")}>
				<TouchableOpacity
					style={tw("absolute p-4 w-full h-20 items-center p-2")}
					onPress={() => nav.navigate("Phones")}
				>
					<Image style={tw("absolute top-0 h-full w-16 ")} source={Phone} />
				</TouchableOpacity>
			</View>
			<View style={tw("bg-white-200 w-full h-20 justify-between ")}>
				<TouchableOpacity
					style={tw("absolute p-4 w-full h-20 items-center p-2")}
					onPress={() => nav.navigate("Accessories")}
				>
					<Image style={tw("absolute top-0 h-10 w-40 ")} source={Accessories} />
				</TouchableOpacity>
			</View>
			<View style={tw("bg-white-200 w-full h-20 justify-between ")}>
				<TouchableOpacity
					style={tw("absolute p-4 w-full h-20 items-center p-2")}
					onPress={() => nav.navigate("Printers")}
				>
					<Image style={tw("absolute top-0 h-10 w-40 ")} source={Printers} />
				</TouchableOpacity>
			</View>
			<View style={tw("bg-white-200 w-full h-20 justify-between ")}>
				<TouchableOpacity
					style={tw("absolute p-4 w-full h-20 items-center p-2")}
					onPress={() => nav.navigate("Electronics")}
				>
					<Image style={tw("absolute top-0 h-10 w-40 ")} source={Electronics} />
				</TouchableOpacity>
			</View>
			{/*             
            <TouchableOpacity 
                // onPress={() => swipeRef.current.swipeRight()}
                
                style={tw('items-center justify-center rounded-full w-full h-16 bg-gray-200')} onPress={() => nav.navigate('OtherRepairs')}>
                    <Text style={tw('text-center font-semibold text-2xl')}>Others</Text>

                </TouchableOpacity> */}
		</SafeAreaView>
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

export default RequestScreen;
