package com.ssafy.global.exception;

import com.ssafy.global.common.dto.Message;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class EntityExceptionHandler {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Message> handleEntityNotFoundException(EntityNotFoundException entityNotFoundException) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Message.fail("BAD_REQUEST", entityNotFoundException.getMessage()));
    }
}
