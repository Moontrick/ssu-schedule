import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { useRoute, CommonActions } from "@react-navigation/native";
import { getGroups, getStudentsSchedule } from "./data";
import { Group } from "./model";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function GroupPage({ navigation }: { navigation: any }) {
  const [isLoading, setLoading] = useState(true);
  const [groups, setGroups] = useState<Group[]>([]);
  const [input, setInput] = React.useState("");

  const route = useRoute();
  const department: any = route.params?.department;

  useEffect(() => {
    let res: any = getGroups("do", department?.text);
    var p = Promise.resolve(res);
    p.then(function (v: Group[]) {
      setGroups(v);
    });
    setLoading(false);
  }, []);

  const getGroupButtons = () => {
    let content = [];
    for (const group of groups) {
      const groupNumber = group.group_num;
      if (groupNumber.toLowerCase().startsWith(input.toLowerCase())) {
        const onPress = () => loadIndexPage({ text: groupNumber });
        content.push(
          <TouchableOpacity style={styles.group_button} onPress={onPress}>
            <Text style={styles.group_button_text}>{groupNumber}</Text>
          </TouchableOpacity>
        );
      }
    }

    return content;
  };

  const [contentHeight, setContentHeight] = useState(0);
  const scrollViewRef: any = useRef(null);
  const handleContentSizeChange = (contentWidth: any, height: any) => {
    setContentHeight(height);
  };

  const loadIndexPage = (event: any) => {
    getStudentsSchedule("do", department?.text, event.text);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Tab" , params: { screen: 'Меню',
          isDataSaved: true, }}],
      })
    );
    
  };

  return (
    <SafeAreaView>
      {}
      <TextInput
        placeholder="Введите номер..."
        style={styles.input}
        onChangeText={setInput}
        value={input}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={handleContentSizeChange}
          contentInset={{ bottom: 50 }}
        >
          <View style={styles.button_view}>{getGroupButtons()}</View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  button_view: {
    display: "flex",
    alignItems: "center",
  },
  group_button: {
    marginTop: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    display: "flex",
  },
  image_button: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  group_button_text: {
    width: 250,
    fontSize: 20,
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
