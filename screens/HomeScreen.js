import React, { useRef, useContext } from "react";
import {
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	Image,
	StyleSheet,
	NativeModules,
	ScrollView,
	Pressable,
	FlatList,
} from "react-native";
import {} from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import themeContext from "../config/themeContext";
import Laptop from "../assets/laptop-repairs.jpg";
import Phone from "../assets/phone-repairs.jpg";
import Desktop from "../assets/desktop-repairs.jpg";
import Accessories from "../assets/accessories.jpg";
import Printers from "../assets/printer.jpg";
import Electronics from "../assets/electronics.jpg";
import userAvatar from "../assets/avatar.jpg";

const SERVICES = [
	{
		name: "Phone Repairs",

		desc: "Mobile Phone Repairs",
		photoURL: Phone,

		id: 1,
	},
	{
		name: "Laptop Repairs",
		desc: "Laptop repairs",
		photoURL: Laptop,
		id: 2,
	},
	{
		name: "Desktop Repairs",

		desc: "Desktop Computer Repairs",
		photoURL: Desktop,

		id: 3,
	},
	{
		name: "Accessories",
		desc: "Phone Accessories",
		photoURL: Accessories,

		id: 4,
	},
	{
		name: "Printers",

		desc: "Printers & Scanners",
		photoURL: Printers,

		id: 5,
	},
	{
		name: "Electronics",
		desc: "Repair of Electronic Appliances",
		photoURL: Electronics,
		id: 6,
	},
];

const HomeScreen = () => {
	const navigation = useNavigation();
	const theme = useContext(themeContext);
	const [services, setServices] = React.useState(SERVICES);

	const servicesHeader = () => (
		<View style={tw("items-center ")}>
			<Text style={[tw("text-xl font-bold"), { color: theme.color }]}>
				Repair Services
			</Text>
			<Text style={{ color: theme.color }}>8:00 AM To 5:00 PM</Text>
		</View>
	);

	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigation.navigate(`${item.name}`)}
		>
			<View
				style={{
					height: 100,
					width: 80,
					marginBottom: 5,
					borderRadius: 10,

					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#f4f4f4",
					padding: 10,
				}}
			>
				<Image
					source={item.photoURL}
					resizeMode="contain"
					style={{
						height: 70,
						width: 70,
					}}
				/>
			</View>
			<Text style={{ textAlign: "center", flexWrap: "wrap", fontSize: 12 }}>
				{item.name}
			</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={[tw("top-5 flex-1"), { backgroundColor: "#fff" }]}>
			{/* Header */}
			<View style={tw("flex-row items-center justify-between px-5")}>
				<TouchableOpacity>
					<Image style={tw("h-10 w-10 rounded-full")} source={userAvatar} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => NativeModules.DevSettings.reload()}>
					<Image style={tw("h-14 w-24")} source={require("../logo.png")} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate("Menu")}>
					<AntDesign name="setting" size={30} color="#76c893" />
				</TouchableOpacity>
			</View>
			{/* End of Header */}

			{/* services */}
			<FlatList
				ListHeaderComponent={servicesHeader}
				data={services}
				numColumns={3}
				columnWrapperStyle={{ justifyContent: "space-around" }}
				keyExtractor={(item) => `${item.id}`}
				renderItem={renderItem}
				style={{ marginTop: 40 }}
			/>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	cardShadow: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
	container: {
		marginBottom: 20,
		width: 100,
		alignItems: "center",
		marginTop: 40,
	},
});
