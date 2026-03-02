/**
 * @file Accessible modal dialog.
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modal primitive.
 * @param {Object} props - Props object.
 * @param {boolean} props.open - Visibility flag.
 * @param {Function} props.onClose - Close handler.
 * @param {string} [props.title] - Modal title.
 * @param {React.ReactNode} props.children - Modal content.
 * @returns {JSX.Element|null} Modal component.
 */
export default function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg rounded-xl bg-white p-6 dark:bg-surface-900"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            {title ? <h3 className="mb-4 text-xl font-bold">{title}</h3> : null}
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
