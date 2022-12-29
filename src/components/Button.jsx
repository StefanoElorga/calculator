import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { useFonts } from "expo-font";
const Button = ({
  equalBtn,
  onPress,
  title,
  textPurple,
  textBlue,
  haveIcon,
}) => {
  const [loaded] = useFonts({
    dosis: require("../../assets/fonts/ProductSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={equalBtn ? styles.equalBtn : styles.normalBtn}
      onPress={() => onPress()}
    >
      {haveIcon ? (
        <Icon name="delete" size={30} color="#e86565" />
      ) : (
        <Text
          style={
            textPurple
              ? styles.titleStylePurple
              : textBlue
              ? styles.textBlue
              : styles.titleStyle
          }
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  normalBtn: {
    backgroundColor: "#282b33",
    width: 77,
    height: 77,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45,
    margin: 5,
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "dosis",
  },
  equalBtn: {
    backgroundColor: "#e86565",
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45,
  },
  titleStylePurple: {
    fontSize: 30,
    fontWeight: "600",
    color: "#e86565",
    fontFamily: "dosis",
  },
  textBlue: {
    fontSize: 30,
    fontWeight: "600",
    color: "#24d4b6",
    fontFamily: "dosis",
  },
});
