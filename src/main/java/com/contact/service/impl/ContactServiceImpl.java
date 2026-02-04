package com.contact.service.impl;
import com.contact.dao.ContactDAO;
import com.contact.dto.ContactRequestDTO;
import com.contact.entity.Contact;
import com.contact.service.ContactService;
import com.contact.service.helper.CustomFieldProcessor;
import com.contact.service.helper.FileStorageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactDAO contactDAO;
    private final CustomFieldProcessor processor;
    private final FileStorageService fileStorageService;

    private final ObjectMapper mapper;

    public ContactServiceImpl(ContactDAO contactDAO, CustomFieldProcessor processor, FileStorageService fileStorageService, ObjectMapper mapper) {
        this.contactDAO = contactDAO;
        this.processor = processor;
        this.fileStorageService = fileStorageService;
        this.mapper = mapper;
    }

    //   CREATE Contact
    @Override
    @Transactional
    public Contact saveContact(ContactRequestDTO dto) {
        // Uniqueness Checks
        validateUniqueness(dto);

        //  Data Transformation (Cleaning, Flattening, and Validation)
        Map<String, Object> processedFields = processor.process(dto.getCustomFields());

        // Mapping to Entity
        Contact contact = new Contact();
        contact.setFullName(dto.getFullName());
        contact.setEmail(dto.getEmail());
        contact.setPhoneNumber(dto.getPhoneNumber());
        contact.setLeadStatus(dto.getLeadStatus());
        contact.setOwner(dto.getOwner());
        contact.setNotes(dto.getNotes());

        try {
            // Save as String for DB and as Map for transient use
            contact.setCustom_fields(mapper.writeValueAsString(processedFields));
            contact.setCustomFieldsMap(processedFields);

        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to serialize custom fields");
        }
        //  Save and FIX the return value
        Contact savedContact = contactDAO.save(contact);

        // Manually put the map back into the saved object so Postman sees it
        savedContact.setCustomFieldsMap(processedFields);

        return savedContact;
    }
    private void validateUniqueness(ContactRequestDTO dto) {
        boolean emailExists = contactDAO.findByEmail(dto.getEmail()).isPresent();
        boolean phoneExists = contactDAO.findByPhoneNumber(dto.getPhoneNumber()).isPresent();

        if (emailExists && phoneExists) throw new IllegalStateException("EMAIL_AND_PHONE_EXISTS");
        if (emailExists) throw new IllegalStateException("EMAIL_EXISTS");
        if (phoneExists) throw new IllegalStateException("PHONE_EXISTS");
    }


    // GET ALL CONTACT
    @Override
    public List<Contact> getAllContacts() {
        List<Contact> contacts = contactDAO.findAll();
        // This ensures the @Transient Map is populated for the JSON response
        contacts.forEach(this::loadCustomFields);
        return contacts;
    }

    //   UPDATE NOTES  BY PHONE NUMBER
    @Override
    @Transactional
    public Contact updateNotesByPhoneNumber(String phoneNumber, String notes) {

        // Use IllegalStateException to trigger your custom 404 handler
        Contact contact = contactDAO.findByPhoneNumber(phoneNumber)
                .orElseThrow(() ->
                        new IllegalStateException("CONTACT_NOT_FOUND:" + phoneNumber));

        contact.setNotes(notes);

        // Refresh the last activity date since the contact was modified
        contact.setLastActivityDate(new java.util.Date());

        Contact savedContact = contactDAO.save(contact);

        // Re-load custom fields map so the response is complete
        if (savedContact.getCustom_fields() != null) {
            savedContact.setCustomFieldsMap(processor.parseStoredJson(savedContact.getCustom_fields()));
        }

        return savedContact;
    }

    @Override
    @Transactional
    public Contact uploadProfilePicByPhone(String phoneNumber, MultipartFile file) {

        //  Find contact by phone number
        Contact contact = contactDAO.findByPhoneNumber(phoneNumber)
                .orElseThrow(() ->
                        new IllegalArgumentException("PHONE_NUMBER_NOT_FOUND"));

        //  Store image (image-only validation already inside)
        String imagePath = fileStorageService.storeImage(file);

        // Save image path
        contact.setProfilePicPath(imagePath);

        return contactDAO.save(contact);
    }
    @Override
    public Contact getContactByPhone(String phoneNumber) {
        return contactDAO.findByPhoneNumber(phoneNumber)
                .map(contact -> {
                    // Pre-load @Transient map for the response
                    if (contact.getCustom_fields() != null) {
                        contact.setCustomFieldsMap(processor.parseStoredJson(contact.getCustom_fields()));
                    }
                    return contact;
                })
                // Crucial: Format must be "KEY:VALUE"
                .orElseThrow(() -> new IllegalStateException("CONTACT_NOT_FOUND:" + phoneNumber));
    }


    //   HELPER
    private void loadCustomFields(Contact contact) {
        if (contact.getCustom_fields() != null) {
            contact.setCustomFieldsMap(
                    processor.parseStoredJson(contact.getCustom_fields())
            );
        }
    }
}
