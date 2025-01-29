import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, X } from "lucide-react"

type PublishModalProps = {
  isOpen: boolean
  onClose: () => void
  url: string
}

export default function PublishModal({ isOpen, onClose, url }: PublishModalProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black p-6 rounded-lg border border-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Your AI Agent is Published!</h2>
              <button onClick={onClose} className="text-white">
                <X size={24} />
              </button>
            </div>
            <p className="mb-4 text-white">You can access your AI Agent at:</p>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 p-2 bg-black text-white border border-white rounded"
              />
              <button onClick={copyToClipboard} className="px-4 py-2 bg-white text-black rounded flex items-center">
                <Copy size={16} className="mr-2" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

