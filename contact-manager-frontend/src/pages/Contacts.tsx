import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../api/contactApi";
import type { Contact } from "../types/Contact";
import ContactCard from "../components/contacts/ContactCard";
import toast from "react-hot-toast";
import AddContactModal from "../components/contacts/AddContactModal";
import { FaPlus } from "react-icons/fa";
import DeleteConfirmModal from "../components/contacts/DeleteConfirmModal";
import ContactDrawer from "../components/contacts/ContactDrawer";

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch {
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteContact(deleteId);
      setContacts((prev) => prev.filter((c) => c.id !== deleteId));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const handleView = (contact: Contact) => {
    console.log(contact);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Contacts</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-white"
        >
          <FaPlus />
          Add Contact
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No contacts found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={(id) => setDeleteId(id)}
              onView={(contact) => setSelectedContact(contact)}
            />
          ))}
        </div>
      )}

      {/* Add Contact Modal */}
      {showModal && (
        <AddContactModal
          onClose={() => setShowModal(false)}
          onSuccess={(newContact) => {
            setContacts((prev) => [...prev, newContact]);
            setShowModal(false);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <DeleteConfirmModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {selectedContact && (
        <ContactDrawer
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
};

export default Contacts;
