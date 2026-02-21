import { motion } from "framer-motion";
import { FaTrash, FaEye } from "react-icons/fa";
import type { Contact } from "../../types/Contact";

interface Props {
  contact: Contact;
  onDelete: (id: number) => void;
  onView: (contact: Contact) => void;
}

const ContactCard = ({ contact, onDelete, onView }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg flex justify-between items-center"
    >
      <div>
        <h2 className="text-lg font-semibold">{contact.name}</h2>
        <p className="text-gray-400 text-sm">{contact.email}</p>
        <p className="text-gray-500 text-sm">{contact.phone}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onView(contact)}
          className="text-blue-400 hover:text-blue-300 transition"
        >
          <FaEye />
        </button>

        <button
          onClick={() => onDelete(contact.id!)}
          className="text-red-400 hover:text-red-300 transition"
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
};

export default ContactCard;