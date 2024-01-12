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

export type {
  Class,
  ClassList,
  College,
  CollegeList,
}
