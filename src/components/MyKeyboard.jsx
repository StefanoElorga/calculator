import { StyleSheet, Text, View, ScrollView, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";

const MyKeyboard = () => {
  const [number, setNumber] = useState("");
  const [lastOperation, setLastOperation] = useState("");
  const [modal, setModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(new Animated.Value(560));
  useEffect(() => {
    Animated.timing(open, {
      toValue: modal ? 0 : 560,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [modal]);

  const [loaded] = useFonts({
    dosis: require("../../assets/fonts/ProductSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const buttonPressed = (value) => {
    if (number.length <= 25) {
      if (value === "+" || value === "-" || value === "*" || value === "/") {
        setNumber(number + " " + value + " ");
        return;
      }
      setNumber(number + value);
    }

    switch (value) {
      case "del":
        setNumber(number.substring(0, number.length - 1));
        break;
      case "c":
        setNumber("");
        setLastOperation("");

        break;

      case "=":
        if (number.length > 0) {
          setLastOperation(number);
          var operation = number;
          var result = new Function("return (" + number + ")")();
          var fixedResult = result.toString().includes(".")
            ? result.toFixed(2).toString()
            : result.toString();
          setNumber(fixedResult);
          setHistory([
            ...history,
            {
              operation: operation,
              fixedResult: fixedResult,
            },
          ]);
        } else {
          return;
        }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: -190,
          zIndex: 2,
          justifyContent: "center",
          alignItems: "center",
          right: 310,
        }}
      >
        <Icon
          name="history"
          size={30}
          color="#e86565"
          onPress={() => {
            setModal(!modal);
          }}
        />
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        {lastOperation.length > 0 ? (
          <Text style={styles.lastOperation}>{lastOperation} =</Text>
        ) : null}
        <Text
          style={
            number.length >= 0 && number.length <= 8
              ? styles.numberStyle
              : number.length >= 9 && number.length <= 15
              ? styles.numberStyleMin
              : styles.numberStyleSuperMin
          }
        >
          {number}
        </Text>
      </View>

      <View style={styles.row}>
        <Button
          title={"AC"}
          onPress={() => {
            buttonPressed("c");
          }}
          textBlue
        />

        <Button
          title={"±"}
          onPress={() => {
            buttonPressed("±");
          }}
          textBlue
        />

        <Button
          title={"%"}
          onPress={() => {
            buttonPressed("%");
          }}
          textBlue
        />

        <Button
          title={"÷"}
          onPress={() => {
            buttonPressed("/");
          }}
          textPurple
        />
      </View>

      <View style={styles.row}>
        <Button
          title={"7"}
          onPress={() => {
            buttonPressed("7");
          }}
        />
        <Button
          title={"8"}
          onPress={() => {
            buttonPressed("8");
          }}
        />
        <Button
          title={"9"}
          onPress={() => {
            buttonPressed("9");
          }}
        />

        <Button
          title={"x"}
          onPress={() => {
            buttonPressed("*");
          }}
          textPurple
        />
      </View>

      <View style={styles.row}>
        <Button
          title={"4"}
          onPress={() => {
            buttonPressed("4");
          }}
        />
        <Button
          title={"5"}
          onPress={() => {
            buttonPressed("5");
          }}
        />
        <Button
          title={"6"}
          onPress={() => {
            buttonPressed("6");
          }}
        />

        <Button
          title={"-"}
          onPress={() => {
            buttonPressed("-");
          }}
          textPurple
        />
      </View>

      <View style={styles.row}>
        <Button
          title={"1"}
          onPress={() => {
            buttonPressed("1");
          }}
        />
        <Button
          title={"2"}
          onPress={() => {
            buttonPressed("2");
          }}
        />
        <Button
          title={"3"}
          onPress={() => {
            buttonPressed("3");
          }}
        />

        <Button
          title={"+"}
          onPress={() => {
            buttonPressed("+");
          }}
          textPurple
        />
      </View>
      <View style={styles.row}>
        <Button
          onPress={() => {
            buttonPressed("del");
          }}
          haveIcon
        />

        <Button
          title={"0"}
          onPress={() => {
            buttonPressed("0");
          }}
        />
        <Button
          title={"."}
          onPress={() => {
            buttonPressed(".");
          }}
        />

        <Button
          title={"="}
          equalBtn
          onPress={() => {
            buttonPressed("=");
          }}
        />
      </View>

      <Animated.ScrollView style={[styles.modalActive, { top: open }]}>
        {history
          .map((el, i) => (
            <View style={styles.operationsStyles} key={i}>
              <Text style={styles.textHistoryStyle}>{el.operation}=</Text>
              <Text style={styles.textHistoryStyle}>{el.fixedResult}</Text>
            </View>
          ))
          .reverse()}
      </Animated.ScrollView>
    </View>
  );
};

export default MyKeyboard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#22252d",
    width: "100%",
  },
  numberStyle: {
    fontSize: 60,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "dosis",
    right: 15,
  },
  numberStyleMin: {
    fontSize: 50,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "dosis",
    right: 15,
  },
  numberStyleSuperMin: {
    fontSize: 34,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "dosis",
    right: 15,
  },
  row: { flexDirection: "row" },
  lastOperation: {
    fontSize: 30,
    color: "#bcbec2",
    fontWeight: "600",
    fontFamily: "dosis",
    right: 15,
  },
  modalActive: {
    backgroundColor: "rgba(232, 100, 100, 0.73)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },

  operationsStyles: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    alignItems: "center",
  },
  textHistoryStyle: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 10,
    fontFamily: "dosis",
  },
  noOperations: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "dosis",
  },
});
