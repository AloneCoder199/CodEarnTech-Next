"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import ReplyButton from "./ReplyButton"
import Image from "next/image"
import { 
  Quote, 
  Heart, 
  Sparkles, 
  Mic, 
  Play, 
  Pause,
  Volume2,
  Send,
  ArrowDown,
  Shield,
  Lock,
  Ban,
  Languages
} from "lucide-react"

// Typing effect hook
function useTypingEffect(text: string, trigger: boolean, speed: number = 50) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!trigger) return
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [trigger, text, speed])
  
  return { displayText, isComplete }
}

// Audio wave component
function AudioWave({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-1 h-8">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-primary/60"
          animate={isPlaying ? {
            height: [4, 12 + Math.random() * 16, 4],
            opacity: [0.4, 1, 0.4]
          } : { height: 4, opacity: 0.3 }}
          transition={{
            duration: 0.5,
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.05,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}


// Protected Image Component
function ProtectedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative w-full h-full select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover pointer-events-none"
        draggable={false}
        unoptimized
      />

      {/* Watermark overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-10 transition-opacity duration-300">
        <span className="text-4xl font-bold text-white rotate-45 whitespace-nowrap select-none">
          © CodEarn Tech Protected
        </span>
      </div>

      {/* Protection badge */}
      <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 z-10">
        <Lock className="w-4 h-4 text-white" />
      </div>
    </div>
  )
}


export function FounderMessage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-200px" })
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullMessage, setShowFullMessage] = useState(false)
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices()
      setVoicesLoaded(true)
    }
    
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    
    // Block dev tools
    const blockDevTools = (e: KeyboardEvent) => {
      if (
        e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault()
        return false
      }
    }
    
    // Block context menu
    const blockContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }
    
    window.addEventListener("keydown", blockDevTools)
    document.addEventListener("contextmenu", blockContextMenu)
    
    return () => {
      window.removeEventListener("keydown", blockDevTools)
      document.removeEventListener("contextmenu", blockContextMenu)
      window.speechSynthesis.cancel()
    }
  }, [])

  // Speech content for both languages
  const speechContent = {
    en: `I know how it feels to stare at a screen, thinking you're not good enough. I've been there. Five years ago, I was sitting in a small village with broken internet, learning to code from a cracked phone screen. Everyone said I was wasting my time. Software engineering is not for people like us, they said. I applied to 47 companies. 47 rejections. Not because I lacked talent, but because I lacked experience. How do you get experience when no one gives you a chance? That's why I built CodEarn Tech. Not as a company, but as a promise. A promise that your background doesn't define your future. That a boy from a village can teach thousands. That failure is just data, not destiny. To every student reading this: I see you. I see your late nights, your self-doubt, your fear that maybe you're not cut out for this. You are. You just need someone to believe in you until you believe in yourself. This is not just about coding. This is about proving to yourself that you can. That you will. That you must. I'm not your teacher. I'm your proof that it's possible.`,
    
    ur: `Mujhe pata hai kaisa lagta hai screen ko ghoor kar dekhna, soch kar ke tum kaafi nahi ho. Main wahan khada tha. Paanch saal pehle, main aik chhotay gaon mein baitha tha, toota hua internet tha, toota hua phone screen tha, aur main coding seekh raha tha. Sab kehtay thay main apna waqt zaya kar raha hoon. Software engineering hamaray liye nahi hai, kehtay thay. Main ne 47 companies mein apply kiya. 47 rejections. Is liye nahi ke main mein talent nahi tha, balke is liye ke experience nahi tha. Experience kaise mile jab koi chance hi nahi deta? Isi liye main ne CodEarn Tech banaya. Aik company nahi, balke aik waada. Waada ke tumhara background tumhara mustaqbil nahi tay karta. Ke aik gaon ka larka hazaar logon ko sikha sakta hai. Ke nakami sirf data hai, taqdeer nahi. Har student jo yeh parh raha hai: main tumhein dekh raha hoon. Main tumhari raat bhar ki mehnat dekh raha hoon, tumhara khud par shak, tumhara dar ke shayad tum is layak nahi. Tum ho. Tumhein bas kisi ki zaroorat hai jo tum par yaqeen karey jab tak tum khud par yaqeen na kar lo. Yeh sirf coding nahi hai. Yeh khud ko sabit karna hai ke tum kar sakte ho. Ke tum karogay. Ke tumhein karna hai. Main tumhara teacher nahi hoon. Main tumhara saboot hoon ke yeh mumkin hai.`
  }

  // Speak function with human-like settings
  const speak = useCallback((text: string, lang: "en" | "ur") => {
    if (!window.speechSynthesis) {
      alert("Speech synthesis not supported in your browser")
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Deep emotional voice settings - HUMAN LIKE
    utterance.rate = 0.75      // Slower for depth and emotion
    utterance.pitch = 0.85     // Slightly deeper, masculine
    utterance.volume = 1       // Full volume
    
    // Get voices and select best one
    const voices = window.speechSynthesis.getVoices()
    
    let selectedVoice = null
    
    if (lang === "en") {
      // Prefer deep male English voices
      selectedVoice = voices.find(v => 
        (v.name.includes("David") || 
         v.name.includes("James") || 
         v.name.includes("Daniel") ||
         v.name.includes("Google US English")) &&
        v.lang.startsWith("en")
      ) || voices.find(v => v.lang.startsWith("en") && v.name.includes("Male")) 
        || voices.find(v => v.lang.startsWith("en"))
    } else {
      // For Urdu, try Arabic or Hindi voices as fallback
      selectedVoice = voices.find(v => 
        v.lang.startsWith("ur") || 
        v.lang.startsWith("ar") ||
        v.lang.startsWith("hi")
      ) || voices[0]
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    
    utterance.lang = lang === "en" ? "en-US" : "ur-PK"
    
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)
    
    window.speechSynthesis.speak(utterance)
  }, [voicesLoaded])

  const handleToggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      speak(speechContent[language], language)
    }
  }

  const handleLanguageChange = (lang: "en" | "ur") => {
    setLanguage(lang)
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setTimeout(() => speak(speechContent[lang], lang), 100)
    }
  }

  // Main message with typing effect
  const mainMessage = language === "en" 
    ? "I know how it feels to stare at a screen, thinking you're not good enough. I've been there."
    : "Mujhe pata hai kaisa lagta hai screen ko ghoor kar dekhna, soch kar ke tum kaafi nahi ho. Main wahan khada tha."
    
  const { displayText: typedMain, isComplete: mainComplete } = useTypingEffect(mainMessage, isInView, 60)

  // Full message sections
  const messageSections = language === "en" ? [
    {
      text: "5 years ago, I was sitting in a small village with broken internet, learning to code from a cracked phone screen. Everyone said I was wasting my time. 'Software engineering is not for people like us,' they said.",
      highlight: "broken internet, learning to code from a cracked phone screen"
    },
    {
      text: "I applied to 47 companies. 47 rejections. Not because I lacked talent, but because I lacked 'experience'. How do you get experience when no one gives you a chance?",
      highlight: "47 companies. 47 rejections"
    },
    {
      text: "That's why I built CodEarn Tech. Not as a company, but as a promise. A promise that your background doesn't define your future. That a boy from a village can teach thousands. That failure is just data, not destiny.",
      highlight: "your background doesn't define your future"
    },
    {
      text: "To every student reading this: I see you. I see your late nights, your self-doubt, your fear that maybe you're not cut out for this. You are. You just need someone to believe in you until you believe in yourself.",
      highlight: "I see your late nights, your self-doubt"
    },
    {
      text: "This is not just about coding. This is about proving to yourself that you can. That you will. That you must.",
      highlight: "proving to yourself that you can"
    }
  ] : [
    {
      text: "Paanch saal pehle, main aik chhotay gaon mein baitha tha, toota hua internet tha, toota hua phone screen tha, aur main coding seekh raha tha. Sab kehtay thay main apna waqt zaya kar raha hoon. 'Software engineering hamaray liye nahi hai,' kehtay thay.",
      highlight: "toota hua internet tha, toota hua phone screen tha"
    },
    {
      text: "Main ne 47 companies mein apply kiya. 47 rejections. Is liye nahi ke main mein talent nahi tha, balke is liye ke experience nahi tha. Experience kaise mile jab koi chance hi nahi deta?",
      highlight: "47 companies mein apply kiya. 47 rejections"
    },
    {
      text: "Isi liye main ne CodEarn Tech banaya. Aik company nahi, balke aik waada. Waada ke tumhara background tumhara mustaqbil nahi tay karta. Ke aik gaon ka larka hazaar logon ko sikha sakta hai.",
      highlight: "tumhara background tumhara mustaqbil nahi tay karta"
    },
    {
      text: "Har student jo yeh parh raha hai: main tumhein dekh raha hoon. Main tumhari raat bhar ki mehnat dekh raha hoon, tumhara khud par shak, tumhara dar ke shayad tum is layak nahi. Tum ho.",
      highlight: "tumhari raat bhar ki mehnat dekh raha hoon"
    },
    {
      text: "Yeh sirf coding nahi hai. Yeh khud ko sabit karna hai ke tum kar sakte ho. Ke tum karogay. Ke tumhein karna hai.",
      highlight: "khud ko sabit karna hai ke tum kar sakte ho"
    }
  ]

  const closingMessage = language === "en"
    ? "I'm not your teacher. I'm your proof that it's possible."
    : "Main tumhara teacher nahi hoon. Main tumhara saboot hoon ke yeh mumkin hai."
    
  const { displayText: typedClosing, isComplete: closingComplete } = useTypingEffect(
    closingMessage, 
    mainComplete && showFullMessage, 
    80
  )

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/20"
      onContextMenu={(e) => e.preventDefault()}
    >
      

      {/* Deep Emotional Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5" />
        
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[150px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      </motion.div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-center py-24"
        style={{ scale }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              {language === "en" ? "A Personal Letter" : "Aik Shakhsi Khat"}
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {language === "en" ? (
              <>Words I Needed to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Hear</span></>
            ) : (
              <>Wo Alfaaz Jo Main <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Sunnna Chahta Tha</span></>
            )}
          </h2>
        </motion.div>

        {/* Main Message Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="relative p-8 lg:p-12 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/10" />
            
            {/* Enhanced Audio Player UI */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 backdrop-blur-md">
              <button
                onClick={handleToggleAudio}
                className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 group"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                {isPlaying && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                    <span className="absolute -inset-3 rounded-full border-2 border-primary/30 animate-pulse" />
                  </>
                )}
              </button>
              
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Mic className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    {language === "en" ? "Founder's Voice" : "Founder Ki Awaaz"}
                  </span>
                  <span className="text-xs text-muted-foreground">• 3:24</span>
                  {isPlaying && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary animate-pulse">
                      {language === "en" ? "Speaking..." : "Bol rahe hain..."}
                    </span>
                  )}
                </div>
                <AudioWave isPlaying={isPlaying} />
              </div>
              
              {/* Language Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-muted border border-border">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    language === "en" 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange("ur")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    language === "ur" 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  اردو
                </button>
              </div>
              
              <Volume2 className="w-5 h-5 text-muted-foreground hidden sm:block" />
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/10">
              <Ban className="w-4 h-4 text-red-500" />
              <span className="text-xs text-red-500/80">
                {language === "en" 
                  ? "Protected audio. Recording or downloading is strictly prohibited."
                  : "Mahfooz audio. Recording ya download karna sakht mana hai."}
              </span>
            </div>

            {/* Typing Main Message */}
            <div className="mb-8">
              <p className="text-2xl lg:text-3xl font-medium text-foreground leading-relaxed">
                "{typedMain}
                {!mainComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1 h-8 bg-primary ml-1 align-middle"
                  />
                )}
              </p>
            </div>

            {/* Expand Button */}
            <AnimatePresence>
              {mainComplete && !showFullMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center"
                >
                  <button
                    onClick={() => setShowFullMessage(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                  >
                    <span>{language === "en" ? "Continue Reading" : "Parhna Jari Rakhein"}</span>
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Full Message Sections */}
            <AnimatePresence>
              {showFullMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8 border-t border-border pt-8 mt-8"
                >
                  {messageSections.map((section, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.3, duration: 0.6 }}
                      className="text-lg text-muted-foreground leading-relaxed"
                    >
                      {section.text.split(section.highlight).map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <motion.span 
                              initial={{ opacity: 0, backgroundColor: "transparent" }}
                              animate={{ opacity: 1, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="text-foreground font-semibold px-2 py-0.5 rounded"
                            >
                              {section.highlight}
                            </motion.span>
                          )}
                        </span>
                      ))}
                    </motion.p>
                  ))}

                  {/* Closing Statement */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: messageSections.length * 0.3 + 0.5 }}
                    className="pt-8 border-t border-border"
                  >
                    <p className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                      "{typedClosing}
                      {!closingComplete && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-1 h-8 bg-primary ml-1 align-middle"
                        />
                      )}
                    </p>
                  </motion.div>

                  {/* Protected Signature Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: messageSections.length * 0.3 + 1.5 }}
                    className="pt-12 flex flex-col sm:flex-row items-center gap-6"
                  >
                    {/* Protected Image */}
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                      <ProtectedImage 
                        src="/founder.webp"
                        alt="Muhammad Bilal - Protected"
                      />
                    </div>
                    
                    <div className="text-center sm:text-left">
                      <div className="font-serif text-3xl text-foreground italic">
                        Muhammad Bilal
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {language === "en" 
                          ? "Founder, CodEarn Tech • Your companion in the journey"
                          : "Founder, CodEarn Tech • Aap ke safar ka humsafar"}
                      </div>
                    </div>
                    
                    {/* Handwritten signature effect */}
                    <motion.svg
                      width="180"
                      height="50"
                      viewBox="0 0 180 50"
                      className="hidden lg:block absolute right-8 opacity-20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: messageSections.length * 0.3 + 2 }}
                    >
                      <motion.path
                        d="M10,25 Q40,5 80,25 T170,25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                      />
                    </motion.svg>
                  </motion.div>

                  {/* Reply CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: messageSections.length * 0.3 + 2 }}
                    className="pt-8 text-center"
                  >
                    <p className="text-muted-foreground mb-4">
                      {language === "en" 
                        ? "Feeling inspired? Share your story."
                        : "Jazbati mehsoos kar rahe hain? Apni kahani share karein."}
                    </p>
                   <ReplyButton/>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Floating Hearts Animation */}
        {isInView && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-red-500/20"
                initial={{ y: "100%", x: `${20 + i * 15}%`, opacity: 0 }}
                animate={{ y: "-20%", opacity: [0, 1, 0] }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 2, ease: "easeOut" }}
              >
                <Heart className="w-8 h-8 fill-current" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Quote */}
        <motion.div 
          className="mt-20 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView && closingComplete ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-muted-foreground italic">
            {language === "en" ? (
              <>"The best investment you can make is in yourself. <span className="text-foreground font-medium"> Start today.</span>"</>
            ) : (
              <>"Behtareen sarmaya jo aap kar sakte hain wo khud par hai. <span className="text-foreground font-medium">Aaj se shuru karein.</span>"</>
            )}
          </p>
        </motion.div>

      </motion.div>
    </section>
  )
}