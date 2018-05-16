import React from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  Alert
} from "react-native";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.getDiscogSearch = this.getDiscogSearch.bind(this);
    this.queryStateHandler = this.queryStateHandler.bind(this);
    this.state = {
      result: "",
      fetched: false,
      query1: "",
      query2: ""
      // buttonColor: "#0066ff",
      // pressedButtonColor: "#000099"
    };
  }
  render() {
    const { params } = this.props.navigation.state;
    const allDescriptions = params.allDescriptions;
    const allValidDescriptions = allDescriptions.filter(
      descriptionListItem => !!descriptionListItem.description
    );
    const descriptionItems = allValidDescriptions.map(descriptionItem => {
      if (
        descriptionItem.description == this.state.query1 ||
        this.state.query2
      ) {
      }
      return (
        <View
          style={{
            backgroundColor: "#fff9e5",
            margin: 10
          }}
        >
          <Button
            color={
              descriptionItem.description === this.state.query1 ||
              descriptionItem.description === this.state.query2
                ? "#000099"
                : "#0066ff"
            }
            title={descriptionItem.description}
            onPress={() => this.queryStateHandler(descriptionItem)}
          />
        </View>
      );
    });
    // const descriptions = firstDescription
    //   .concat("", secondDescription)
    //   .replace(/\s+/g, "_");
    const descriptions = `${this.state.query1}_${this.state.query2}`.replace(
      /\s+/g,
      "_"
    );
    if (!this.state.fetched) {
      return (
        <View
          style={{
            backgroundColor: "#fff9e5",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly"
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Select the ARTIST & ALBUM name from the list below
          </Text>
          <View style={{ height: 300, width: 300 }}>
            <ScrollView>{descriptionItems}</ScrollView>
          </View>
          <Button
            color="red"
            title="Search Discogs"
            onPress={() => this.getDiscogSearch(descriptions)}
          />
        </View>
      );
    } else {
      let result = this.state.result;
      let resultItems = result.map(resultItem => (
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: 10
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: resultItem.thumb }}
          />
          <Text style={{ fontWeight: "bold" }}>{resultItem.title}</Text>
          <Text style={{ fontWeight: "bold" }}>{resultItem.label[0]}</Text>
          <Text style={{ fontWeight: "bold" }}>{resultItem.year}</Text>
          <Text style={{ fontWeight: "bold" }}>{resultItem.genre[0]}</Text>
          <Text style={{ fontWeight: "bold" }}>{resultItem.type}</Text>
          <Button
            title="View More Details"
            onPress={() => {
              Linking.openURL(`https://discogs.com${resultItem.uri}`);
            }}
          />
        </View>
      ));
      if (!this.state.result) {
        return (
          <View style={styles.main}>
            <Text>Sorry, no results for this search :/</Text>
            <Button
              title="Please try again!"
              onPress={() => this.props.navigation.navigate("Home")}
            />
          </View>
        );
      } else {
        return (
          <ScrollView style={{ flex: 1, backgroundColor: "#fff9e5" }}>
            <View>{resultItems}</View>
          </ScrollView>
        );
      }
    }
  }
  queryStateHandler(descriptionItem) {
    if (this.state.query1) {
      this.setState({
        query2: descriptionItem.description
      });
    } else {
      this.setState({
        query1: descriptionItem.description
      });
    }
  }

  getDiscogSearch(descriptions) {
    if (this.state.query1 && this.state.query2) {
      fetch(
        `https://sheltered-beyond-73183.herokuapp.com/search?query=${descriptions}`
      )
        .then(result => result.json())
        .then(result => {
          console.log(result);
          this.setState({
            result: result,
            fetched: true
          });
        });
    } else {
      Alert.alert("Select an ARTIST & ALBUM name");
    }
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff9e5",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});
