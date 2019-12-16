import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { v1 } from "uuid";

const trimValue = (value = "") => {
  if (value.length > 19) {
    return `${value.slice(0, 19)}...`;
  }
  return value;
};

const StarshipDetail = ({ starship }) => {
  const texts = [];
  const skippedFields = ["created", "edited", "films", "url", "pilots"];
  for (const key in starship) {
    if (!skippedFields.includes(key)) {
      texts.push(
        <View style={styles.starshipDetail} key={`${starship.url}- ${v1()}`}>
          <Text>{key}:</Text>

          <Text>{trimValue(starship[key])}</Text>
        </View>
      );
    }
  }
  return <View>{texts}</View>;
};

export default StarshipDetail;

const styles = StyleSheet.create({
  starshipDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  }
});
