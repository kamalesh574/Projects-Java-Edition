
import java.io.*;
import java.util.*;

public class ContactService {

    private static final String FILE_NAME = "contacts.dat";
    private List<Contact> contacts = new ArrayList<>();
    private int idCounter = 1;

    public void saveToFile() {
        try (ObjectOutputStream oos
                = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {

            oos.writeObject(contacts);

        } catch (IOException e) {
            System.out.println("Error saving contacts: " + e.getMessage());
        }
    }

    public void loadFromFile() {

        File file = new File(FILE_NAME);

        if (!file.exists()) {
            return; // First time run, no file yet
        }

        try (ObjectInputStream ois
                = new ObjectInputStream(new FileInputStream(FILE_NAME))) {

            contacts = (List<Contact>) ois.readObject();

            // Reset idCounter properly
            for (Contact c : contacts) {
                if (c.getId() >= idCounter) {
                    idCounter = c.getId() + 1;
                }
            }

        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error loading contacts: " + e.getMessage());
        }
    }

    public void addContact(String name, String phone, String email) {
        Contact contact = new Contact(idCounter++, name, phone, email);
        contacts.add(contact);
    }

    public List<Contact> getAllContacts() {
        return contacts;
    }

    public Contact deleteContact(int id) {
        for (Contact c : contacts) {
            if (c.getId() == id) {
                contacts.remove(c);
                return c;
            }
        }
        return null;
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

    public void importFromCSV(String fileName) {

        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {

            String line;

            br.readLine(); // Skip header

            while ((line = br.readLine()) != null) {

                String[] data = line.split(",");

                if (data.length == 4) {

                    int id = Integer.parseInt(data[0]);
                    String name = data[1];
                    String phone = data[2];
                    String email = data[3];

                    Contact contact = new Contact(id, name, phone, email);
                    contacts.add(contact);

                    if (id >= idCounter) {
                        idCounter = id + 1;
                    }
                }
            }

            saveToFile(); // Save after import

            System.out.println("Import successful!");

        } catch (IOException e) {
            System.out.println("Error importing CSV: " + e.getMessage());
        }
    }

    public void exportToCSV(String fileName) {

        try (FileWriter writer = new FileWriter(fileName)) {

            // Header
            writer.write("ID,Name,Phone,Email\n");

            // Data
            for (Contact c : contacts) {
                writer.write(
                        c.getId() + ","
                        + c.getName() + ","
                        + c.getPhone() + ","
                        + c.getEmail() + "\n"
                );
            }

            System.out.println("Exported successfully to " + fileName);

        } catch (IOException e) {
            System.out.println("Error exporting file: " + e.getMessage());
        }
    }
}
