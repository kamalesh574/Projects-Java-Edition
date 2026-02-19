import java.util.Stack;

public class UndoRedoManager {

    private Stack<Contact> undoStack = new Stack<>();
    private Stack<Contact> redoStack = new Stack<>();

    public void recordDelete(Contact contact) {
        undoStack.push(contact);
        redoStack.clear();
    }

    public Contact undo() {
        if (!undoStack.isEmpty()) {
            Contact contact = undoStack.pop();
            redoStack.push(contact);
            return contact;
        }
        return null;
    }

    public Contact redo() {
        if (!redoStack.isEmpty()) {
            Contact contact = redoStack.pop();
            undoStack.push(contact);
            return contact;
        }
        return null;
    }
}