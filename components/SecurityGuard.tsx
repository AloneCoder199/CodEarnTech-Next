"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, X, Lock, AlertTriangle, EyeOff, Fingerprint } from "lucide-react"
import { toast } from "sonner"

// Ultra Attractive Security Guard with Cool Animations
const CoolSecurityGuard = ({ attempt, isWaving }: { attempt: number; isWaving: boolean }) => {
  const getMood = () => {
    if (attempt === 1) return "friendly" // 😊
    if (attempt === 2) return "serious" // 😐
    return "strict" // 😠
  }

  const mood = getMood()

  return (
    <div className="relative w-48 h-56 md:w-64 md:h-72">
      {/* Glow effect behind */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-3xl opacity-40 ${
          mood === "friendly" ? "bg-blue-500" : mood === "serious" ? "bg-orange-500" : "bg-red-500"
        }`}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <svg
        viewBox="0 0 200 240"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <motion.ellipse 
          cx="100" 
          cy="225" 
          rx="60" 
          ry="12" 
          fill="black" 
          opacity="0.15"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Body with breathing animation */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Uniform */}
          <path
            d="M50 210 L50 140 Q50 115 100 115 Q150 115 150 140 L150 210 Q150 230 100 230 Q50 230 50 210"
            fill="#1E3A8A"
          />
          {/* Uniform shine */}
          <path d="M65 140 L65 210" stroke="#3B82F6" strokeWidth="3" opacity="0.5" />
          <path d="M135 140 L135 210" stroke="#3B82F6" strokeWidth="3" opacity="0.5" />
          
          {/* Badge with pulse */}
          <motion.circle 
            cx="100" 
            cy="160" 
            r="15" 
            fill="#FBBF24"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <path d="M100 154 L102 159 L107 159 L103 163 L105 168 L100 165 L95 168 L97 163 L93 159 L98 159 Z" fill="#1E3A8A" />
        </motion.g>

        {/* Head */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <circle cx="100" cy="95" r="50" fill="#FCD34D" />
          
          {/* Hair with sway */}
          <motion.path 
            d="M50 75 Q70 50 100 50 Q130 50 150 75 Q140 60 120 55 Q100 45 80 55 Q60 60 50 75" 
            fill="#1F2937"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "100px", originY: "75px" }}
          />

          {/* Eyes based on mood */}
          {mood === "friendly" && (
            <>
              {/* Happy eyes */}
              <motion.path d="M75 85 Q85 80 95 85" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
              <motion.path d="M105 85 Q115 80 125 85" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Big smile */}
              <motion.path 
                d="M80 105 Q100 120 120 105" 
                stroke="#1F2937" 
                strokeWidth="3" 
                strokeLinecap="round" 
                fill="none"
                animate={{ d: ["M80 105 Q100 120 120 105", "M80 105 Q100 125 120 105", "M80 105 Q100 120 120 105"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </>
          )}

          {mood === "serious" && (
            <>
              {/* Focused eyes */}
              <ellipse cx="82" cy="88" rx="10" ry="8" fill="white" />
              <ellipse cx="118" cy="88" rx="10" ry="8" fill="white" />
              <circle cx="82" cy="90" r="5" fill="#1F2937" />
              <circle cx="118" cy="90" r="5" fill="#1F2937" />
              {/* Eyebrows */}
              <path d="M72 78 L92 82" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M108 82 L128 78" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />
              {/* Straight mouth */}
              <path d="M90 112 L110 112" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
              {/* Sweat drop */}
              <motion.path
                d="M140 70 Q143 65 140 60 Q137 65 140 70"
                fill="#60A5FA"
                animate={{ y: [0, 8, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </>
          )}

          {mood === "strict" && (
            <>
              {/* Angry eyes */}
              <ellipse cx="82" cy="90" rx="9" ry="7" fill="white" />
              <ellipse cx="118" cy="90" rx="9" ry="7" fill="white" />
              <circle cx="82" cy="92" r="4" fill="#1F2937" />
              <circle cx="118" cy="92" r="4" fill="#1F2937" />
              {/* Angry eyebrows */}
              <path d="M70 80 L94 88" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
              <path d="M106 88 L130 80" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
              {/* Frown */}
              <path d="M90 115 Q100 110 110 115" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Multiple sweat drops */}
              <motion.path d="M145 65 Q148 60 145 55 Q142 60 145 65" fill="#60A5FA" animate={{ y: [0, 10, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.path d="M135 70 Q138 65 135 60 Q132 65 135 70" fill="#60A5FA" animate={{ y: [0, 10, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
            </>
          )}

          {/* Eye shine */}
          <circle cx="85" cy="86" r="2.5" fill="white" opacity="0.8" />
          <circle cx="121" cy="86" r="2.5" fill="white" opacity="0.8" />
        </motion.g>

        {/* Left Hand - Stop Sign with wave animation */}
        <motion.g
          initial={{ x: 0, rotate: 0 }}
          animate={isWaving ? { 
            x: [0, -8, 8, -8, 8, 0],
            rotate: [-5, 5, -5, 5, 0]
          } : { x: 0, rotate: 0 }}
          transition={{ duration: 0.6 }}
          style={{ originX: "40px", originY: "150px" }}
        >
          <circle cx="40" cy="150" r="28" fill="#FCD34D" />
          {/* Stop sign octagon */}
          <motion.path
            d="M25 135 L55 135 L65 145 L65 155 L55 165 L25 165 L15 155 L15 145 Z"
            fill="#EF4444"
            stroke="white"
            strokeWidth="3"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: isWaving ? Infinity : 0 }}
          />
          <text x="40" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">STOP</text>
        </motion.g>

        {/* Right Hand - Shield with bounce */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <circle cx="160" cy="160" r="22" fill="#FCD34D" />
          <motion.path
            d="M160 145 L145 152 L145 165 L160 175 L175 165 L175 152 Z"
            fill="#10B981"
            stroke="white"
            strokeWidth="2.5"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ originX: "160px", originY: "160px" }}
          />
          <path d="M160 155 L160 168" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M155 162 L165 162" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* Cap with badge */}
        <motion.path 
          d="M45 70 Q100 35 155 70 L155 78 Q100 55 45 78 Z" 
          fill="#1E3A8A"
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect x="85" y="38" width="30" height="10" rx="2" fill="#1E3A8A" />
        {/* Cap badge */}
        <circle cx="100" cy="50" r="8" fill="#FBBF24" />
        <path d="M100 46 L101 49 L104 49 L102 51 L103 54 L100 52 L97 54 L98 51 L96 49 L99 49 Z" fill="#1E3A8A" />
      </svg>
    </div>
  )
}

interface SecurityModalProps {
  isOpen: boolean
  onClose: () => void
  attempt: number
  isWaving: boolean
}

function SecurityModal({ isOpen, onClose, attempt, isWaving }: SecurityModalProps) {
  const messages = {
    1: {
      title: "Hold on! 🛑",
      subtitle: "This area is restricted",
      description: "We appreciate your curiosity, but developer tools are off-limits to protect our content and maintain security.",
      action: "I understand",
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      icon: Shield
    },
    2: {
      title: "Please don't! ⚠️",
      subtitle: "Second warning",
      description: "This is your second attempt. One more try and we'll have to restrict access. Let's respect the boundaries.",
      action: "Got it, won't repeat",
      gradient: "from-orange-500 via-amber-500 to-orange-600",
      icon: AlertTriangle
    },
    3: {
      title: "Final warning! 🚫",
      subtitle: "Last chance",
      description: "Maximum attempts reached. Any further tries will trigger security protocols. Please close developer tools.",
      action: "I respect the security",
      gradient: "from-red-500 via-rose-500 to-red-600",
      icon: Lock
    }
  }

  const msg = messages[attempt as keyof typeof messages] || messages[3]
  const Icon = msg.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[9998]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: 15 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 perspective-1000"
          >
            <div className="relative bg-gradient-to-b from-card to-muted border-2 border-border rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
              {/* Animated gradient top */}
              <motion.div 
                className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${msg.gradient}`}
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 100%" }}
              />
              
              {/* Attempt badge */}
              <div className="absolute top-4 left-4 z-10">
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${msg.gradient} shadow-lg`}
                >
                  <Fingerprint className="w-3 h-3" />
                  Attempt {attempt} of 3
                </motion.span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors border border-border"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="p-8 pt-16 text-center">
                {/* Cool Cartoon */}
                <motion.div
                  initial={{ y: 30, opacity: 0, rotate: -10 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="flex justify-center mb-6"
                >
                  <CoolSecurityGuard attempt={attempt} isWaving={isWaving} />
                </motion.div>

                {/* Text content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    {msg.title}
                  </h3>
                  <p className={`text-sm font-bold mb-3 uppercase tracking-wider bg-gradient-to-r ${msg.gradient} bg-clip-text text-transparent`}>
                    {msg.subtitle}
                  </p>
                  <p className="text-muted-foreground mb-8 leading-relaxed max-w-sm mx-auto">
                    {msg.description}
                  </p>
                </motion.div>

                {/* Action button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r ${msg.gradient} text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3`}
                >
                  <Icon className="w-5 h-5" />
                  {msg.action}
                </motion.button>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground"
                >
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    256-bit Encrypted
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="flex items-center gap-1.5">
                    <EyeOff className="w-3.5 h-3.5" />
                    Protected Content
                  </span>
                </motion.div>
              </div>

              {/* Decorative corners */}
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function SecurityGuard() {
  const [modalOpen, setModalOpen] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [isWaving, setIsWaving] = useState(false)
  
  const devToolsOpenRef = useRef(false)
  const lastTriggerTimeRef = useRef(0)
  const isInitializedRef = useRef(false)

  // Only trigger on actual user action
  const triggerGuard = useCallback((reason: "devtools" | "rightclick" | "shortcut") => {
    // Prevent auto-trigger on mount
    if (!isInitializedRef.current) return
    
    const now = Date.now()
    
    // Minimum 5 seconds between triggers
    if (now - lastTriggerTimeRef.current < 5000) return
    lastTriggerTimeRef.current = now

    // If locked, show toast only
    if (isLocked) {
      toast.error("Security Protocol Active", {
        description: "Access restricted due to multiple violations.",
        icon: <Lock className="w-4 h-4 text-red-500" />,
        duration: 3000
      })
      return
    }

    // Increment attempt
    setAttemptCount(prev => {
      const newCount = prev + 1
      if (newCount >= 3) {
        setIsLocked(true)
        // Final toast after modal
        setTimeout(() => {
          toast.error("Maximum Attempts Reached", {
            description: "Security measures activated. Further attempts blocked.",
            icon: <AlertTriangle className="w-4 h-4 text-red-500" />,
            duration: 5000
          })
        }, 1500)
      }
      return newCount
    })

    // Trigger wave animation
    setIsWaving(true)
    setTimeout(() => setIsWaving(false), 1000)

    setModalOpen(true)
  }, [isLocked])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setIsWaving(false)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    // Mark as initialized after 2 seconds (prevents auto-show)
    const initTimer = setTimeout(() => {
      isInitializedRef.current = true
    }, 2000)

    // ❌ Right Click - Only trigger after initialization
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault()
      if (isInitializedRef.current) {
        triggerGuard("rightclick")
      }
    }

    // ❌ Keyboard Shortcuts
    const disableKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      const isDevToolKey = (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        (e.metaKey && e.altKey && ["i", "j"].includes(key)) ||
        (e.ctrlKey && key === "u")
      )

      if (isDevToolKey && isInitializedRef.current) {
        e.preventDefault()
        e.stopPropagation()
        triggerGuard("shortcut")
      }
    }

    // 🕵️ DevTools Detection - Smart check
    const detectDevTools = () => {
      if (!isInitializedRef.current) return

      const threshold = 200
      const widthDiff = window.outerWidth - window.innerWidth
      const heightDiff = window.outerHeight - window.innerHeight
      
      const isDevToolsOpen = widthDiff > threshold || heightDiff > threshold

      if (isDevToolsOpen && !devToolsOpenRef.current) {
        devToolsOpenRef.current = true
        triggerGuard("devtools")
      } else if (!isDevToolsOpen) {
        devToolsOpenRef.current = false
      }
    }

    // Attach listeners
    document.addEventListener("contextmenu", disableRightClick, { passive: false })
    document.addEventListener("keydown", disableKeys, { passive: false })
    
    // Check every 3 seconds (not aggressive)
    const interval = setInterval(detectDevTools, 3000)

    return () => {
      clearTimeout(initTimer)
      document.removeEventListener("contextmenu", disableRightClick)
      document.removeEventListener("keydown", disableKeys)
      clearInterval(interval)
    }
  }, [triggerGuard])

  return (
    <SecurityModal 
      isOpen={modalOpen} 
      onClose={closeModal} 
      attempt={attemptCount}
      isWaving={isWaving}
    />
  )
}