package com.contact.controller;
import com.contact.dto.ApiResponse;
import com.contact.dto.DynamicFieldRequest;
import com.contact.entity.DynamicFieldDetails;
import com.contact.service.DynamicFieldService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/admin/dynamic-fields")
public class DynamicFieldAdminController {
    private final DynamicFieldService service;
    public DynamicFieldAdminController(DynamicFieldService service){
        this.service = service;
    }

    @PostMapping("/addDynamicFieldByADMIN")
    public ResponseEntity<ApiResponse<DynamicFieldDetails>> addDynamicFieldByADMIN(
            @RequestHeader("X-ROLE") String role,
            @RequestBody DynamicFieldRequest request) {

        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Access denied. Admin only."));
        }

        DynamicFieldDetails field = service.addDynamicField(request);

        return ResponseEntity.ok(
                ApiResponse.success("Dynamic field added successfully", field)
        );
    }

@PostMapping("/getAllDynamicFieldByADMIN")
public ResponseEntity<ApiResponse<List<DynamicFieldDetails>>> getAllDynamicFields() {

    List<DynamicFieldDetails> fields = service.getAllDynamicFields();

    if (fields.isEmpty()) {
        return ResponseEntity.ok(
                ApiResponse.success("No dynamic fields found in system", fields)
        );
    }

    return ResponseEntity.ok(
            ApiResponse.success("All dynamic fields fetched successfully", fields)
    );
}
    @PutMapping("/updateDynamicFieldByName")
    public ResponseEntity<ApiResponse<DynamicFieldDetails>> updateDynamicFieldByName(
            @RequestHeader("X-ROLE") String role,
            @RequestBody DynamicFieldRequest request) {

        // Role Authorization
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Access denied. Admin only."));
        }

        // Input Validation
        if (request.getCustomField() == null || request.getCustomField().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Field name (customField) must be provided in the body."));
        }

        //Service Call
        DynamicFieldDetails updated = service.updateDynamicFieldByName(request);

        return ResponseEntity.ok(
                ApiResponse.success("Dynamic field updated successfully", updated)
        );
    }

    @PostMapping("/deleteDynamicFieldByName") // POST is safer for bodies, or use @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> deleteDynamicFieldByName(
            @RequestHeader("X-ROLE") String role,
            @RequestBody DynamicFieldRequest request) {

        //  Authorization
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Access denied. Admin only."));
        }

        //Validation
        if (request.getCustomField() == null || request.getCustomField().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Field name (customField) is required in the body to delete."));
        }

        service.deleteDynamicFieldByName(request.getCustomField());

        return ResponseEntity.ok(
                ApiResponse.success("Dynamic field '" + request.getCustomField() + "' deleted successfully", null)
        );
    }
}
