package com.contactmanager;

import java.util.List;
import java.util.Scanner;

import com.contactmanager.model.Contact;
import com.contactmanager.model.Role;
import com.contactmanager.service.AuthService;
import com.contactmanager.service.ContactService;
import com.contactmanager.utils.Colors;
import com.contactmanager.utils.PerformanceTracker;
import com.contactmanager.utils.UndoRedoManager;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        AuthService authService = new AuthService();

        System.out.print("Username: ");
        String username = sc.nextLine();

        System.out.print("Password: ");
        String password = sc.nextLine();

        Role role = authService.login(username, password);

        if (role == null) {
            System.out.println("Invalid credentials!");
            return;
        }

        System.out.println("Login successful! Role: " + role);

        // 🧠 STEP 2: CREATE OBJECTS
        ContactService service = new ContactService();
        UndoRedoManager undoRedo = new UndoRedoManager();

        // 🎨 STEP 8: MENU STARTS HERE
        while (true) {

            System.out.println(Colors.BLUE + "\n==== CONTACT MANAGER ====");
            System.out.println("1. Add Contact");
            System.out.println("2. View Contacts");
            System.out.println("3. Delete Contact");
            System.out.println("4. Undo Delete");
            System.out.println("5. Redo Delete");
            System.out.println("6. Search");
            System.out.println("7. Import from CSV");
            System.out.println("8. Export to CSV");
            System.out.println("9. Analytics Dashboard");
            System.out.println("10. Exit" + Colors.RESET);

            System.out.print("Choose: ");
            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:

                    if (role != Role.ADMIN) {
                        System.out.println("Access denied! Admin only.");
                        break;
                    }
                    // add logic here
                    System.out.print("Name: ");
                    String name = sc.nextLine();
                    System.out.print("Phone: ");
                    String phone = sc.nextLine();
                    System.out.print("Email: ");
                    String email = sc.nextLine();

                    long start = PerformanceTracker.start();
                    service.addContact(name, phone, email);
                    PerformanceTracker.stop(start, "Add Contact");

                    System.out.println(Colors.GREEN + "Contact Added!" + Colors.RESET);
                    break;

                case 2:
                    for (Contact c : service.getAllContacts()) {
                        System.out.println(c);
                    }
                    break;

                case 3:

                    if (role != Role.ADMIN) {
                        System.out.println("Access denied! Admin only.");
                        break;
                    }
                    // delete logic here
                    System.out.print("Enter ID to delete: ");
                    int id = sc.nextInt();
                    sc.nextLine();
                    Contact deleted = service.deleteContact(id);
                    if (deleted != null) {
                        undoRedo.recordDelete(deleted);
                        System.out.println(Colors.YELLOW + "Deleted!" + Colors.RESET);
                    } else {
                        System.out.println(Colors.RED + "Not Found!" + Colors.RESET);
                    }
                    break;

                case 4:
                    Contact undoContact = undoRedo.undo();
                    if (undoContact != null) {
                        service.getAllContacts().add(undoContact);
                        System.out.println(Colors.GREEN + "Undo Successful!" + Colors.RESET);
                    }
                    break;

                case 5:
                    Contact redoContact = undoRedo.redo();
                    if (redoContact != null) {
                        service.deleteContact(redoContact.getId());
                        System.out.println(Colors.GREEN + "Redo Successful!" + Colors.RESET);
                    }
                    break;

                case 6:
                    System.out.print("Search keyword: ");
                    String keyword = sc.nextLine();

                    List<Contact> results = service.smartSearch(keyword);

                    if (results.isEmpty()) {
                        System.out.println("No results found.");
                    } else {
                        for (Contact c : results) {
                            System.out.println(c);
                        }
                    }
                    break;
                case 7:

                    if (role != Role.ADMIN) {
                        System.out.println("Access denied! Admin only.");
                        break;
                    }
                    System.out.print("Enter CSV file name: ");
                    String fileName = sc.nextLine();
                    service.importFromCSV(fileName);
                    break;
                case 8:
                    if (role != Role.ADMIN) {
                        System.out.println("Access denied! Admin only.");
                        break;
                    }

                    service.exportToCSV("contacts.csv");
                    System.out.println(Colors.GREEN + "CSV Exported!" + Colors.RESET);
                    break;
                case 9:
                    if (role != Role.ADMIN) {
                        System.out.println("Access denied! Admin only.");
                        break;
                    }
                    service.showDashboard();
                    break;
                case 10:
                    System.out.println("Bye 👋");
                    return;

                default:
                    System.out.println("Invalid choice!");
            }
        }
    }
}
