package dev.dex.springbootshirtshop.exc;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.*;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = ForbiddenException.class)
    public ResponseEntity<?> handleForbiddenException(ForbiddenException ex) {
        HttpStatus status = HttpStatus.FORBIDDEN;
        ApiException apiException = new ApiException(ex.getMessage(), status, ZonedDateTime.now(ZoneId.of("Z")));
        return ResponseEntity.status(status).body(apiException);
    }
}
