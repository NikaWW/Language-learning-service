import http from "../http-common3";

class LessonDataService {
  getAll() {
    return http.get("/lessons");
  }

  get(id) {
    return http.get(`/lessons/${id}`);
  }

  create(data, dataT, dataU) {
    return http.post("/lessons", data, dataT, dataU);
  }

  update(id, data) {
    return http.put(`/teacher/lessons/${id}`, data);
  }

  deleteAll() {
    return http.delete(`/lessons`);
  }

  findByLanguage(language) {
    return http.get(`/lessons?language=${language}`);
  }

  getAllTeacherLessons(id) {
    return http.get(`/teacher/lessons/${id}`);
  }

  getAllUserLessons(id) {
    return http.get(`/user/lessons/${id}`);
  }
}

export default new LessonDataService();
