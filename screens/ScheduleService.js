import React, { useState, useContext } from "react";
import {
	Text,
	Button,
	TextInput,
	StyleSheet,
	View,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from "react-native";
import {} from "react-native-paper";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import themeContext from "../config/themeContext";
import { SelectList } from "react-native-dropdown-select-list";

const ScheduleService = (props) => {
	const theme = useContext(themeContext);

	const { navigation, route } = props;
	const { title } = route.params;

	const nav = useNavigation();

	const { user } = useAuth();
	const [repairType, setRepairType] = useState(title);
	const [deviceBrand, setDeviceBrand] = useState(brand);
	const [description, setDescription] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [email, setEmail] = useState(null);
	const [address, setAddress] = useState(null);
	const [date, setDate] = useState(null);

	const repairCategory = [
		{ key: "1", value: "Desktops" },
		{ key: "2", value: "Laptops" },
		{ key: "3", value: "Mobile Phones" },
		{ key: "4", value: "Accessory Replacement" },
		{ key: "5", value: "Printers & Scanners" },
		{ key: "6", value: "Electronic Appliances" },
	];

	const incompleteForm =
		!repairType ||
		!deviceBrand ||
		!description ||
		!phoneNumber ||
		!email ||
		!address ||
		!date;

	//create docs to send Schedule requests
	const sendRequest = () => {
		setDoc(doc(db, "schedules", user.uid), {
			id: user.uid,
			repairType: repairType,
			deviceType: deviceBrand,
			serviceFor: service,
			phoneNumber: phoneNumber,
			email: email,
			address: address,
			date: date,
			timestamp: serverTimestamp(),
		})
			.then(() => {
				nav.navigate("Thanks");
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<SafeAreaView
			style={[tw("top-7 p-2 h-full"), { backgroundColor: theme.background }]}
		>
			<View style={tw("items-center")}>
				<Text style={[tw("text-2xl font-bold p-3"), { color: theme.color }]}>
					Schedule Repair Service
				</Text>
			</View>

			<View style={tw("p-2")}>
				<Text style={[tw("font-bold"), { color: theme.color }]}>
					Repair Category:
				</Text>
				<SelectList
					data={repairCategory}
					save={value}
					setSelected={setRepairType}
					boxStyles={[
						{
							height: 30,
							width: 320,
							borderBottomWidth: 1,
							borderColor: "gray",
							borderWidth: 1,
							borderTopWidth: 0,
							borderLeftWidth: 0,
							borderRightWidth: 0,
						},
						{ color: theme.color },
					]}
				/>
			</View>

			<View style={tw("p-2")}>
				<Text style={[tw("font-bold"), { color: theme.color }]}>
					Device Brand:
				</Text>
				<TextInput
					value={deviceBrand}
					onChangeText={setDeviceBrand}
					style={[
						{
							height: 30,
							width: 320,
							borderBottomWidth: 1,
							borderColor: "gray",
							borderWidth: 1,
							borderTopWidth: 0,
							borderLeftWidth: 0,
							borderRightWidth: 0,
						},
						{ color: theme.color },
					]}
					placeholder="what's the brand of your device"
				/>
			</View>

			<View style={tw("p-2")}>
				<Text style={[tw("font-bold"), { color: theme.color }]}>
					Describe Device Problem :
				</Text>
				<TextInput
					value={description}
					onChangeText={setDescription}
					style={[
						{
							height: 30,
							width: 320,
							borderBottomWidth: 1,
							borderColor: "gray",
							borderWidth: 1,
							borderTopWidth: 0,
							borderLeftWidth: 0,
							borderRightWidth: 0,
						},
						{ color: theme.color },
					]}
					placeholder="Describe what you want to repair"
				/>
			</View>
			<View style={tw("p-2")}>
				<Text style={[tw("font-bold"), { color: theme.color }]}>
					WhatsApp Phone Number:
				</Text>
				<TextInput
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					style={[
						{
							height: 30,
							width: 320,
							borderBottomWidth: 1,
							borderColor: "gray",
							borderWidth: 1,
							borderTopWidth: 0,
							borderLeftWidth: 0,
							borderRightWidth: 0,
						},
						{ color: theme.color },
					]}
					keyboardType="numeric"
					placeholder="enter your WhatsApp phone number"
				/>
			</View>

			<View style={tw("p-2")}>
				<Text style={[tw("font-bold"), { color: theme.color }]}>
					Email Address:
				</Text>
				<TextInput
					value={email}
					onChangeText={setEmail}
					style={[
						{
							height: 30,
							width: 320,
							borderBottomWidth: 1,
							borderColor: "gray",
							borderWidth: 1,
							borderTopWidth: 0,
							borderLeftWidth: 0,
							borderRightWidth: 0,
						},
						{ color: theme.color },
					]}
					keyboardType="numeric"
					placeholder="enter your email address"
				/>
			</View>

			<View style={tw("p-2")}>
				<Text style={[tw("font-bold"), { color: theme.color }]}>
					Your Address:
				</Text>
				<TextInput
					value={address}
					onChangeText={setAddress}
					style={[
						{
							height: 30,
							width: 320,
							borderBottomWidth: 1,
							borderColor: "gray",
							borderWidth: 1,
							borderTopWidth: 0,
							borderLeftWidth: 0,
							borderRightWidth: 0,
						},
						{ color: theme.color },
					]}
					placeholder="enter your location"
				/>
			</View>

			<View style={tw("p-2")}>
				<Text style={[tw("font-bold"), { color: theme.color }]}>
					Date of Service:
				</Text>
				<TextInput
					value={date}
					onChangeText={setDate}
					style={[
						{
							height: 30,
							width: 320,
							borderBottomWidth: 1,
							borderColor: "gray",
							borderWidth: 1,
							borderTopWidth: 0,
							borderLeftWidth: 0,
							borderRightWidth: 0,
						},
						{ color: theme.color },
					]}
					placeholder="DD-MM-YY"
					keyboardType="numeric"
				/>
			</View>

			<View style={tw("pt-5")}>
				<TouchableOpacity
					disabled={incompleteForm}
					style={[
						tw(
							"items-center justify-center rounded-full w-26 h-16 bg-green-200"
						),
						incompleteForm ? tw("bg-gray-300") : tw("bg-green-400"),
					]}
					onPress={sendRequest}
				>
					<Text style={tw("text-xl font-bold text-black")}>Confirm</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ScheduleService;

const styles = StyleSheet.create({});
