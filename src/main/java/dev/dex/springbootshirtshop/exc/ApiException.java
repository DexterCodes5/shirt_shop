package dev.dex.springbootshirtshop.exc;

import org.springframework.http.*;

import java.time.*;

public record ApiException(String message, HttpStatus status, ZonedDateTime timestamp)  {

}
