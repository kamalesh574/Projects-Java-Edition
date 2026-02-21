import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import type { Contact } from "../../types/Contact";

interface Props {
  contact: Contact | null;
  onClose: () => void;
}

const ContactDrawer = ({ contact, onClose }: Props) => {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ duration: 0.3 }}
        className="relative w-96 h-full bg-slate-900 border-l border-slate-800 p-8 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Contact Details</h2>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-lg">{contact.name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p>{contact.email}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            <p>{contact.phone}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactDrawer;