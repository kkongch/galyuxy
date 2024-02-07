package com.ssafy.domain.classroom.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class ClassroomExceptionHandler {

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ClassroomException.class)
    ResponseEntity<String> notFoundHandler(ClassroomException classroomException) {
        return new ResponseEntity<String>(classroomException.getMessage(), HttpStatus.NOT_FOUND);
    }
}
