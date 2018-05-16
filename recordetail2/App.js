import React from "react";
import { Button, Image, View } from "react-native";
import { StackNavigator } from "react-navigation";
import HomeScreen from "../recordetail2/Home";
import AppInstructions from "../recordetail2/Instructions";
import Results from "../recordetail2/Results";
import Descriptions from "../recordetail2/Descriptions";

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Instructions: {
      screen: AppInstructions
    },
    Results: {
      screen: Results
    },
    Descriptions: {
      screen: Descriptions
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
