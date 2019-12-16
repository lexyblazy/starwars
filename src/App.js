import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { Overlay, Button } from "react-native-elements";
import { v1 } from "uuid";
import axios from "axios";
import Card from "./components/Card";
import StarshipDetail from "./components/StarshipDetail";

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
      this.renderStarshipDetail();
    });
  };

  closeOverlay = () => this.setState({ selectedStarship: null });

  renderStarshipDetail = () => {
    const { selectedStarship } = this.state;

    return (
      <Overlay
        isVisible={!!selectedStarship}
        onBackdropPress={this.closeOverlay}
        containerStyle={styles.overlay}
        children={
          <View>
            <View style={styles.detailsContainer} key={v1()}>
              <StarshipDetail starship={selectedStarship} />
            </View>
            <Button
              title="close"
              onPress={this.closeOverlay}
              style={styles.closeButton}
              key={v1()}
            />
          </View>
        }
      />
    );
  };

  renderSplashScreen = () => {
    const { loading } = this.state;
    return (
      <View style={styles.splashScreen}>
        {loading ? (
          <>
            <ActivityIndicator size={50} color="#FFF" />
            <Text style={styles.splashText}>Loading Starships</Text>
          </>
        ) : (
          <Text>No Starships found</Text>
        )}
      </View>
    );
  };

  renderStarShips = () => {
    const { starships, loading } = this.state;

    if (starships.length < 1) {
      return this.renderSplashScreen();
    }
    return (
      <FlatList
        data={starships}
        renderItem={({ item }) => (
          <Card starship={item} onPress={this.onStarshipSelected} />
        )}
        keyExtractor={item => `${item.url}-${v1()}`}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderStarshipDetail()}
        {this.renderStarShips()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  overlay: {
    flexDirection: "column"
  },
  closeButton: { width: 100 },
  detailsContainer: {
    marginBottom: 50
  },
  splashScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db"
  },
  splashText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold"
  }
});
