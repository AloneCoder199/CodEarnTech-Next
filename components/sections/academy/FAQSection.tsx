"use client"
import React, { useState } from 'react';
import { Plus,  Minus, MessageSquare, ArrowRight, HelpCircle, Languages } from 'lucide-react';

type LangType = 'roman' | 'en';

const faqs = [
  {
    roman: {
      question: "Kya join karne ke liye pehle se programming ya technical experience hona zaroori hai?",
      answer: "Bilkul nahi jani! Yeh bootcamp absolute scratch (zero) se start hota hai. Hum internet basics aur basic HTML se shuru karte hain. Agar aapko computer chalana aata hai aur seekhne ka shauk hai, to aap ready ho."
    },
    en: {
      question: "Do I need any prior programming or technical experience to join?",
      answer: "Not at all! This bootcamp starts from absolute scratch. We cover basic internet and core coding principles. If you know how to operate a computer and have a passion to learn, you are perfectly ready."
    }
  },
  {
    roman: {
      question: "Kya mujhe course poora karne par verified completion certificate milega?",
      answer: "Haan, lekin certificate muft mein nahi milega. Iski real market value barhane ke liye humne strict rules rakhe hain: Aapki 80% attendance lazmi honi chahiye aur aapke 10 projects complete hone chahiye tabhi system verified certificate issue karega."
    },
    en: {
      question: "Will I get a verified completion certificate?",
      answer: "Yes, but certificates are earned, not just given away. To protect its market value, we enforce strict rules: 80% live attendance and 10 fully completed projects are mandatory to unlock your system-verified certificate."
    }
  },
  {
    roman: {
      question: "Agar electricity load-shedding ya exams ki wajah se live class miss ho jaye to kya hoga?",
      answer: "No problem! Har live session ki high-quality premium recorded video class ke foran baad aapke dashboard par upload kar di jayegi. Aap kisi bhi waqt apna backlog cover kar ke assignments submit kar sakte hain."
    },
    en: {
      question: "What if I miss a live class due to electricity load-shedding or exams?",
      answer: "No problem! Every live session is recorded in high definition and uploaded to your private student dashboard right after the class. You can clear your backlog and submit assignments at your own pace."
    }
  },
  {
    roman: {
      question: "1-Month Scholarship aur Internship program kis tarah kaam karta hai?",
      answer: "Bootcamp ke top 10 performance dikhane wale students ko hamari software house (CodEarn) ki taraf se 1-Month advanced masterclass scholarship aur direct commercial remote internship projects par kaam karne ka mauqa milega."
    },
    en: {
      question: "How does the 1-Month Scholarship & Internship program work?",
      answer: "The top 10 performing students of this batch will receive a 1-Month advanced mentorship track scholarship and a direct opportunity to join our software house (CodEarn) as remote junior developers working on active SaaS products."
    }
  },
  {
    roman: {
      question: "Kya 30 din poore karne ke baad freelancing earning ki koi guarantee hai?",
      answer: "Earning ki guarantee koi professional nahi de sakta, lekin hum aapko client hunting ki full training zaroor denge. Agar aap hamare bataye hue tareeqe par 10 projects ka portfolio aur Fiverr/Upwork profile ready kar lete hain, to pehla order milna kaafi aasaan ho jata hai."
    },
    en: {
      question: "Is freelancing earning guaranteed after completing the 30 days?",
      answer: "No true professional can guarantee income, but we do guarantee industry-standard client acquisition training. If you build your 10-project portfolio and optimize your freelancing gigs exactly as taught, securing orders becomes highly achievable."
    }
  },
  {
    roman: {
      question: "Classes ki timings kya hain aur haftay mein kitne din live sessions honge?",
      answer: "Live classes raat ke waqt schedule ki jayegi taake college students aur working professionals bina apna schedule kharab kiye attend kar sakein. Regular classes haftay mein 5 din (Monday to Friday) chalengi aur weekends assignments ke liye honge."
    },
    en: {
      question: "What are the class timings and how many days a week will we meet?",
      answer: "Live classes are scheduled late in the evening to accommodate university students and working hours. Sessions run 5 days a week (Monday to Friday), leaving weekends open for practical project assignments."
    }
  },
  {
    roman: {
      question: "Is bootcamp ke liye laptop ya computer ki minimum specs kya honi chahiye?",
      answer: "Humein koi heavy machine ya high-end gaming system nahi chahiye jani. Agar aapke paas aik normal Core i3 / Core i5 laptop hai jismein minimum 4GB ya 8GB RAM mojud hai aur browser/VS Code smoothly chal jata hai, to aap easily har project deploy kar sakte hain."
    },
    en: {
      question: "What are the minimum laptop or PC specifications required for this course?",
      answer: "You do not need a high-end gaming setup. A standard Core i3 or Core i5 laptop with at least 4GB/8GB of RAM capable of running Visual Studio Code and a modern web browser is completely perfect."
    }
  },
  {
    roman: {
      question: "Kya mujhe computer science ki degree (BS-CS/IT) chahiye join karne ke liye?",
      answer: "Bilkul nahi! Tech industry ab degree par nahi balki aapke Github portfolio aur pipeline products par chalti hai. Hamari software house (CodEarn) mein bhi selection sirf is bina par hoti hai ke aap real product kitna clean code kar sakte hain."
    },
    en: {
      question: "Do I need a university degree in Computer Science to join this program?",
      answer: "Absolutely not. The modern tech market runs entirely on real skills and GitHub portfolios, not paper degrees. Even within our development house (CodEarn), selection is purely performance-based."
    }
  },
  {
    roman: {
      question: "Fees transfer karne ka kya tareeqa hai aur kya isme installments ho sakti hain?",
      answer: "Aap Easypaisa, JazzCash, ya direct Bank Transfer ke through safely pay kar sakte hain. Kyunki fee pehle hi system maintenance costs ke mutabiq bohot low (sirf 2000 PKR) rakhi gayi hai, isliye ismein mazeed split installments possible nahi hain."
    },
    en: {
      question: "What are the available payment methods and can I pay in installments?",
      answer: "Payments can be made securely through Easypaisa, JazzCash, or online Bank Transfers. Because the enrollment fee is already highly subsidized (just 2000 PKR), split installment options are not available."
    }
  },
  {
    roman: {
      question: "Agar main fee pay karne ke baad kisi wajah se class attend na kar sakoon, to kya refund milega?",
      answer: "Agar aap batch officially start hone se pehle hamari management se rabta karte hain to 100% fee baghair kisi sawal ke refund ho jayegi. Lekin batch start hone ke baad seats full ho jati hain, to phir registration fee non-refundable hogi."
    },
    en: {
      question: "Is there a refund policy if I cannot continue after making the payment?",
      answer: "If you request a cancellation before the batch officially begins, you will receive a 100% full refund with no questions asked. However, once classes kick off, slots are permanently locked and become non-refundable."
    }
  },
  {
    roman: {
      question: "Daily mujhe kitna time dena parega real world projects par grip karne ke liye?",
      answer: "Daily 1 ghante ka live session hota hai, aur uske baad kam se kam 1 se 2 ghante ki self-practice aur coding assignments lazmi hain. Agar aap daily focus ke sath 3 ghante nikal sakte hain, to aapki development skills peak par hongi."
    },
    en: {
      question: "How many hours of daily commitment are expected to get results?",
      answer: "Apart from the 1-hour live session, you should commit a minimum of 1 to 2 hours daily for hands-on debugging and building assignments. Dedicating 3 hours total per day will ensure exceptional skill mastery."
    }
  },
  {
    roman: {
      question: "Agar coding ke doran koi error ya bug aa jaye, to kya mujhe koi personal help milega?",
      answer: "Haan jani, aapko special dedicated student support group (Discord/WhatsApp) ka access milega jahan hamari senior core engineering team daily active hoti hai. Agar aap kahen atak jate hain, to screen-share ya text par aapka code live debug karwaya jata hai."
    },
    en: {
      question: "What happens if I get stuck with a coding error or logic bug during practice?",
      answer: "You will gain exclusive access to our developer community support platform (Discord/WhatsApp). Our core engineering team reviews errors daily, providing code resolution via chat and live screen-sharing pipelines."
    }
  },
  {
    roman: {
      question: "Bootcamp khatam hone ke baad kya mere paas course content ka access rahega?",
      answer: "Bilkul! Tamam live sessions ki premium recordings, code boilerplates, architectural roadmaps, aur complete custom resources ka access aapke portal par lifetime ke liye active rahega taake aap jab chahein revise kar sakein."
    },
    en: {
      question: "Will I retain access to the training material after the bootcamp ends?",
      answer: "Yes, absolutely. You will receive lifetime access to all high-definition class recordings, code boilerplates, structural assets, and production resource setups direct on your developer portal."
    }
  },
  {
    roman: {
      question: "Is 30 Days ke roadmap mein hum kaun si exact core technologies seekhein ge?",
      answer: "Hum industry-standard full-stack web and product architectures par focus karenge using TypeScript, dynamic component building inside Next.js, utility optimization with Tailwind CSS, aur real-time data streaming operations through Supabase backend."
    },
    en: {
      question: "Which exact technological systems and tools will be covered in these 30 days?",
      answer: "We focus on building commercial-grade software ecosystems using TypeScript, modular user interfaces with Next.js, lightning-fast styling with Tailwind CSS, and secure database infrastructures via Supabase."
    }
  }
];


export default function FAQSection() {
  const [lang, setLang] = useState<LangType>('roman'); // Default local connection
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden border-t border-border/20">
      {/* Background Soft Blue Glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* ================= ULTRA VISIBLE TOP LANGUAGE TOGGLE BAR ================= */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-[2rem] bg-muted/40 border border-border/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">
                {lang === 'roman' ? 'Zabaan Select Karein' : 'Preferred Language'}
              </h4>
              <p className="text-xs text-muted-foreground">
                {lang === 'roman' ? 'Click kar ke English ya Roman Urdu select karein' : 'Toggle between English and Roman Urdu instantly'}
              </p>
            </div>
          </div>

          {/* Apple-Style Segmented Control Button Box */}
          <div className="relative p-1 bg-background border border-border/80 rounded-xl flex items-center w-full sm:w-[280px] h-10 overflow-hidden shadow-inner">
            {/* Sliding Background Pill */}
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-lg shadow-sm transition-transform duration-300 ease-out ${
                lang === 'en' ? 'translate-x-[100%]' : 'translate-x-0'
              }`} 
            />
            
            <button
              onClick={() => setLang('roman')}
              className={`flex-1 text-center text-xs font-bold rounded-lg relative z-10 cursor-pointer h-full transition-colors duration-300 ${
                lang === 'roman' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Roman Urdu
            </button>
            <button
              onClick={() => setLang('en')}
              className={`flex-1 text-center text-xs font-bold rounded-lg relative z-10 cursor-pointer h-full transition-colors duration-300 ${
                lang === 'en' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* ================= MAIN SPLIT-GRID LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: STICKY BRAND BLOCK */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-3">
                <HelpCircle className="w-3 h-3" />
                {lang === 'roman' ? 'Sawal Jawab' : 'Support Desk'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                {lang === 'roman' ? (
                  <>Common <br className="hidden lg:block" /> Sawalat Ke <br className="hidden lg:block" /> <span className="text-primary">Jawabati Track</span></>
                ) : (
                  <>Common <br className="hidden lg:block" /> Questions & <br className="hidden lg:block" /> <span className="text-primary">Answers</span></>
                )}
              </h2>
            </div>

            {/* Support Card */}
            <div className="p-6 rounded-[1.8rem] border border-border/60 bg-card shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-foreground">
                {lang === 'roman' ? 'Koi aur sawal hai?' : 'Still have doubts?'}
              </h4>
              <a 
                href="https://wa.me/+923219515138" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-bold transition-all group"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  {lang === 'roman' ? 'Mentors Se Baat Karein' : 'Chat with Mentors'}
                </span>
                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE ACCORDIONS */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const currentContent = faq[lang]; // Dynamically targets based on active selection

              return (
                <div 
                  key={idx}
                  className={`
                    rounded-[1.8rem] border bg-card transition-all duration-300 overflow-hidden
                    ${isOpen 
                      ? 'border-primary/30 shadow-xl shadow-primary/[0.02] bg-gradient-to-br from-card to-primary/[0.01]' 
                      : 'border-border/60 hover:border-border-foreground/20'
                    }
                  `}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none"
                  >
                    <span className={`text-sm md:text-base font-bold tracking-tight text-foreground transition-colors ${isOpen ? 'text-primary' : ''}`}>
                      {currentContent.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary text-primary-foreground rotate-180' : 'bg-muted text-muted-foreground'}`}>
                      {isOpen ? <span className="text-lg font-bold">-</span> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-xs md:text-sm text-muted-foreground leading-relaxed border-t border-border/20 pt-4 bg-muted/10">
                        {currentContent.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}