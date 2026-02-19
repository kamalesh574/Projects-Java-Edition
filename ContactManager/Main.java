
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // 🔐 STEP 1: PASSWORD PROTECTION
        System.out.print("Enter Admin Password: ");
        String password = sc.nextLine();

        if (!password.equals("admin123")) {
            System.out.println(Colors.RED + "Wrong Password! Exiting..." + Colors.RESET);
            return;
        }

        // 🧠 STEP 2: CREATE OBJECTS
        ContactService service = new ContactService();
        UndoRedoManager undoRedo = new UndoRedoManager();
        service.loadFromFile();
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
            System.out.println("9. Exit" + Colors.RESET);

            System.out.print("Choose: ");
            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    System.out.print("Name: ");
                    String name = sc.nextLine();
                    System.out.print("Phone: ");
                    String phone = sc.nextLine();
                    System.out.print("Email: ");
                    String email = sc.nextLine();

                    long start = PerformanceTracker.start();
                    service.addContact(name, phone, email);
                    service.saveToFile();
                    PerformanceTracker.stop(start, "Add Contact");

                    System.out.println(Colors.GREEN + "Contact Added!" + Colors.RESET);
                    break;

                case 2:
                    for (Contact c : service.getAllContacts()) {
                        System.out.println(c);
                    }
                    break;

                case 3:
                    System.out.print("Enter ID to delete: ");
                    int id = sc.nextInt();

                    Contact deleted = service.deleteContact(id);
                    if (deleted != null) {
                        undoRedo.recordDelete(deleted);
                        System.out.println(Colors.YELLOW + "Deleted!" + Colors.RESET);
                    } else {
                        System.out.println(Colors.RED + "Not Found!" + Colors.RESET);
                    }
                    service.saveToFile();
                    break;

                case 4:
                    Contact undoContact = undoRedo.undo();
                    if (undoContact != null) {
                        service.getAllContacts().add(undoContact);
                        System.out.println(Colors.GREEN + "Undo Successful!" + Colors.RESET);
                    }
                    service.saveToFile();
                    break;

                case 5:
                    Contact redoContact = undoRedo.redo();
                    if (redoContact != null) {
                        service.deleteContact(redoContact.getId());
                        System.out.println(Colors.GREEN + "Redo Successful!" + Colors.RESET);
                    }
                    service.saveToFile();
                    break;

                case 6:
                    System.out.print("Search name: ");
                    String keyword = sc.nextLine();
                    for (Contact c : service.search(keyword)) {
                        System.out.println(c);
                    }
                    break;
                case 7:
                    System.out.print("Enter CSV file name: ");
                    String fileName = sc.nextLine();
                    service.importFromCSV(fileName);
                    break;
                case 8:
                    service.exportToCSV("contacts.csv");
                    System.out.println(Colors.GREEN + "CSV Exported!" + Colors.RESET);
                    break;

                case 9:
                    System.out.println("Bye 👋");
                    return;

                default:
                    System.out.println("Invalid choice!");
            }
        }
    }
}
