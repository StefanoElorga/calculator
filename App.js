import React from "react";
import { SafeAreaView } from "react-native";
import MyKeyboard from "./src/components/MyKeyboard";
export default function App() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#22252d",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MyKeyboard />
    </SafeAreaView>
  );
}
