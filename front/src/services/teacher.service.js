import http from "../http-common";

class TeacherDataService {
  getAll() {
    return http.get("/teachers");
  }

  get(id) {
    return http.get(`/teachers/${id}`);
  }

  create(data) {
    return http.post("/teachers", data);
  }

  update(id, data) {
    return http.put(`/teachers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/teachers/${id}`);
  }

  deleteAll() {
    return http.delete(`/teachers`);
  }

  findByLanguage(language) {
    return http.get(`/teachers?language=${language}`);
  }
}

export default new TeacherDataService();
