package com.contactmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.contactmanager.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> findByNameContainingIgnoreCase(String keyword);

}