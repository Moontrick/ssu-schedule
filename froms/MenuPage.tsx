import React, {useEffect, useState} from "react";
import { Button } from "@rneui/themed";
import { StyleSheet, View, Text, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MenuPage({ navigation}: { navigation: any}) {




  createNativeStackNavigator();
  const btnStyle = {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  };
  const btnContainerStyle = {
    width: 250,
    marginHorizontal: 50,
    marginVertical: 10,
  };
  const btnTitleStyle = {
    color: "black",
  };
  const removeDepartments = async () => {
    try {
      await AsyncStorage.removeItem("departments");
      console.log("Хранилище успешно удалено");
    } catch (error) {
      console.log("Ошибка при удалении хранилища:", error);
    }
  };
  return (
    <View style={styles.menu_block}>
      <View style={styles.buttons_block}>
        <Button
          onPress={() => navigation.navigate("DepartmentsPage")}
          title="Поиск группы"
          buttonStyle={btnStyle}
          containerStyle={btnContainerStyle}
          titleStyle={btnTitleStyle}
        />
        <Button
          title="Поиск преподавателя"
          onPress={() => navigation.navigate("TeacherPage")}
          buttonStyle={btnStyle}
          containerStyle={btnContainerStyle}
          titleStyle={btnTitleStyle}
        />
        {/* TODO: Fix this button */}
        <Button
          title="Изменить группу"
          onPress={() =>removeDepartments()
            //navigation.navigate("DepartmentsPage")
          }
          buttonStyle={btnStyle}
          containerStyle={btnContainerStyle}
          titleStyle={btnTitleStyle}
        />
      </View>
      <View style={styles.footer}>
        {/* <Text>C.P. @ CSIT Production</Text> */}
        <Image  style={styles.footer_image} source={require("../Source/images/Schedule.png")} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  menu_block: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: "white",
  },
  buttons_block: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  footer_image:{
    width:"50%",
    resizeMode:"contain"
  },
  footer: {
    
    display: "flex",
   
    alignItems:"center",
    //height: 50,
    //alignSelf: "center",
    marginBottom: "5%"
  },
  title: {
    textAlign: "center",
    marginVertical: 80,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});
