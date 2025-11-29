export interface Department {
  id: number;
  full_name: string;
  short_name: string;
  url: string;
}

export interface Group {
  department_id: number;
  education_form: string;
  group_num: string;
  id: number;
}

export interface Subgroup {
  group_id: number;
  subgroup_name: string;
}

export interface StudentsSchedule {
  day_num: number;
  id: number;
  lesson_number: number;
  lesson_name: string;
  lesson_place: string;
  lesson_type: string;
  subgroup_name: string;
  teacher: string;
  week_type: string;
}
