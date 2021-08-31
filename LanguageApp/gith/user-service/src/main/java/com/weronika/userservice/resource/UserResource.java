package com.weronika.userservice.resource;

import com.weronika.userservice.models.Lesson;
import com.weronika.userservice.models.LessonItem;

import com.weronika.userservice.models.UserLessons;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

//@RestController
//@RequestMapping("/users")
public class UserResource {

//    @Autowired
//    private RestTemplate restTemplate;
//
//    @Autowired
//    private WebClient.Builder webClientBuilder;
//
//    @RequestMapping("/{userId}")
//    public List<LessonItem> getLessons(@PathVariable("userId") String userId) {
//
//        UserLessons lessons = restTemplate.getForObject("http://localhost:8083/lessons/user/"+ userId, UserLessons.class);
//
//       return lessons.getLessons().stream().map(lesson -> {
//           Lesson lessonInfo = restTemplate.getForObject("http://localhost:8083/lessons/"+ lesson.getLessonId(),Lesson.class);
//          /* Lesson lessonInfo = webClientBuilder.build()
//                   .get()
//                   .uri("http://localhost:8083/lessons/"+ lesson.getLessonId())
//                   .retrieve()
//                   .bodyToMono(Lesson.class)
//                   .block();
//           */
//           return new LessonItem(lessonInfo.getLanguage(), lessonInfo.getTime(),lessonInfo.getTeacherId(), lessonInfo.getStudentId());})
//            .collect(Collectors.toList());
//    }



 //   public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String name) {
//        try {
//            List<User> users = new ArrayList<User>();
//
//            if (name == null)
//                userRepository.findAll().forEach(users::add);
//            else
//                userRepository.findByNameContaining(name).forEach(users::add);
//
//            if (users.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//
//            return new ResponseEntity<>(users, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
 //   }

}
