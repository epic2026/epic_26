
package com.contact.service.helper;
import com.contact.dao.DynamicFieldDetailsDAO;
import com.contact.entity.DynamicFieldDetails;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class CustomFieldProcessor {

    private final DynamicFieldDetailsDAO fieldDAO;
    private final ObjectMapper mapper; // Injected for consistency
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    public CustomFieldProcessor(DynamicFieldDetailsDAO fieldDAO, ObjectMapper mapper) {
        this.fieldDAO = fieldDAO;
        this.mapper = mapper;
    }

    public Map<String, Object> process(Map<String, Object> input) {
        System.out.println("Input received: " + input);
        if (input == null || input.isEmpty()) {
            return Map.of();
        }

        //  Flatten the incoming nested map (handles envelope.header, etc.)
        Map<String, Object> flatMap = new HashMap<>();
        flattenMap("", input, flatMap);

        // Clean prefixes (Remove 'envelope.header' or 'envelope.body' from keys)
        Map<String, Object> cleanedMap = new HashMap<>();
        for (Map.Entry<String, Object> entry : flatMap.entrySet()) {
            String cleanKey = entry.getKey()
                    .replace("envelope.header.", "")
                    .replace("envelope.body.", "")
                    .replace("envelope.", "");
            cleanedMap.put(cleanKey, entry.getValue());
        }

        // Validate against DB and Convert Types
        Map<String, Object> validatedMap = validateAndConvert(cleanedMap);

        // (Optional) Re-build into a clean nested structure or return flat
        return buildNestedMap(validatedMap);
    }

    private void flattenMap(String parent, Map<String, Object> map, Map<String, Object> flat) {
        for (Map.Entry<String, Object> e : map.entrySet()) {
            String key = parent.isEmpty() ? e.getKey() : parent + "." + e.getKey();
            if (e.getValue() instanceof Map<?, ?> nested) {
                flattenMap(key, (Map<String, Object>) nested, flat);
            } else {
                flat.put(key, e.getValue());
            }
        }
    }

    private Map<String, Object> validateAndConvert(Map<String, Object> flatMap) {
        Map<String, Object> result = new HashMap<>();
        List<String> errors = new ArrayList<>();

        for (String key : flatMap.keySet()) {
            DynamicFieldDetails field = fieldDAO.findByCustomField(key).orElse(null);

            if (field == null) {
                // If a field isn't in your DB, you can choose to skip it or throw error
                continue;
            }

            Object value = convertType(flatMap.get(key), field);
            if (value == null) {
                errors.add("Invalid value for '" + key + "'");
            } else {
                result.put(key, value);
            }
        }

        if (!errors.isEmpty()) {
            throw new IllegalArgumentException(String.join("; ", errors));
        }
        return result;
    }

    private Object convertType(Object value, DynamicFieldDetails field) {
        try {
            String v = value.toString();
            return switch (field.getFieldType().toUpperCase()) {
                case "TEXT" -> v;
                case "NUMBER" -> Double.parseDouble(v);
                case "DATE" -> dateFormat.parse(v);
                case "DROPDOWN" -> Arrays.asList(field.getDropdownValues().split(","))
                        .contains(v) ? v : null;
                default -> v;
            };
        } catch (Exception e) {
            return null;
        }
    }

    private Map<String, Object> buildNestedMap(Map<String, Object> flatMap) {
        Map<String, Object> nested = new HashMap<>();
        for (Map.Entry<String, Object> entry : flatMap.entrySet()) {
            String[] parts = entry.getKey().split("\\.");
            Map<String, Object> current = nested;
            for (int i = 0; i < parts.length - 1; i++) {
                current = (Map<String, Object>) current.computeIfAbsent(parts[i], k -> new HashMap<>());
            }
            current.put(parts[parts.length - 1], entry.getValue());
        }
        return nested;
    }

    public Map<String, Object> parseStoredJson(String json) {
        try {
            return mapper.readValue(json, new TypeReference<>() {});
        } catch (Exception e) {
            return Map.of();
        }
    }
}