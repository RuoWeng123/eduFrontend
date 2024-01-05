import type {IHttpClient} from '@/api/IHttpClient'
import { axiosHttpClient } from '@/api/axiosHttpClient'

export class eduApi {
  private eduClient: IHttpClient;
  
  constructor(httpClient: IHttpClient) {
    this.eduClient = httpClient;
  }
  
  /**
   * 教师登录
   */
  public async loginTeacher(LoginParam: any): Promise<any>{
    return this.eduClient.restPost('/api/teacher/login', LoginParam)
  }
  
  /**
   * 学生登录
   */
  public async loginStudent(LoginParam: any): Promise<any>{
    return this.eduClient.restPost('/student/login', LoginParam)
  }
  
  /**
   * 添加 班级
   */
  public async addClass(classParam: any): Promise<any>{
    return this.eduClient.restPost('/myClass', classParam);
  }
  public async getClassList(filterParam: any): Promise<any>{
    return this.eduClient.restGet('/api/class', filterParam);
  }
  
  // 学院
  public async getCollegeList(): Promise<any>{
    return this.eduClient.restGet('/api/college', {});
  }
  public async createCollege(collegeParam: any): Promise<any>{
    return this.eduClient.restPost('/api/college', collegeParam);
  }
  public async deleteCollege(id:number): Promise<any>{
    return this.eduClient.restDelete(`/api/college/${id}`);
  }
  /**
   * 添加 老师
   */
  public async createTeacher(teacherParam: any): Promise<any>{
    return this.eduClient.restPost('/teacher', teacherParam);
  }
  /**
   * 添加 学生
   */
  public async createStudent(studentParam: any): Promise<any>{
    return this.eduClient.restPost('/student', studentParam);
  }
  
  /**
   * 通过班级获取 学生列表
   */
  public async getStudentListByClassId(classId: number): Promise<any>{
    return this.eduClient.restGet(`/student/${classId}`, {classId});
  }
  
  /**
   * 通过班级获取 老师列表
   */
  public async getStudentsBehaviorByClassId(classId: number): Promise<any>{
    return this.eduClient.restGet(`/api/student/behavior/${classId}`, {classId});
  }
}

let eduApiInstance: eduApi;
export const initEduClient = () =>{
  eduApiInstance = new eduApi(axiosHttpClient);
}
export const getEduClient = () => {
  if(!eduApiInstance){
    initEduClient();
  }
  return eduApiInstance;
}

export const setAuthToken = (token: string) => {
  axiosHttpClient.setAuthToken(token);
}

export const resetAuthToken = () =>{
  axiosHttpClient.resetAuthToken();
}
