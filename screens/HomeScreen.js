import React, { useRef, useContext } from "react";
import {
	Text,
	View,
	Text as SwiperText,
	SafeAreaView,
	TouchableOpacity,
	Image,
	StyleSheet,
	NativeModules,
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
		firstName: "Phone",
		lastName: "Repairs",
		desc: "Mobile Phone Repairs",
		photoURL: Phone,
		state: "available",
		id: 1,
	},
	{
		firstName: "Laptop",
		lastName: "Repairs",
		desc: "Laptop repairs",
		photoURL: Laptop,
		state: "available",
		id: 2,
	},
	{
		firstName: "Desktop",
		lastName: "Repairs",
		desc: "Desktop Computer Repairs",
		photoURL: Desktop,
		state: "available",
		id: 3,
	},
	{
		firstName: "Accessories",
		lastName: "Replacement",
		desc: "Phone & Computer Accessories Replacement",
		photoURL: Accessories,
		state: "available",
		id: 4,
	},
	{
		firstName: "Printers & Scanners",
		lastName: "Repairs",
		desc: "Printers & Scanners Repair",
		photoURL: Printers,
		state: "available",
		id: 5,
	},
	{
		firstName: "Electronic",
		lastName: "Appliances",
		desc: "Repair of Electronic Appliances",
		photoURL: Electronics,
		state: "available",
		id: 6,
	},
];

const HomeScreen = () => {
	const navigation = useNavigation();
	const swipeRef = useRef(null);
	const theme = useContext(themeContext);

	return (
		<SafeAreaView
			style={[tw("top-5 flex-1"), { backgroundColor: theme.background }]}
		>
			{/* Header */}
			<View style={tw("flex-row items-center justify-between px-5")}>
				<TouchableOpacity>
					<Image style={tw("h-10 w-10 rounded-full")} source={userAvatar} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => NativeModules.DevSettings.reload()}>
					<Image style={tw("h-14 w-14")} source={require("../logo.png")} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate("Menu")}>
					<AntDesign name="setting" size={30} color="#76c893" />
				</TouchableOpacity>
			</View>

			{/* End of Header */}
			<View style={tw("items-center ")}>
				<Text style={[tw("text-xl font-bold"), { color: theme.color }]}>
					Available services
				</Text>
				<Text style={{ color: theme.color }}>8:00 AM To 5:00 PM</Text>
			</View>

			{/* cards */}

			<View style={tw("flex-1 -mt-6 ")}>
				<Swiper
					ref={swipeRef}
					containerStyle={{ backgroundColor: "transparent" }}
					cards={SERVICES}
					stackSize={5}
					cardIndex={0}
					animateCardOpacity
					verticalSwipe={false}
					onSwipedLeft={() => {
						console.log("Swipe PASS");
					}}
					onSwipedRight={() => {
						console.log("Swipe REQUEST");
						navigation.navigate("Request", { title: "Phone Checkup" }); //....navigate with props {cardIndex.desc}
					}}
					backgroundColor={"#4FD0E9"}
					overlayLabels={{
						left: {
							title: "NOPE",
							style: {
								label: {
									textAlign: "right",
									color: "red",
								},
							},
						},
						right: {
							title: "REQUEST",
							style: {
								label: {
									color: "#4DED30",
								},
							},
						},
					}}
					renderCard={(card) => (
						<View
							key={card.id}
							style={tw("relative bg-white h-3/4 rounded-xl")}
						>
							<Image
								style={tw("absolute top-0 h-full w-full rounded-xl")}
								source={card.photoURL}
							/>
							<View
								style={[
									tw(
										"absolute bottom-0 rounded-b-xl shadow-xl flex-row bg-white w-full h-20 justify-between items-center px-6 py-2"
									),
									styles.cardShadow,
								]}
							>
								<View>
									<SwiperText style={tw("text-xl font-bold")}>
										{card.firstName} {card.lastName}
									</SwiperText>
									<SwiperText>{card.desc}</SwiperText>
								</View>
								<SwiperText style={tw("text-2xl font-bold")}>
									{card.state}
								</SwiperText>
							</View>
						</View>
					)}
				/>
			</View>

			<View style={tw("flex flex-row justify-evenly bottom-12")}>
				<TouchableOpacity
					onPress={() => swipeRef.current.swipeLeft()}
					style={tw(
						"items-center justify-center rounded-full w-16 h-16 bg-red-200"
					)}
				>
					<Entypo name="cross" size={24} color="red" />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => swipeRef.current.swipeRight()}
					style={tw(
						"items-center justify-center rounded-full w-16 h-16 bg-green-200"
					)}
				>
					<Entypo name="tools" size={24} color="green" />
				</TouchableOpacity>
			</View>
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
});
