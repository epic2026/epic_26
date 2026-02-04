package com.contact.service;
import com.contact.dto.DynamicFieldRequest;
import com.contact.entity.DynamicFieldDetails;
import java.util.List;
public interface DynamicFieldService {
    DynamicFieldDetails addDynamicField(DynamicFieldRequest request);
    List<DynamicFieldDetails> getAllDynamicFields();
    DynamicFieldDetails updateDynamicFieldByName(DynamicFieldRequest request);
public void deleteDynamicFieldByName(String fieldName);
}