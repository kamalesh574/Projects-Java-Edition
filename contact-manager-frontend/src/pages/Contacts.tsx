import { useEffect, useState } from "react";
import { getContacts, deleteContact, searchContacts } from "../api/contactApi";
import type { Contact } from "../types/Contact";
import ContactCard from "../components/contacts/ContactCard";
import toast from "react-hot-toast";
import AddContactModal from "../components/contacts/AddContactModal";
import DeleteConfirmModal from "../components/contacts/DeleteConfirmModal";
import ContactDrawer from "../components/contacts/ContactDrawer";
import { FaPlus, FaSearch } from "react-icons/fa";

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [search, setSearch] = useState("");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
    } catch {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Professional Debounced Search
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.trim() === "") {
        fetchContacts();
      } else {
        try {
          const data = await searchContacts(search);
          setContacts(data);
        } catch {
          toast.error("Search failed");
        }
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteContact(deleteId);
      setContacts((prev) => prev.filter((c) => c.id !== deleteId));
      toast.success("Contact deleted successfully");
    } catch {
      toast.error("Failed to delete contact");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Contacts</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and organize your professional network</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 w-full md:w-72 transition-all"
            />
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 px-5 py-2.5 rounded-xl hover:bg-blue-500 active:scale-95 transition-all text-white font-medium shadow-lg shadow-blue-900/20"
          >
            <FaPlus />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-800/50 rounded-2xl border border-slate-700"></div>
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800">
          <div className="p-4 bg-slate-800 rounded-full mb-4">
             <FaSearch className="text-3xl text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-300">No contacts found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search or add a new contact.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Modals & Overlays */}
      {showModal && (
        <AddContactModal
          onClose={() => setShowModal(false)}
          onSuccess={(newContact) => {
            setContacts((prev) => [...prev, newContact]);
            setShowModal(false);
          }}
        />
      )}

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