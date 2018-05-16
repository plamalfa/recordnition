import React from "react";
import { Button, Image, View, Text, StyleSheet } from "react-native";

export default class AppInstructions extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.bodyText}>
          Welcome to Recordnition! To get started, press the 'Take a Picture'
          button and snap a photo of an album cover. Then select the name of the
          artist and album cover to view a list of releases.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 40,
    marginRight: 40
  },
  main: {
    backgroundColor: "#fff9e5",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
