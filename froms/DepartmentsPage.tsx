import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Department } from "./model";
import { getDepartments, getDepartmentsLocal } from "./data";

export default function DepartmentsPage({ navigation }: { navigation: any }) {
  const [input, setInput] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);

  const getDepartmentsButtons = () => {
    let content = [];
    
    for (const department of departments) {
      const shortName = department.short_name;
      if (shortName.toLowerCase().startsWith(input.toLowerCase())) {
        const onPress = () =>
          navigation.navigate("GroupPage", {
            department: { text: department.url },
          });
        content.push(
          <TouchableOpacity style={styles.group_button} onPress={onPress}>
            <Text style={styles.group_button_text}>{shortName}</Text>
            <Text style={styles.group_button_text_under}>
              {department.full_name}
            </Text>
          </TouchableOpacity>
        );
      }
    }
    return content;
  };

  useEffect(() => {
    let res: any = getDepartmentsLocal();
    // res.then((departments: any) => {
    //   if (!departments) {
    //     console.log("Данные не найдены");
    //     res = getDepartments();
    //   }
    // });
    var p = Promise.resolve(res);
    console.log(p)
    console.log(res);
    p.then(function (v: Department[]) {
      setDepartments(v);
    });
    
  }, []);

  const [_, setContentHeight] = useState(0);
  const scrollViewRef = useRef(null);
  const handleContentSizeChange = (_: any, height: any) => {
    setContentHeight(height);
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Введите название..."
        style={styles.input}
        onChangeText={setInput}
        value={input}
      />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={handleContentSizeChange}
        contentInset={{ bottom: 50 }}
      >
        <View style={styles.button_view}>{getDepartmentsButtons()}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  find_fact_text_up: {
    fontSize: 18,
  },
  find_fact_view: {
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  button_view: {
    display: "flex",
    alignItems: "center",
  },
  group_button: {
    width: "90%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    display: "flex",
    paddingLeft: 15,
  },
  image_button: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  group_button_text: {
    fontSize: 20,
    color: "black",
    textAlign: "left",
    textAlignVertical: "center",
  },
  group_button_text_under: {
    fontSize: 15,
    color: "gray",
    textAlign: "left",
    textAlignVertical: "center",
  },
});
