import React, {useEffect, useState} from "react";
import { Button } from "@rneui/themed";
import { StyleSheet, View, Text } from "react-native";
import { CommonActions, StackActions } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDepartments, getDepartmentsLocal } from "./data";
export default function StartPage({ navigation }: { navigation: any }) {
    const test = async ()=>{
        
        navigation.navigate("DepartmentsPage")
    }
    const [isStart, setStart] = useState(false)
    const checkDepartmentsStorage = async () => {
        const departments = await AsyncStorage.getItem("departments");
        if (departments === null) {
          console.log("Хранилище 'departments' не существует");
          await getDepartments();
          return false;
        } else {
          console.log("Хранилище 'departments' существует");
          return true;
        }
      };
      useEffect(() => {
        var res = false;
        checkDepartmentsStorage().then((result) => {
          if (result === false) {
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: "BufferPage",
                      params: { animationEnabled: false },
                    },
                  ],
                })
              );
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "Tab",
                    params: { animationEnabled: false },
                  },
                ],
              })
            );
          }
        });
      
        console.log(res);
        console.log(isStart);
      }, []);
      
    return (
        <View>
       
        </View>
    );
};

const styles = StyleSheet.create({
    butt:{
        marginTop:"50%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
  });