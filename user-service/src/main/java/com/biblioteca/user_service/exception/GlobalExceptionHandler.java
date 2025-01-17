package com.biblioteca.user_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ObjectOptimisticLockingFailureException.class)
    public ResponseEntity<String> handleOptimisticLockingFailure(Exception e) {
        return new ResponseEntity<>(
            "Conflicto de actualización: el recurso fue modificado por otra transacción. Intente nuevamente.",
            HttpStatus.CONFLICT
        );
    }
}
