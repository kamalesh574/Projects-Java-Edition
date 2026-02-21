package com.contactmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.contactmanager.model.Contact;
import com.contactmanager.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public Contact save(Contact contact) {
        return repository.save(contact);
    }

    public List<Contact> getAll() {
        return repository.findAll();
    }

    public List<Contact> smartSearch(String keyword) {
        return repository.findByNameContainingIgnoreCase(keyword);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}