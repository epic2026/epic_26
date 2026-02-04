package com.contact.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Map;

@Entity

@Table(
        name = "contacts_db",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_contacts_email",
                        columnNames = "email"
                ),
                @UniqueConstraint(
                        name = "uk_contacts_phone",
                        columnNames = "phone_number"
                )
        }
)

public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contactId;
    @Column(unique = true)
    private String fullName;
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "email",nullable = false)
    private String email;
    private String leadStatus;
    private String owner;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastActivityDate;
    private String notes;

    @Column(columnDefinition = "TEXT")
    private String custom_fields; // JSON stored as TEXT

    @Transient
    private Map<String, Object> customFieldsMap; // Parsed Map for service or controller
    private String profilePicPath;

    public Long getContactId() {
        return contactId;
    }

    public void setContactId(Long contactId) {
        this.contactId = contactId;
    }

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

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getLastActivityDate() {
        return lastActivityDate;
    }

    public void setLastActivityDate(Date lastActivityDate) {
        this.lastActivityDate = lastActivityDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getCustom_fields() {
        return custom_fields;
    }

    public void setCustom_fields(String custom_fields) {
        this.custom_fields = custom_fields;
    }

    public Map<String, Object> getCustomFieldsMap() {
        return customFieldsMap;
    }

    public void setCustomFieldsMap(Map<String, Object> customFieldsMap) {
        this.customFieldsMap = customFieldsMap;
    }

    public String getProfilePicPath() {
        return profilePicPath;
    }

    public void setProfilePicPath(String profilePicPath) {
        this.profilePicPath = profilePicPath;
    }

    // Automatically called when inserting
    @PrePersist
    protected void onCreate() {
        Date now = new Date();
        this.createdDate = now;
        this.lastActivityDate = now;
    }

    //Automatically called when updating
    @PreUpdate
    protected void onUpdate() {
        this.lastActivityDate = new Date();
    }
}