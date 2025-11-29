import { StatusBar } from "expo-status-bar";
import React, { Component, useState, useRef } from "react";
import { SafeAreaView } from "react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
//import { test_prepod } from "./data";

const Stack = createStackNavigator();
export default function TeacherPage({ navigation }: { navigation: any }) {
  const [input_text, onChangeText] = React.useState("");

  // const getGroupButtons = () => {
  //   let content = [];

  //   if (input_text != "") {
  //     for (let i = 0; i < test_prepod.length; i++) {
  //       const str = test_prepod[i];
  //       let flag = true;
  //       if (input_text.length > str.length) {
  //       } else {
  //         for (let j = 0; j < input_text.length; j++) {
  //           if (str[j] != input_text[j]) {
  //             flag = false;
  //           }
  //         }
  //         if (flag) {
  //           const onPress = () => loadFactPage({ text: test_prepod[i] });
  //           content.push(
  //             <TouchableOpacity style={styles.group_button} onPress={onPress}>
  //               <Text style={styles.group_button_text}>{test_prepod[i]}</Text>
  //             </TouchableOpacity>
  //           );
  //         }
  //       }
  //     }
  //   } else {
  //     for (let i = 0; i < test_prepod.length; i++) {
  //       const onPress = () => loadFactPage({ text: test_prepod[i] });
  //       content.push(
  //         <TouchableOpacity style={styles.group_button} onPress={onPress}>
  //           <Text style={styles.group_button_text}>{test_prepod[i]}</Text>
  //         </TouchableOpacity>
  //       );
  //     }
  //   }
  //   console.log(content.length);
  //   return content;
  // };

  const [contentHeight, setContentHeight] = useState(0);
  const scrollViewRef: any = useRef(null);
  const handleContentSizeChange = (contentWidth: any, height: any) => {
    setContentHeight(height);
  };

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    const isContentFullyVisible =
      contentSize.height <= layoutMeasurement.height;

    if (isContentFullyVisible || isScrolledToBottom) {
      scrollViewRef.current.scrollTo({ y: contentHeight, animated: false });
    }
  };

  const loadFactPage = (event: any) => {
    navigation.navigate("FactPage", { fact: { text: event.text } });
  };
  const image_press = () => {
    // Вызывается при нажатии на изображение
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      {/* <TouchableOpacity onPress={image_press} >
      <Image style={styles.image_button} source={require('../Source/images/back_icon.png')} />
    </TouchableOpacity> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={input_text}
      />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={handleContentSizeChange}
        onScroll={handleScroll}
      >
        {/* <View style={styles.button_view}>{getGroupButtons()}</View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button_view: {
    display: "flex",
    alignItems: "center",
  },
  group_button: {
    marginTop: 20,
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    display: "flex",
    // alignItems: 'center',
  },
  group_button_text: {
    width: 250,
    //height:50,
    fontSize: 30,
    color: "white",
    // display: "flex",
    // justifyContent:"center",
    // display: "flex",
    // flexWrap: "nowrap",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
  image_button: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});
