import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card as RNECard, Button, Icon } from "react-native-elements";

const Card = ({ starship, onPress }) => {
  return (
    <RNECard
      title={starship.name}
      image={{ uri: "https://i.imgur.com/GTm8xom.png" }}
    >
      <View style={styles.info}>
        <Text style={styles.infoText}>Model : {starship.model}</Text>
        <Text style={styles.infoText}>
          Cost:{" "}
          {starship.cost_in_credits !== "unknown"
            ? `${starship.cost_in_credits} Credits`
            : "unknown"}
        </Text>
        <Text style={styles.infoText}>
          Cargo Capacity:{" "}
          {starship.cargo_capacity !== "unknown"
            ? `${starship.cargo_capacity} Tonnes`
            : "unknown"}
        </Text>
      </View>

      <Button
        icon={<Icon name="info" color="#ffffff" />}
        buttonStyle={styles.button}
        title="  More Info"
        onPress={() => onPress(starship)}
      />
    </RNECard>
  );
};

const styles = StyleSheet.create({
  info: {
    paddingLeft: 10,
    paddingBottom: 20
  },
  infoText: {
    fontSize: 14
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    width: 200,
    alignSelf: "center"
  }
});

export default Card;
