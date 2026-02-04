package com.contact.dao;
import com.contact.entity.DynamicFieldDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import  java.util.Optional;
public interface DynamicFieldDetailsDAO extends JpaRepository<DynamicFieldDetails, Long> {
    Optional<DynamicFieldDetails> findByCustomField(String fieldName);
    List<DynamicFieldDetails> findAll();
}