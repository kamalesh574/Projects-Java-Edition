package com.contactmanager.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.contactmanager.exception.ContactNotFoundException;
import com.contactmanager.model.Contact;
import com.contactmanager.model.SearchResult;
import com.contactmanager.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public Contact addContact(String name, String phone, String email) {
        Contact contact = new Contact();
        contact.setName(name);
        contact.setPhone(phone);
        contact.setEmail(email);
        return repository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return repository.findAll();
    }

    public Contact deleteContact(int id) {
        Contact contact = repository.findById(id)
                .orElseThrow(() ->
                        new ContactNotFoundException("Contact with ID " + id + " not found"));

        repository.delete(contact);
        return contact;
    }

    public List<Contact> smartSearch(String keyword) {
        return repository.findByNameContainingIgnoreCase(keyword);
    }
}