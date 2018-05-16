import React from "react";
import { Button, Image, View, Text, StyleSheet, Linking } from "react-native";

export default class Descriptions extends React.Component {
  render() {
    const results = this.props.result;
    // const resultItems = results.map(result => <Text>{result.title}</Text>);
    return <Text>{results}</Text>;
  }
}
