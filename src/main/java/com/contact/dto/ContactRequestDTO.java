    package com.contact.dto;
    import java.util.Map;

    public class ContactRequestDTO {
        private String fullName;
        private String phoneNumber;
        private String email;
        private String leadStatus;
        private String owner;
        private String notes;
        private Map<String, Object> customFields; // Must be Map, NOT String

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getLeadStatus() {
            return leadStatus;
        }

        public void setLeadStatus(String leadStatus) {
            this.leadStatus = leadStatus;
        }

        public String getOwner() {
            return owner;
        }

        public void setOwner(String owner) {
            this.owner = owner;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public Map<String, Object> getCustomFields() {
            return customFields;
        }

        public void setCustomFields(Map<String, Object> customFields) {
            this.customFields = customFields;
        }
    }
