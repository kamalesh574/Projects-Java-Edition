import { motion } from "framer-motion";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({ onConfirm, onCancel }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-slate-900 p-6 rounded-xl w-80 border border-slate-800"
      >
        <h2 className="text-lg font-semibold mb-4">
          Delete Contact?
        </h2>

        <p className="text-gray-400 mb-6 text-sm">
          This action cannot be undone.
        </p>

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmModal;