import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StudentsSchedule, Department, Subgroup, Group } from "./model";

const saveSchedule = async (
  schedule: StudentsSchedule[],
  edForm: string,
  url: string,
  groupNum: string
) => {
  try {
    const jsonDepartments = JSON.stringify(schedule);

    const scheduleInfo = {
      edForm: edForm,
      url: url,
      groupNum: groupNum,
    };
    const jsonScheduleInfo = JSON.stringify(scheduleInfo);

    await AsyncStorage.setItem("studentSchedule", jsonDepartments);
    await AsyncStorage.setItem("studentScheduleInfo", jsonScheduleInfo);

    console.log("Данные сохранены успешно");
  } catch (error) {
    console.log("Ошибка при сохранении данных:", error);
  }
};
export const readScheduleInfo = async () => {
  try {
    const jsonScheduleInfo = await AsyncStorage.getItem("studentScheduleInfo");
    if (jsonScheduleInfo !== null) {
      return JSON.parse(jsonScheduleInfo);
    }
  } catch (error) {
    console.log("Ошибка при чтении данных:", error);
  }
};

export const getStudentsScheduleLocal = async () => {
  try {
    const jsonDepartments = await AsyncStorage.getItem("studentSchedule");
    let dataMap = new Map();
    if (jsonDepartments !== null) {
      const schedule = JSON.parse(jsonDepartments);
      //console.log("Получены данные:", schedule);
      schedule.forEach((lessons: any) => {
        const __day = lessons.day_num;
        
        if (dataMap.has(__day)) {
          const dayData = dataMap.get(__day);
          dayData.push(lessons);
        } else {
          dataMap.set(__day, [lessons]);
        }
        //console.log(newDataMap)
      });
      dataMap.forEach((dayData) => {
        dayData.sort((a: any, b: any) => a.lesson_number - b.lesson_number);
      });
      return schedule;
    } else {
      console.log("Данные не найдены");
    }
  } catch (error) {
    console.log("Ошибка при получении данных:", error);
  }
};
const saveDepartments = async (departments: Department[]) => {
  try {
    const jsonDepartments = JSON.stringify(departments);
    await AsyncStorage.setItem("departments", jsonDepartments);
    console.log("Данные сохранены успешно");
  } catch (error) {
    console.log("Ошибка при сохранении данных:", error);
  }
};

export const getDepartmentsLocal = async () => {
  try {
    const jsonDepartments = await AsyncStorage.getItem("departments");
    if (jsonDepartments !== null) {
      const departments: Department[] = JSON.parse(jsonDepartments);
      console.log("Получены данные:", departments);
      return departments;
    } else {
      console.log("Данные не найдены");
      return false;
    }
  } catch (error) {
    console.log("Ошибка при получении данных:", error);
  }
};

export async function getDepartments() {
  try {
    const response = await axios.get(
      `http://213.189.201.157:8080/api/v1.0/departments`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const departments: Department[] = response.data;

    departments.forEach((department) => {
      // console.log(
      //   department.id,
      //   department.full_name,
      //   department.short_name,
      //   department.url
      // );
    });
    saveDepartments(departments);
    return departments;
  } catch (error) {
    console.log("Error getting departments");
  }
}

//TODO: add call all below function
export async function getGroups(edForm: string, url: string) {
  try {
    const response = await axios.get(
      `http://213.189.201.157:8080/api/v1.0/${edForm}/${url}/groups`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const groups: Group[] = response.data;

    groups.forEach((group) => {
      // console.log(
      //   group.department_id,
      //   group.education_form,
      //   group.group_num,
      //   group.id
      // );
    });
    return groups;
  } catch (error) {
    console.log("Error getting groups");
  }
}

export async function getSubgroups(
  edForm: string,
  url: string,
  groupNum: string
) {
  try {
    const response = await axios.get(
      `http://213.189.201.157:8080/api/v1.0/${edForm}/${url}/${groupNum}/subgroups`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const subGroups: Subgroup[] = response.data;

    subGroups.forEach((subGroup) => {
      console.log(subGroup.group_id, subGroup.subgroup_name);
    });
    return subGroups;
  } catch (error) {
    console.log("Error getting subgroups");
  }
}

export async function getStudentsSchedule(
  edForm: string,
  url: string,
  groupNum: string
) {
  try {
    const response = await axios.get(
      `http://213.189.201.157:8080/api/v1.0/${edForm}/${url}/${groupNum}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const schedule: StudentsSchedule[] = response.data;
    saveSchedule(schedule, edForm, url, groupNum);

    return schedule;
  } catch (error) {
    console.log("Error getting student schedule");
  }
}
