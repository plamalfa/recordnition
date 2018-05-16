import React from "react";
import { Constants, Camera, FileSystem, Permissions } from "expo";
import ImgToBase64 from "react-native-image-base64";
import { ImagePicker } from "expo";
import { Button, Image, View, Text, StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";

export default class HomeScreen extends React.Component {
  state = {
    image: null,
    description: "",
    loading: false
  };

  render() {
    let { image } = this.state;
    if (this.state.loading) {
      return (
        //Gif created from template on https://loading.io/
        <View style={styles.main}>
          <Image
            style={{ width: 300, height: 300, marginTop: 100 }}
            source={{
              uri: "https://i.imgur.com/Lz5q4CL.gif"
            }}
          />
          <Button
            title="Taking too long? Try Again"
            onPress={() => this.props.navigation.navigate("Home")}
          />
        </View>
      );
    }

    return (
      //Gif from Martin Thul's Behance (https://www.behance.net/gallery/26007755/Isometric-GIFs-(Vintage-Style))
      <View style={styles.main}>
        <Text style={styles.titleText}>Welcome to Recordnition!</Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly"
          }}
        >
          <Image
            style={{ width: 300, height: 200 }}
            source={{
              uri:
                "https://mir-s3-cdn-cf.behance.net/project_modules/disp/e421e126007755.5634e2c939668.gif"
            }}
          />
          <Button
            title="Instructions"
            onPress={() => this.props.navigation.navigate("Instructions")}
          />
          <Button title="Take a picture!" onPress={this._pickImage} />
        </View>
      </View>
    );
  }
  _pickImage = async () => {
    //code snippet from Expo's Camerja app (https://github.com/expo/camerja)
    this.setState({ loading: true });
    let result = await Expo.ImagePicker.launchCameraAsync({
      base64: true
    }); // base64: true means obj returns base64 string
    if (!result.cancelled) {
      const base64String = result.base64;
      fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDof-ri-S6rMgdkcIT7D0Msn4mYsstnl9k`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64String
                },
                features: [
                  {
                    type: "WEB_DETECTION"
                  }
                ]
              }
            ]
          })
        }
      )
        .then(APIData => {
          return APIData.json();
        })
        .then(APIJson => {
          console.log(APIJson);
          this.setState({
            description: APIJson.responses[0].webDetection.webEntities,
            loading: false
          });
          this.props.navigation.navigate("Results", {
            allDescriptions: this.state.description
          });
        })
        .catch(err => console.log(err));
    }
  };
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 75
  },
  main: {
    backgroundColor: "#fff9e5",
    flex: 1,
    alignItems: "center"
  }
});
