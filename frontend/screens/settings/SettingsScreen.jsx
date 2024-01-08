import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GradientButton from "../../components/GradentButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({ navigation }) => {
  const handelLogout = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("login");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <GradientButton
        title={"logout"}
        size={90}
        filled={true}
        onPress={handelLogout}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
