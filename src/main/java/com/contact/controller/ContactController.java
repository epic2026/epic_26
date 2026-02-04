package com.contact.controller;
import com.contact.dto.ApiResponse;
import com.contact.dto.ContactRequestDTO;
import com.contact.entity.Contact;
import com.contact.service.ContactService;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/contacts")
public class ContactController {
    private final ContactService contactService;
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

// Fetch all custom fields for a contact
@PostMapping("/createContact")
public ResponseEntity<ApiResponse<Contact>> createContact(
        @RequestBody ContactRequestDTO dto) {

    Contact saved = contactService.saveContact(dto);
    return ResponseEntity.ok(
            ApiResponse.success("Contact created successfully", saved)
    );
}
    // this is ok feb
    @PostMapping("/getAllContacts")
    public ResponseEntity<ApiResponse<List<Contact>>> getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(
                ApiResponse.success("Contacts fetched successfully", contacts)
        );
    }
    // this is okk 2 feb
@PostMapping("/getContactDetailsPerUserByPhoneNumber") // Shorter, cleaner name
public ResponseEntity<ApiResponse<Contact>> getContactByPhone(@RequestBody Map<String, String> request) {

    String phoneNumber = request.get("phoneNumber");

    // Validation: Ensure the key actually exists in the request
    if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
        return ResponseEntity.badRequest()
                .body(ApiResponse.error("The 'phoneNumber' field is required in the request body"));
    }

    //Service Call: This will throw your IllegalStateException if not found
    Contact contact = contactService.getContactByPhone(phoneNumber);

    //Success Response
    return ResponseEntity.ok(
            ApiResponse.success("Contact retrieved successfully", contact)
    );
}
//updateNotePerUser // done
    @PutMapping("/updateNotePerUserByPhone")
    public ResponseEntity<ApiResponse<Contact>> updateNotes(@RequestBody Map<String, String> request) {

        String phoneNumber = request.get("phoneNumber");
        String notes = request.get("notes");

        // Basic Validation
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Phone number is required in the request body"));
        }

        Contact updatedContact = contactService.updateNotesByPhoneNumber(phoneNumber, notes);

        return ResponseEntity.ok(
                ApiResponse.success("Notes updated successfully", updatedContact)
        );
    }
    @PostMapping("/upload-profile-pic")
    public ResponseEntity<ApiResponse<Contact>> uploadProfilePicByPhone(
            @RequestParam("phoneNumber") String phoneNumber, // Changed from PathVariable
            @RequestParam("file") MultipartFile file) {

        Contact updated = contactService.uploadProfilePicByPhone(phoneNumber, file);

        return ResponseEntity.ok(
                ApiResponse.success("Profile picture uploaded successfully", updated)
        );
    }
    @PostMapping("/get-profile-pic")
    public ResponseEntity<Resource> getProfilePic(@RequestBody Map<String, String> request) throws Exception {

        String phoneNumber = request.get("phoneNumber");

        //  Fetch contact (This uses your production-level IllegalStateException if not found)
        Contact contact = contactService.getContactByPhone(phoneNumber);

        // Check if the path exists
        if (contact.getProfilePicPath() == null || contact.getProfilePicPath().isEmpty()) {
            throw new IllegalArgumentException("PROFILE_PIC_NOT_FOUND");
        }

        Path path = Paths.get(contact.getProfilePicPath());
        Resource resource = new UrlResource(path.toUri());

        // Determine Content-Type dynamically based on file extension
        String contentType = Files.probeContentType(path);
        if (contentType == null) {
            contentType = "image/jpeg"; // Fallback
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + path.getFileName().toString() + "\"")
                .body(resource);
    }

}