type Class = {
  id: Number | undefined;
  name: String;
  slogan: String;
  year: number;
  collegeId: number | undefined;
}
type ClassList = Class[];

type College = {
  id: Number | undefined;
  name: String;
}
type CollegeList = College[];

type Student = {
  id: number | undefined;
  name: string;
  card: string;
  sex: number;
  classId: number | undefined;
}
type StudentList = Student[];

type Teacher = {
  id: number | undefined;
  name: string;
  password: string;
  course: string;
  roleId: number;
  headClassId: number | undefined;
  headClass: any;
  classes: number[];
}
type TeacherList = Teacher[];

export type {
  Class,
  ClassList,
  College,
  CollegeList,
  Student,
  StudentList,
  Teacher,
  TeacherList,
}
