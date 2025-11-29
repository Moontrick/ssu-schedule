import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { months, timeRanges, isOddWeek, getCurrLesson, timeToString } from "./TimeUtils";
import { useIsFocused } from '@react-navigation/native';
import {
  getStudentsSchedule,
  readScheduleInfo,
  getStudentsScheduleLocal,
} from "./data";
import { StudentsSchedule } from "./model";
export default function HomePage({ navigation }: { navigation: any }) {
  const [currLesson, setCurrLesson] = useState<any>(-1);
  const [currDay, setCurrentDay] = useState<any>(1);
  const [currMonth, setCurrentMonth] = useState<any>(1);
  const [weekType, setCurrentWeekType] = useState<any>(1);

  const [dataMap, setDataMap] = useState(new Map());
  const [lessonsName, setlessonsName] = useState<string[]>([]);
  const [theacherName, setTheacherName] = useState<string[]>([]);
  const [subgroup, setSubgroup] = useState<string[]>([]);
  const [lessonType, setLessonType] = useState<string[]>([]);
  const [lessonPlace, setLessonPlace] = useState<string[]>([]);
  const [countPairInTime, setcountPairInTime] = useState<number>(0);

  const getNCountPair = (count: any, content1: any[],thc_name: any[], sub_group: any[],les_type: any[] ,les_place: any[]) => {
    let content = [];
    //console.log("das" + count)
    for (let j = 0; j < count; j++) {
      console.log(subgroup);
      content.push(
        <View
          style={styles.lable1_slide}
        >
          <View style={styles.label_1_up_slider}>
            <Text style={styles.name_par_slider}> {content1[j]}</Text>
            <View style={styles.label_1_up_text_block}>
              <Text style={styles.label_1_up_text_3_slider}>{sub_group[j]}</Text>
            </View>
          </View>
          <View style={styles.label_1_down_slider}>
            <View style={styles.label_1_down_location}>
              <Image source={require("../Source/images/location.png")} />
              <Text style={styles.mesto}>{les_place[j]}</Text>
            </View>
            <View style={styles.label_1_down_location_down}>
              <Image source={require("../Source/images/icon_person.png")} />
              <Text style={styles.label_1_center_text_2}>
                {thc_name[j]}
              </Text>
            </View>
            <View style={styles.label_1_down_location_down_down_slide}>
              <Image source={getIconPair(lessonType[j])} />
              <Text
                style={styles.label_1_center_text_2_down}
                id="label-1-up-text-2"
              >
                {les_type[j]}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return content;
  };
  const getIconPair = (value: any) => {
    console.log(value)
    if (value == "Лекция") {
      return require("../Source/images/type_pair_lec.png");
    } else if (value == "Практика") {
      return require("../Source/images/type_pair_prac.png");
    } else if (value == "Лабораторная") {
      return require("../Source/images/type_pair_lab.png");
    } else {
      return require("../Source/images/type_pair_lec.png");
    }
  };
  
  const getAnimalsContent = () => { 
 
    let i = 0;
    //console.log(dataMap)

    const currentDate = new Date();
    var daytInWeek = currentDate.getDay();
    //console.log("daytInWeek "+daytInWeek);
    //console.log(dataMap)
    const content1: any[] = [];
    const thc_name: any[] = [];
    const sub_group: any[] = [];
    const les_type: any[] = [];
    const les_place: any[] = [];
    let countPairsMap:number = 0;
    
    if (dataMap.has(daytInWeek)) {
      const dayData = dataMap.get(daytInWeek);
      
      //console.log(currLesson)
      dayData.forEach((lesson: any) => {
        const __les_name = lesson.lesson_name;
        const __thc_name = lesson.teacher;
        const __sub_group = lesson.subgroup_name;
        let __les_type = lesson.lesson_type;
        const __les_place = lesson.lesson_place;
        const __count_pair = lesson.lesson_number;
        console.log("__count_pair" + __count_pair)
        console.log("currLesson" + currLesson)
        if(__count_pair == (currLesson + 1)){
        countPairsMap = countPairsMap + 1;
       
        if (__les_name && __les_name.length > 0) {
          content1.push(__les_name);
        }
        if (__thc_name && __thc_name.length > 0) {
          thc_name.push(__thc_name);
        }
        sub_group.push(__sub_group);
        if (__les_type && __les_type.length > 0) {
          if (__les_type === "PRACTICE") {
            __les_type = "Практика";
          } else if (__les_type === "LECTURE") {
            __les_type = "Лекция";
          } else if (__les_type === "LABORATORY") {
            __les_type = "Лабораторная";
          }
          les_type.push(__les_type);
        }
        if (__les_place && __les_place.length > 0) {
          les_place.push(__les_place);
        }
      }
      });
    }

    let content: any[] = [];
    //console.log(countPairsMap)



    //for(let i =0; i<countPairsMap; i++){
      //console.log(`Количество пар в номере ${countPair}: ${count}`);
      if (countPairsMap == 1) {
        content.push(
          <View style={styles.schedule_block}>
            <View style={styles.schedule_block_time}>
            <Text style={styles.time} id="time">
                {timeToString(timeRanges[currLesson].start)}
              </Text>
              <Text style={styles.time_down} id="time">
                {timeToString(timeRanges[currLesson].end)}
              </Text>
            </View>
            <View
              id="l-1"
              style={styles.lable1_Curr_time}
            >
              <View style={styles.label_1_up}>
                <Text id="name_par" style={styles.name_par}>
                  {" "}
                  {content1[i]}
                </Text>
                <View style={styles.label_1_up_text_block}>
                  <Text style={styles.label_1_up_text_3} id="label-1-up-text-3">
                    {" "}
                    {sub_group[i]}
                  </Text>
                </View>
              </View>
              <View style={styles.label_1_down}>
                <View style={styles.label_1_down_location}>
                  <Image source={require("../Source/images/location.png")} />
                  <Text style={styles.mesto}>{les_place[i]}</Text>
                </View>
                <View style={styles.label_1_down_location_down}>
                  <Image source={require("../Source/images/icon_person.png")} />
                  <Text
                    id="label-1-center-text-2"
                    style={styles.label_1_center_text_2}
                  >
                    {thc_name[i]}
                  </Text>
                </View>
              </View>
              <View style={styles.label_1_down_location_down_down}>
                <Image source={getIconPair(lessonType[i])} />
                <Text
                  style={styles.label_1_center_text_2_down}
                  id="label-1-up-text-2"
                >
                  {les_type[i]}
                </Text>
              </View>
            </View>
          </View>
        );
        i = i + 1;
      } else if (countPairsMap > 1){
        content.push(
          <View style={styles.schedule_block}>
            <View style={styles.schedule_block_time}>
            <Text style={styles.time} id="time">
                {timeToString(timeRanges[i].start)}
              </Text>
              <Text style={styles.time_down} id="time">
                {timeToString(timeRanges[i].end)}
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentInset={{ right: 30 }}
            >
              {getNCountPair(countPairInTime, content1,thc_name, sub_group,les_type ,les_place)}
            </ScrollView>
          </View>
        );
      //}
    };
    return content;
  };



  //getStudentScheduleLocal -> json
  //dataMap -> Map
  // for dataMap -> dataMap(currLesons)
  // View



  const currentLessonBlock = () => {
    let content = [];
    
    if (currLesson != -1) {
      content = getAnimalsContent();
    }
    console.log(content)
    return content;
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
    setCurrLesson(getCurrLesson());

    const currentDate = new Date();
    setCurrentMonth(months[currentDate.getMonth()]);
    setCurrentWeekType(isOddWeek() ? "числитель" : "знаменатель");
    setCurrentDay(currentDate.getDate());


 
    let res = getStudentsScheduleLocal();
    var p = Promise.resolve(res);
    var schedule = new Map();
    p.then(function (v) {
      v?.forEach((lesson: any) => {
        const dayNum = lesson.day_num;
        if (schedule.has(dayNum)) {
          schedule.get(dayNum).push(lesson);
        } else {
          schedule.set(dayNum, [lesson]);
        }
      });
      schedule.forEach((daySchedule) => {
        daySchedule.sort((a: any, b: any) => a.lesson_number - b.lesson_number);
      });
      setDataMap(schedule);
    });
    // res.then((value: any) => { setDataMap(value);  //
    //   console.log(value); //все значения
    //   console.log(dataMap)}); //нуль
    //setDataMap(res);
  }

  }, [isFocused]);

  const currentDayBlock = () => {
    return (
      <View style={styles.current_day}>
        <Text style={{ fontSize: 50 }}>{currDay}</Text>
        <View style={styles.current_day_text_margin}>
          <Text style={styles.current_day_text}>{currMonth}</Text>
          <Text style={styles.current_day_text}>{weekType}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.HomeApp}>
        <Text style={styles.current_day_block}>Сегодня</Text>
        {currentDayBlock()}
        <Text style={styles.current_lesson_block}>Текущая пара</Text>
        {getAnimalsContent()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 50,
  },
  container: {
    backgroundColor: "lightblue",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  expandedBlock: {
    backgroundColor: "white",
    padding: 20,
  },
  current_lesson_block: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    fontSize: 25,
    marginBottom: 15,
  },
  HomeApp: {
    marginTop: "5%",
    display: "flex",
    justifyContent: "center",
  },
  block: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    backgroundColor: "#46d5aa",
    margin: 10,
    borderRadius: 30,
  },

  back: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  back_text: {
    fontSize: 50,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label_info_up_right_text: {
    fontSize: 20,
    color: "#46d5aa",
  },
  visible_label_info_up_right: {
    display: "none",
  },
  label_info_up_right: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: "5%",
    width: 100,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#e6f4ef",
    display: "flex",
  },
  label_info_up: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }, label_1_center_text_2_down: {
    fontSize: 17,
    marginLeft: 7,
  },label_1_down_location_down_down: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 15,
  },
  label_1_down_location_down_down_slide: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 2,
  },
  label_1_down_location_down: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  label_1_down_location: {
    display: "flex",
    flexDirection: "row",
  },
  location_img: {
    width: 100,
    height: 100,
  },
  label_info: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "2%",
  },
  schedule_block_time: {
    marginLeft: "5%",
  },
  schedule_block: {
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "row",
  },
  lable1: {
    marginLeft: "5%",
    marginRight: "5%",
    display: "flex",
    flexDirection: "column",
    height: 170,
    width: "70%",
    borderRadius: 20,
    backgroundColor: "#FFFAFA",
    alignContent: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  lable1_Curr_time: {
    marginLeft: "5%",
    marginRight: "5%",
    display: "flex",
    flexDirection: "column",
    height: 170,
    width: "70%",
    borderRadius: 20,
    backgroundColor: "#46d5aa",
    alignContent: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  label_1_up_text_block: {
    display: "flex",
    flexDirection: "row",
  },
  mesto: {
    fontSize: 17,
    marginLeft: 7,
  },
  name_par: {
    fontSize: 17,
    marginBottom: 10,
  },
  label_1_up: {
    flexDirection: "column",

    marginLeft: "5%",
    display: "flex",
    justifyContent: "flex-start",
  },
  label_1_up_sub: {
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "60%",
    display: "flex",
    justifyContent: "flex-start",
  },
  label_1_up_text_1: {
    fontSize: 17,
  },
  label_1_up_text_2: {
    marginLeft: 5,
    fontSize: 17,
  },
  label_1_up_text_3: {
    marginRight: "5%",
    fontSize: 17,
  },
  time: {
    marginBottom: 10,
    fontSize: 23,
  },
  label_time_noscroll: {
    marginBottom: 17,
    color: "#C0C0C0",
    fontSize: 19,
    marginLeft: "3%",
  },
  time_down: {
    color: "#C0C0C0",
    fontSize: 23,
  },
  label_1_center: {
    marginLeft: "5%",
    display: "flex",
    flexDirection: "column",
  }, lable1_slide: {
    display: "flex",
    flexDirection: "column",
    height: 200,
    width: 275,
    borderRadius: 20,
    backgroundColor: "#FFFAFA",
    alignContent: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
    marginLeft: 20,
  },name_par_slider: {
    fontSize: 17,
    marginBottom: 10,
  },label_1_up_text_3_slider: {
    marginLeft: "5%",
    fontSize: 17,
  },label_1_up_slider: {
    flexDirection: "column",

    //marginLeft: '5%',
    //width: '60%',
    display: "flex",
    justifyContent: "flex-start",
  },label_1_down_slider: {
    marginLeft: 15,
    //marginLeft: '5%',
    display: "flex",
    //justifyContent: 'space-between',
    flexDirection: "column",
  },
  label_1_center_text_2: {
    fontSize: 15,
    marginLeft: 7,
    width: 200,
  },
  label_1_down: {
    marginLeft: "5%",
    display: "flex",
    flexDirection: "column",
  },
  collapse: {
    display: "flex",
  },
  current_day: {
    alignItems: "center",
    display: "flex",
    marginLeft: "5%",
    flexDirection: "row",
    marginBottom: 20,
  },
  current_day_text_margin: {
    marginLeft: 10,
  },
  current_day_text: {
    color: "#C0C0C0",
    fontSize: 20,
  },
  current_day_block: {
    fontSize: 25,
    marginLeft: 16,
  },
});
