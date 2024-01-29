package com.ssafy.domain.classroom.exception;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class TeacherExceptionHandler {

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(TeacherException.class)
    ResponseEntity<String> teacherNotFoundHandler(TeacherException teacherException) {
        return new ResponseEntity<String>(teacherException.getMessage(), HttpStatus.NOT_FOUND);
    }
}
