package com.contactmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.contactmanager.model.Contact;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

    List<Contact> findByNameContainingIgnoreCase(String keyword);

}