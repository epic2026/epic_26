package com.contact.service;
import com.contact.dto.ContactRequestDTO;
import com.contact.entity.Contact;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
public interface ContactService {
    Contact saveContact(ContactRequestDTO dto);
    List<Contact> getAllContacts();
    Contact updateNotesByPhoneNumber(String phoneNumber, String notes);
    Contact uploadProfilePicByPhone(String phoneNumber, MultipartFile file);
    Contact getContactByPhone(String phoneNumber);
}