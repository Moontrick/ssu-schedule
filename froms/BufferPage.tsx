import React, {useEffect, useState} from "react";
import { Button } from "@rneui/themed";
import { StyleSheet, View, Text, Image} from "react-native";
import { CommonActions, StackActions } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDepartments, getDepartmentsLocal } from "./data";
import { SafeAreaView } from "react-native-safe-area-context";
export default function BufferPage({ navigation }: { navigation: any }) {

    return (
        <View style={styles.App}>
            {/* <SafeAreaView style={styles.Header}>
                <Image   style={styles.header_image}source={require("../Source/images/buffimage.png")} />  
            </SafeAreaView> */}
            <View style={styles.Header}>
                <Image  style={styles.header_image}  source={require("../Source/images/buffimage.png")} />  
            </View>
            <View style={styles.footer}>
                <View>
                    <Button
                        onPress={() => navigation.navigate("DepartmentsPage")}
                        title="Поиск группы"
                        buttonStyle={styles.btnStyle}
                        containerStyle={styles.btnContainerStyle}
                        titleStyle={styles.btnTitleStyle}
                    />
                </View>
                
            </View>       
            <Image  style={styles.footer_image} source={require("../Source/images/Schedule.png")} />  
        </View>
    );
};

const styles = StyleSheet.create({
    header_image:{
        //marginTop:"5%",
        width:"100%",
        height:"100%",
        resizeMode:"cover"
    },
    btnStyle:{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    },
    btnContainerStyle:{
        width: 250,
    },
    btnTitleStyle:{
        color: "black",
    },
    butt:{
        marginTop:"50%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    App:{
        alignItems:"center",
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"space-between",
    },
    Header:{
        
        display:"flex",
        flexDirection: "column",
        
        //justifyContent:"space-between",
        backgroundColor:"#49B293",
        width:"100%",
        height:"30%",
    },
    footer:{
      
        display:"flex",
        alignItems:"center",
        flexDirection: "column",
        //justifyContent:"space-between"
    },
    footer_image:{
        marginBottom:"5%",
        width:"50%",
        resizeMode:"contain"
      },
  });