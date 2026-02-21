import { useState } from "react";
import { motion } from "framer-motion";
import type { Contact } from "../../types/Contact";
import { createContact } from "../../api/contactApi";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  onSuccess: (contact: Contact) => void;
}

const AddContactModal = ({ onClose, onSuccess }: Props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    try {
      const newContact = await createContact(form);
      toast.success("Contact added successfully");
      onSuccess(newContact);
      onClose();
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
      } else {
        toast.error("Failed to add contact");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-slate-900 p-8 rounded-xl w-96 border border-slate-800"
      >
        <h2 className="text-xl font-bold mb-6">Add Contact</h2>

        <div className="space-y-4">
          <div>
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddContactModal;