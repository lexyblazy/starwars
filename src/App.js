import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import Card from "./components/Card";

export default class App extends Component {
  state = { starships: [], loading: true, selectedStarship: null };
  async componentDidMount() {
    this.getStarships();
  }

  getStarships = async () => {
    try {
      const BASE_URL = "https://swapi.co/api";
      const res = await axios.get(`${BASE_URL}/starships`);
      this.setState({ starships: res.data ? res.data.results : [] });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  onStarshipSelected = starship => {
    this.setState({ selectedStarship: starship }, () => {
      console.log(this.state.selectedStarship);
    });
  };

  renderStarShips = () => {
    const { starships, loading } = this.state;

    if (starships.length < 1) {
      return <Text>{loading ? "Loading" : "No starships found"}</Text>;
    }
    return (
      <FlatList
        data={starships}
        renderItem={({ item }) => (
          <Card starship={item} onPress={this.onStarshipSelected} />
        )}
        keyExtractor={item => item.url}
      />
    );
  };

  render() {
    return <View style={styles.container}>{this.renderStarShips()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
