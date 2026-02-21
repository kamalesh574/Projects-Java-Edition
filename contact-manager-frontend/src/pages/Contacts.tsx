import { useEffect, useState, useRef } from "react";
import { getContacts, deleteContact, searchContacts, createContact } from "../api/contactApi";
import type { Contact } from "../types/Contact";
import ContactCard from "../components/contacts/ContactCard";
import toast from "react-hot-toast";
import AddContactModal from "../components/contacts/AddContactModal";
import DeleteConfirmModal from "../components/contacts/DeleteConfirmModal";
import ContactDrawer from "../components/contacts/ContactDrawer";
import { FaPlus, FaSearch, FaUpload, FaDownload } from "react-icons/fa";
import Papa from "papaparse";

const Contacts = () => {
  // --- State Hooks ---
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [search, setSearch] = useState("");

  // --- Refs ---
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- API Calls ---
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

  // --- Effect Hooks ---
  useEffect(() => {
    fetchContacts();
  }, []);

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

  // --- Handler Functions ---
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

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          for (const row of results.data as any[]) {
            await createContact({
              name: row.Name || row.name,
              email: row.Email || row.email,
              phone: row.Phone || row.phone,
            });
          }
          toast.success("Contacts imported successfully");
          fetchContacts();
        } catch {
          toast.error("Import failed");
        } finally {
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      },
    });
  };

  const exportCSV = () => {
    if (contacts.length === 0) {
      toast.error("No contacts to export");
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone"];
    const rows = contacts.map((c) => [c.id, c.name, c.email, c.phone]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV exported successfully");
  };

  // --- Render Method ---
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Contacts</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and organize your professional network</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative group">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-64 transition-all"
            />
          </div>

          {/* Export Button */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-green-600 px-5 py-2.5 rounded-xl hover:bg-green-500 transition font-medium text-white shadow-lg shadow-green-900/20"
          >
            <FaDownload />
            <span>Export</span>
          </button>

          {/* Import Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-purple-500 text-slate-200 px-5 py-2.5 rounded-xl transition-all font-medium"
          >
            <FaUpload className="text-purple-400" />
            <span>Import</span>
          </button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImport}
          />

          {/* Add Contact Button */}
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
        <div className="flex flex-col items-center justify-center py-24 bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800">
          <div className="p-4 bg-slate-800/50 rounded-full mb-4">
            <FaSearch className="text-3xl text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-300">No contacts found</h3>
          <p className="text-slate-500 mt-2 text-center max-w-xs">
            Try adjusting your search filters or start by adding a new contact.
          </p>
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