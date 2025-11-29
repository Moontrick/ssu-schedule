import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  Easing
} from "react-native";
import {
  getStudentsSchedule,
  readScheduleInfo,
  getStudentsScheduleLocal,
} from "./data";
import { StudentsSchedule } from "./model";
import {
  months,
  isOddWeek,
  daysOfWeek,
  timeRanges,
  getCurrLesson,
  timeToString
} from "./TimeUtils";

export default function IndexPage({ navigation }: { navigation: any }) {
  const [schedule, setSchedule] = useState(new Map());
  //const [lessons, setLessons] = useState<StudentsSchedule[]>([]);
  const [simultRunningLessons, setSimultRunningLessons] = useState(new Map());
  const [currDay, setCurrDay] = useState<any>(1);
  const [currMonth, setCurrMonth] = useState<any>(1);
  const [WeekType, setWeekType] = useState<any>(1);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingDayOff, setisLoadingDayOff] = useState(true);
  interface WeekDay {
    dayOfWeek: number;
    dayNumber: number;
  }
  const [weekDays, setWeekDays] = useState<WeekDay[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    const weekDays: WeekDay[] = [];
    for (let i = 1; i <= 7; i++) {
      const dayOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + i
      );
      const dayNumber = dayOfWeek.getDate();
      weekDays.push({ dayOfWeek: i, dayNumber });
    }
    setWeekDays(weekDays);

    let localSchedule = getStudentsScheduleLocal();
    //localSchedule.then((value:any) => { setSchedule(value); });
    var p = Promise.resolve(localSchedule);
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
      setSchedule(schedule);
    });

    const dayNumber = currentDate.getDate();
    const currDayOfWeek = currentDate.getDay();
    setTodayLabel(dayNumber);
    //fillCurrDay(currDayOfWeek);
    //();
    setLoading(false);
    handleValueChange(currDayOfWeek, dayNumber);
  }, []);

  const fillCurrDay = (day: any) => {
    const lessons: StudentsSchedule[] = [];

    if (schedule.has(day)) {
      const dayData = schedule.get(day);
      const simultRunningLessons = new Map();

      dayData.forEach((lesson: StudentsSchedule) => {
        let lessonType = lesson.lesson_type;
        const lessonNumber = lesson.lesson_number;

        if (simultRunningLessons.has(lessonNumber)) {
          const count = simultRunningLessons.get(lessonNumber);
          simultRunningLessons.set(lessonNumber, count + 1);
        } else {
          simultRunningLessons.set(lessonNumber, 1);
        }

        if (lessonType === "PRACTICE") {
          lesson.lesson_type = "Практика";
        } else if (lessonType === "LECTURE") {
          lesson.lesson_type = "Лекция";
        } else if (lessonType === "LABORATORY") {
          lesson.lesson_type = "Лабораторная";
        }
        lessons.push(lesson);
      });
      setSimultRunningLessons(simultRunningLessons);
    }

    //setLessons(lessons);
    setLoading(false);
  };

  const [currLesson, setCurrLesson] = useState<any>(-1);

  const handleValueChange = (dayOfWeek: any, dayNumber: any) => {
    //fillCurrDay(dayOfWeek);
    setSelectedValue(dayOfWeek);
    setCurrDay(dayNumber);
    const currentDate = new Date();
    const month = months[currentDate.getMonth()];

    const weekType = isOddWeek() ? "числитель" : "знаменатель";
    setCurrLesson(getCurrLesson());
    setCurrMonth(month);
    setWeekType(weekType);
  };

  const handleValueCurrDays = (dayOfWeek: any) => {
    setCurrDay(dayOfWeek);
  };

  interface RadioButtonProps {
    value: any;
    selectedValue: any;
    onChange: (dayOfWeek: any, dayNumber: any) => void;
    onChangeDay: (dayOfWeek: any) => void;
    dayNumber: number;
    dayOfWeek: string;
  }

  const getNCountPair = (count: any,i:any, lessons: StudentsSchedule[]) => {
    let content = [];
  
    for (let j = i; j < i+count; j++) {
      console.log("currLesson" + currLesson)
      console.log(lessons[i].lesson_number)
      content.push(
        <View
          style={
            currLesson == lessons[i].lesson_number && currDay == todayLabel
              ? styles.label1_slide_curr_time
              : styles.label1_slide
          }
        >
          <View style={styles.label_1_up_slider}>
            <Text style={styles.lesson_name_slider}>
              {" "}
              {lessons[j].lesson_name}
            </Text>
            <View style={styles.label_1_up_text_block}>
              <Text style={styles.label_1_up_text_3_slider}>
                {lessons[j].subgroup_name}
              </Text>
            </View>
          </View>
          <View style={styles.label_1_down_slider}>
            <View style={styles.label_1_down_location}>
              <Image source={require("../Source/images/location.png")} />
              <Text style={styles.lesson_place}>{lessons[j].lesson_place}</Text>
            </View>
            <View style={styles.label_1_down_location_down}>
              <Image source={require("../Source/images/icon_person.png")} />
              <Text style={styles.label_1_center_text_2}>
                {lessons[j].teacher}
              </Text>
            </View>
            <View style={styles.label_1_down_location_down_down_slide}>
              <Image source={getLessonIcon(lessons[j].lesson_type)} />
              <Text
                style={styles.label_1_center_text_2_down}
                id="label-1-up-text-2"
              >
                {lessons[j].lesson_type}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return content;
  };

  const getLessonIcon = (lessonType: any) => {
    if (lessonType == "Лекция") {
      return require("../Source/images/type_pair_lec.png");
    } else if (lessonType == "Практика") {
      return require("../Source/images/type_pair_prac.png");
    } else if (lessonType == "Лабораторная") {
      return require("../Source/images/type_pair_lab.png");
    } else {
      return require("../Source/images/type_pair_lec.png");
    }
  };
  const position = new Animated.Value(0);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: 20, // Смещение вниз
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0, // Смещение вверх
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };
  const getAnimalsContent = () => {
    console.log(currDay%7)
    const lessons: StudentsSchedule[] = [];
    const simultRunningLessons = new Map();
    if (schedule.has(currDay%7)) {
      console.log("dasdasada")
      const dayData = schedule.get(currDay%7);
      

      dayData.forEach((lesson: StudentsSchedule) => {
        let lessonType = lesson.lesson_type;
        const lessonNumber = lesson.lesson_number;

        if (simultRunningLessons.has(lessonNumber)) {
          const count = simultRunningLessons.get(lessonNumber);
          simultRunningLessons.set(lessonNumber, count + 1);
        } else {
          simultRunningLessons.set(lessonNumber, 1);
        }
        console.log(simultRunningLessons)
        if (lessonType === "PRACTICE") {
          lesson.lesson_type = "Практика";
        } else if (lessonType === "LECTURE") {
          lesson.lesson_type = "Лекция";
        } else if (lessonType === "LABORATORY") {
          lesson.lesson_type = "Лабораторная";
        }
        lessons.push(lesson);
      });
      //setSimultRunningLessons(simultRunningLessons);
    }
    console.log(simultRunningLessons)

    
    let content: any[] = [];
    let i = 0;
    console.log(simultRunningLessons.size)
    if(simultRunningLessons.size == 0){

      startAnimation();
      content.push(
        <View style={styles.schedule_block_dayOf}>
          <Text style={styles.dayOf_text}>Выходной</Text>
          <Animated.Image
          style={{
            transform: [{ translateY: position }],
            width: 100,
            height: 100,
          }}
      source={require('../Source/images/mood.png')}
    />
        </View>

      )
      
    }else{

    simultRunningLessons.forEach((countPair, count) => {
      
    if(lessons.length != 0){
      if (countPair == 1 ) {
        content.push(
          <View style={styles.schedule_block}>
            <View style={styles.schedule_block_time}>
              <Text style={styles.time} id="time">
                {timeToString(timeRanges[count - 1].start)}
              </Text>
              <Text style={styles.time_down} id="time">
                {timeToString(timeRanges[count - 1].end)}
              </Text>
            </View>
            <View
              id="l-1"
              style={
                currLesson == i && currDay == todayLabel
                  ? styles.label1_curr_time
                  : styles.label1
              }
            >
              <View style={styles.label_1_up}>
                <Text id="name_par" style={styles.lesson_name}>
                  {" "}
                  {lessons[i].lesson_name}
                </Text>
                <View style={styles.label_1_up_text_block}>
                  <Text style={styles.label_1_up_text_3} id="label-1-up-text-3">
                    {" "}
                    {lessons[i].subgroup_name}
                  </Text>
                </View>
              </View>
              <View style={styles.label_1_down}>
                <View style={styles.label_1_down_location}>
                  <Image source={require("../Source/images/location.png")} />
                  <Text style={styles.lesson_place}>
                    {lessons[i].lesson_place}
                  </Text>
                </View>
                <View style={styles.label_1_down_location_down}>
                  <Image source={require("../Source/images/icon_person.png")} />
                  <Text
                    id="label-1-center-text-2"
                    style={styles.label_1_center_text_2}
                  >
                    {lessons[i].teacher}
                  </Text>
                </View>
              </View>
              <View style={styles.label_1_down_location_down_down}>
                <Image source={getLessonIcon(lessons[i].lesson_type)} />
                <Text
                  style={styles.label_1_center_text_2_down}
                  id="label-1-up-text-2"
                >
                  {lessons[i].lesson_type}
                </Text>
              </View>
            </View>
          </View>
        );
        i += 1;
      } else {
        content.push(
          <View style={styles.schedule_block}>
            <View style={styles.schedule_block_time}>
              <Text style={styles.time} id="time">
                {timeToString(timeRanges[count - 1].start)}
              </Text>
              <Text style={styles.time_down} id="time">
                {timeToString(timeRanges[count - 1].end)}
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentInset={{ right: 30 }}
            >
              {getNCountPair(countPair,i, lessons)}
            </ScrollView>
          </View>
        );
        i += countPair;
      }
  }});}

    return content;
  };
  const [todayLabel, setTodayLabel] = useState<any>(0);
  const [selectedValue, setSelectedValue] = useState<any>(1);

  const RadioButton = ({
    value,
    selectedValue,
    onChange,
    dayNumber,
    dayOfWeek,
    onChangeDay,
  }: RadioButtonProps) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: selectedValue === value ? "#ff6c36" : "#FFFFF",
            borderRadius: 15,
            width: 50,
            height: 70,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginLeft: 1,
            marginRight: 1,
            marginBottom: 20,
          }}
          onPress={() => onChange(value, dayNumber)}
        >
          <Text
            style={{
              color: selectedValue === value ? "white" : "black",
              fontSize: 16,
            }}
          >
            {dayOfWeek}
          </Text>
          <Text
            style={{
              color: selectedValue === value ? "white" : "black",
              fontSize: 22,
            }}
          >
            {dayNumber}
          </Text>
          {}
        </TouchableOpacity>
      </View>
    );
  };

  interface RadioButtonsGroupProps {
    selectedValue: any;
    onChange: (dayOfWeek: any, dayNumber: any) => void;
    onChangeDay: (dayOfWeek: any) => void;
  }

  const RadioButtonsGroup = ({
    selectedValue,
    onChange,
    onChangeDay,
  }: RadioButtonsGroupProps) => {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {weekDays.map((value, index) => (
          <RadioButton
            key={value.dayOfWeek}
            value={value.dayOfWeek}
            selectedValue={selectedValue}
            onChange={onChange}
            onChangeDay={onChangeDay}
            dayNumber={value.dayNumber}
            dayOfWeek={daysOfWeek[index]}
          />
        ))}
      </View>
    );
  };

  const [selectedCurrentDay, setSelectedCurrentDay] = useState<any>(1);
  const handleValueChangeDays = (value: any) => {
    setSelectedCurrentDay(value);
  };

  interface toDayDayInBlockUnderButtonProps {
    selectedCurrentDay: any;
    onChangeDays: (value: any) => void;
  }
  const ToDayDayInBlockUnderButton = ({
    selectedCurrentDay,
    onChangeDays,
  }: toDayDayInBlockUnderButtonProps) => {
    return (
      <View style={styles.current_day}>
        <Text style={{ fontSize: 50 }}>{currDay}</Text>
        <View style={styles.current_day_text_left}>
          <Text style={styles.current_day_text}>{currMonth}</Text>
          <Text style={styles.current_day_text}>{WeekType}</Text>
        </View>
      </View>
    );
  };

  return (
    <View id="App" style={styles.App}>
      <View style={styles.label_info_up}>
        <ToDayDayInBlockUnderButton
          selectedCurrentDay={selectedCurrentDay}
          onChangeDays={handleValueChangeDays}
        />
        <View
          style={
            currDay == todayLabel
              ? styles.label_info_up_right
              : styles.visible_label_info_up_right
          }
        >
          <Text style={styles.label_info_up_right_text}>Сегодня</Text>
        </View>
      </View>
      <RadioButtonsGroup
        selectedValue={selectedValue}
        onChange={handleValueChange}
        onChangeDay={handleValueCurrDays}
      />
      <View style={styles.label_info}>
        <Text style={styles.label_time_noscroll}>Время</Text>
        <Text style={styles.label_time_noscroll}>Пары</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          contentInset={{ bottom: 210 }}
        >
          {getAnimalsContent()}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  label_1_down_location_down: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  label_1_down_location_down_down_slide: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 2,
  },
  label_1_down_location_down_down: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 15,
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
  dayOf_text:{
    fontSize:25,
  },
  schedule_block_dayOf:{

    display: "flex",
    justifyContent: "center",
    alignItems:"center",

  },
  schedule_block: {
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "row",
  },
  contentContainer: {},
  App: {
    display: "flex",
    marginTop: "3%",
  },
  buttons: {
    marginLeft: "2%",
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
  },
  b_date_text: {
    paddingLeft: 15,
  },
  b_date: {
    width: 60,
    height: 90,
  },
  b1: {
    width: 50,
    height: 50,
    backgroundColor: "#EFEFEF",
    borderRadius: 50,
    borderColor: "#000000",
    borderWidth: 1,
    MarginBottom: 20,
  },
  b1_text: {
    fontSize: 20,
    textAlign: "center",
    position: "relative",
    top: 12,
  },
  lesson_type_image: {
    width: 16,
    height: 20,
  },
  label1_slide_curr_time: {
    display: "flex",
    flexDirection: "column",
    height: 200,
    width: 270,
    borderRadius: 20,
    backgroundColor: "#46d5aa",
    alignContent: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
    marginLeft: 20,
  },
  label1_slide: {
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
  },
  label1: {
    marginLeft: "5%",
    marginRight: "5%",
    display: "flex",
    flexDirection: "column",
    height: 200,
    width: "70%",
    borderRadius: 20,
    backgroundColor: "#FFFAFA",
    alignContent: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  label1_curr_time: {
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
  lesson_place: {
    fontSize: 17,
    marginLeft: 7,
  },
  lesson_name_slider: {
    fontSize: 17,
    marginBottom: 10,
  },
  lesson_name: {
    fontSize: 17,
    marginBottom: 10,
  },
  start_button: {
    display: "flex",
    height: 150,
    width: "90%,",
    marginBottom: 0,
    marginLeft: "50%",
    marginRight: 0,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor: "#00ff21",
  },
  label_1_up_slider: {
    marginLeft: 15,
    flexDirection: "column",
    display: "flex",
    justifyContent: "flex-start",
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
  label_1_up_text_3_slider: {
    
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
  },
  label_1_center_text_2: {
    fontSize: 17,
    marginLeft: 7,
    width: 200,
  },
  label_1_center_text_2_down: {
    fontSize: 17,
    marginLeft: 7,
  },
  label_1_down_slider: {
    marginLeft: 15,
    display: "flex",
    flexDirection: "column",
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
  current_day_text_left: {
    marginLeft: 10,
  },
  current_day_text: {
    color: "#C0C0C0",
    fontSize: 20,
  },
});