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

import com.contactmanager.model.Contact;
import com.contactmanager.model.SearchResult;
import com.contactmanager.repository.ContactRepository;

public class ContactService {

    private int totalSearches = 0;
    private Map<String, Integer> searchFrequency = new HashMap<>();
    private List<Contact> contacts;
    private ContactRepository repository;
    private int idCounter = 1;

    public ContactService() {
        repository = new ContactRepository();
        contacts = repository.load();

        if (!contacts.isEmpty()) {
            idCounter = contacts.stream()
                    .mapToInt(Contact::getId)
                    .max()
                    .orElse(0) + 1;
        }
    }

    public void addContact(String name, String phone, String email) {
        if (isDuplicatePhone(phone)) {
            System.out.println("Duplicate phone number not allowed!");
            return;
        }

        Contact contact = new Contact(idCounter++, name, phone, email);
        contacts.add(contact);
        repository.save(contacts);
    }

    public void importFromCSV(String fileName) {

        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {

            String line;
            br.readLine(); // skip header

            while ((line = br.readLine()) != null) {

                String[] data = line.split(",");

                if (data.length == 4) {

                    int id = Integer.parseInt(data[0]);
                    String name = data[1];
                    String phone = data[2];
                    String email = data[3];

                    if (!isDuplicatePhone(phone)) {
                        Contact contact = new Contact(id, name, phone, email);
                        contacts.add(contact);

                        if (id >= idCounter) {
                            idCounter = id + 1;
                        }
                    } else {
                        System.out.println("Duplicate skipped: " + phone);
                    }
                }
            }

            repository.save(contacts); // Save after import
            System.out.println("Import successful!");

        } catch (IOException e) {
            System.out.println("Error importing CSV: " + e.getMessage());
        }
    }

    public void exportToCSV(String fileName) {

        try (FileWriter writer = new FileWriter(fileName)) {

            writer.write("ID,Name,Phone,Email\n");

            for (Contact c : contacts) {
                writer.write(
                        c.getId() + ","
                        + c.getName() + ","
                        + c.getPhone() + ","
                        + c.getEmail() + "\n"
                );
            }

            System.out.println("Exported successfully!");

        } catch (IOException e) {
            System.out.println("Error exporting CSV: " + e.getMessage());
        }
    }

    public List<Contact> smartSearch(String keyword) {
        totalSearches++;
        searchFrequency.put(keyword,
                searchFrequency.getOrDefault(keyword, 0) + 1);
        keyword = keyword.toLowerCase();
        List<SearchResult> results = new ArrayList<>();

        for (Contact c : contacts) {

            int score = 0;

            // Highest priority → startsWith name
            if (c.getName().toLowerCase().startsWith(keyword)) {
                score += 100;
            } // Medium priority → name contains
            else if (c.getName().toLowerCase().contains(keyword)) {
                score += 70;
            }

            // Email match
            if (c.getEmail().toLowerCase().contains(keyword)) {
                score += 50;
            }

            // Phone match
            if (c.getPhone().contains(keyword)) {
                score += 30;
            }

            if (score > 0) {
                results.add(new SearchResult(c, score));
            }
        }

        // Sort by score descending
        results.sort(Comparator.comparingInt(SearchResult::getScore).reversed());

        // Extract contacts only
        List<Contact> finalResults = new ArrayList<>();
        for (SearchResult r : results) {
            finalResults.add(r.getContact());
        }

        return finalResults;
    }

    public void showSearchAnalytics() {

        System.out.println("Total Searches: " + totalSearches);

        System.out.println("Search Frequency:");
        for (Map.Entry<String, Integer> entry : searchFrequency.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }

    public List<Contact> getAllContacts() {
        return contacts;
    }

    public Contact deleteContact(int id) {
        Contact toRemove = null;

        for (Contact c : contacts) {
            if (c.getId() == id) {
                toRemove = c;
                break;
            }
        }

        if (toRemove != null) {
            contacts.remove(toRemove);
            repository.save(contacts);
        }

        return toRemove;
    }

    public List<Contact> search(String keyword) {
        List<Contact> results = new ArrayList<>();

        for (Contact c : contacts) {
            if (c.getName().toLowerCase().contains(keyword.toLowerCase())) {
                results.add(c);
            }
        }

        return results;
    }

    public List<String> getSuggestions(String prefix) {
        List<String> suggestions = new ArrayList<>();

        for (Contact c : contacts) {
            if (c.getName().toLowerCase().startsWith(prefix.toLowerCase())) {
                suggestions.add(c.getName());
            }
        }

        return suggestions;
    }

    private boolean isDuplicatePhone(String phone) {
        for (Contact c : contacts) {
            if (c.getPhone().equals(phone)) {
                return true;
            }
        }
        return false;
    }
}
