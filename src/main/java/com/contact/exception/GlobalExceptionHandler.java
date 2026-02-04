package com.contact.exception;

import com.contact.dto.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j // Uses SLF4J for production logging
@RestControllerAdvice
public class GlobalExceptionHandler {

    //  Handles business logic violations (e.g., Not Found, Duplicates)
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiResponse<?>> handleIllegalState(IllegalStateException ex) {
        String message = ex.getMessage();
        log.warn("Business logic violation: {}", message);

        //   Safe parsing for CONTACT_NOT_FOUND:phone
        if (message != null && message.startsWith("CONTACT_NOT_FOUND")) {
            String identifier = "Unknown";
            if (message.contains(":")) {
                String[] parts = message.split(":", 2); // Split into max 2 parts
                if (parts.length > 1) identifier = parts[1].trim();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("This number is not found: " + identifier));
        }

        //  Specific Switch for mapped business errors
        if (message != null) {
            return switch (message) {
                case "EMAIL_EXISTS" -> ResponseEntity.badRequest().body(ApiResponse.error("Email already exists"));
                case "PHONE_EXISTS" -> ResponseEntity.badRequest().body(ApiResponse.error("Phone number already exists"));
                case "EMAIL_AND_PHONE_EXISTS" -> ResponseEntity.badRequest().body(ApiResponse.error("Email and phone number already exist"));
                case "DYNAMIC_FIELD_NOT_FOUND" -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("Field not found"));
                default -> ResponseEntity.badRequest().body(ApiResponse.error(message));
            };
        }

        return ResponseEntity.badRequest().body(ApiResponse.error("Invalid request state"));
    }

    // Handles invalid inputs and serialization errors

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<?>> handleIllegalArgument(IllegalArgumentException ex) {
        log.error("Invalid Argument: {}", ex.getMessage());
        return ResponseEntity.badRequest()
                .body(ApiResponse.error("Request error: " + ex.getMessage()));
    }
     // Handles 404 URL Not Found

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNotFound(NoResourceFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Endpoint not found: " + ex.getResourcePath()));
    }

     //The Ultimate Safety Net (Catch-all)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleGeneric(Exception ex) {
        // Log full stack trace so developers can find the bug in logs
        log.error("CRITICAL SYSTEM ERROR: ", ex);

        // Return generic message to user (security best practice)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("An unexpected internal server error occurred"));
    }
}