package com.contact.service.impl;

import com.contact.dao.DynamicFieldDetailsDAO;
import com.contact.dto.DynamicFieldRequest;
import com.contact.entity.DynamicFieldDetails;
import com.contact.service.DynamicFieldService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class DynamicFieldServiceImpl implements DynamicFieldService {
    private DynamicFieldDetailsDAO dynamicFieldDetailsDAO;
    public DynamicFieldServiceImpl(DynamicFieldDetailsDAO dynamicFieldDetailsDAO) {
        this.dynamicFieldDetailsDAO = dynamicFieldDetailsDAO;
   }

    private boolean isValidFieldType(String fieldType) {
        // Validate the fieldType. You can add more if conditions if there are additional valid types.
        return "TEXT".equalsIgnoreCase(fieldType) ||
                "NUMBER".equalsIgnoreCase(fieldType) ||
                "DATE".equalsIgnoreCase(fieldType) ||
                "DROPDOWN".equalsIgnoreCase(fieldType);
    }

    @Override
    @Transactional
    public DynamicFieldDetails addDynamicField(DynamicFieldRequest request) {

        // Validate field name
        if (request.getCustomField() == null || request.getCustomField().isBlank()) {
            throw new IllegalArgumentException("CUSTOM_FIELD_REQUIRED");
        }

        // Validate field type
        if (request.getFieldType() == null || !isValidFieldType(request.getFieldType())) {
            throw new IllegalArgumentException("INVALID_FIELD_TYPE");
        }

        // Handle DUPLICATE FIELD
        dynamicFieldDetailsDAO
                .findByCustomField(request.getCustomField())
                .ifPresent(existing -> {
                    throw new IllegalStateException("DYNAMIC_FIELD_EXISTS");
                });

        // Validate DROPDOWN
        if ("DROPDOWN".equalsIgnoreCase(request.getFieldType())) {
            if (request.getDropdownValues() == null ||
                    request.getDropdownValues().isBlank()) {
                throw new IllegalArgumentException("DROPDOWN_VALUES_REQUIRED");
            }
        }

        // Save field
        DynamicFieldDetails field = new DynamicFieldDetails();
        field.setCustomField(request.getCustomField());
        field.setFieldType(request.getFieldType().toUpperCase());
        field.setDropdownValues(request.getDropdownValues());

        return dynamicFieldDetailsDAO.save(field);
    }

    @Override
    public List<DynamicFieldDetails> getAllDynamicFields() {
        return dynamicFieldDetailsDAO.findAll();
    }
    @Override
    @Transactional
    public DynamicFieldDetails updateDynamicFieldByName(DynamicFieldRequest request) {
        //  Find the field by its unique name
        DynamicFieldDetails existingField = dynamicFieldDetailsDAO.findByCustomField(request.getCustomField())
                .orElseThrow(() -> new IllegalStateException("DYNAMIC_FIELD_NOT_FOUND:" + request.getCustomField()));

        // Update the attributes (Type, Dropdown values, etc.)
        if (request.getFieldType() != null) {
            existingField.setFieldType(request.getFieldType());
        }

        if (request.getDropdownValues() != null) {
            existingField.setDropdownValues(request.getDropdownValues());
        }

        //  Persist changes
        return dynamicFieldDetailsDAO.save(existingField);
    }

    @Override
    @Transactional
    public void deleteDynamicFieldByName(String fieldName) {
        //  Check if the field exists
        DynamicFieldDetails field = dynamicFieldDetailsDAO.findByCustomField(fieldName)
                .orElseThrow(() -> new IllegalStateException("DYNAMIC_FIELD_NOT_FOUND:" + fieldName));

        //  Delete the definition from the metadata table
        dynamicFieldDetailsDAO.delete(field);

         }
}
