package com.contact.dao;
import com.contact.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ContactDAO extends JpaRepository<Contact, Long> {

    Optional<Contact> findByEmail(String email);

    Optional<Contact> findByPhoneNumber(String phoneNumber); // New method to find contact by phone number
    Contact save(Contact contact);
    Optional<Contact> findById(Long id);
    List<Contact> findAll();
   // Contact updateNotesByPhoneNumber(String phoneNumber, String notes); // New method to update notes by phone number
}

