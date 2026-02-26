import { Coffee, Code, Bug, Users, Phone, Zap, Server, Presentation, DollarSign, AlertCircle, Target, Clock, Star, Award } from "lucide-react";
import { GameState, Level, Achievement } from "./types";

export const INITIAL_STATE: GameState = {
  currentLevel: 0,
  companyName: "404 Tech",
  valuation: 0,
  employees: 1,
  codeQuality: 10,
  bugsFixed: 0,
  coffeeConsumed: 0,
  achievements: [],
  highScore: 0
};

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "The Interview",
    subtitle: "Pehla banda hire karo",
    description: "Apni pehli team member hire karo. Fast typing se impress karo!",
    type: "typing",
    targetScore: 100,
    timeLimit: 30,
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    joke: "Candidate: 'Sir, HTML programming aati hai'",
    instructions: "Jo word dikhe, type karo. Fast = zyada points!"
  },
  {
    id: 2,
    title: "Coffee Run",
    subtitle: "Team ko caffeine do",
    description: "Girte hue coffee cups catch karo. Team ki jaan hai yeh!",
    type: "clicker",
    targetScore: 150,
    timeLimit: 25,
    icon: Coffee,
    color: "from-amber-500 to-orange-500",
    joke: "Intern ne gira di: 'Pehla din hai sir!'",
    instructions: "Coffee cups pe click karo. Miss mat karna!"
  },
  {
    id: 3,
    title: "Bug Hunt",
    subtitle: "Code se bugs nikalo",
    description: "Screen pe bugs dikhte hain. Jaldi se click maro!",
    type: "clicker",
    targetScore: 200,
    timeLimit: 30,
    icon: Bug,
    color: "from-red-500 to-rose-500",
    joke: "Bug: 'Mai toh feature tha sir!'",
    instructions: "Bugs pe click karo. Galat cheez pe click = penalty!"
  },
  {
    id: 4,
    title: "Client Call",
    subtitle: "'Chota sa change' se bacho",
    description: "Client ke calls avoid karo. Focus coding pe rakho!",
    type: "avoid",
    targetScore: 250,
    timeLimit: 35,
    icon: Phone,
    color: "from-purple-500 to-violet-500",
    joke: "Client: 'Bas button ka color change karna hai'",
    instructions: "Phone icons avoid karo. Code icons collect karo!"
  },
  {
    id: 5,
    title: "Hackathon Night",
    subtitle: "24 ghante non-stop coding",
    description: "Button mash karo! Jitni speed, utna code!",
    type: "clicker",
    targetScore: 300,
    timeLimit: 20,
    icon: Zap,
    color: "from-yellow-500 to-amber-500",
    joke: "Teammate so raha hai, akele karna hai",
    instructions: "Jitni fast click, utne zyada points!"
  },
  {
    id: 6,
    title: "Server Crash",
    subtitle: "Production down hai!",
    description: "Memory match game. Server components jodo!",
    type: "memory",
    targetScore: 350,
    timeLimit: 40,
    icon: Server,
    color: "from-emerald-500 to-green-500",
    joke: "Error: 'Have you tried turning it off?'",
    instructions: "Same icons match karo. Jaldi karo!"
  },
  {
    id: 7,
    title: "Demo Day",
    subtitle: "Investors ko impress karo",
    description: "Perfect timing se presentation slide karo!",
    type: "timing",
    targetScore: 400,
    timeLimit: 30,
    icon: Presentation,
    color: "from-pink-500 to-rose-500",
    joke: "Projector nahi chal raha...",
    instructions: "Green zone mein click karo. Perfect timing = max points!"
  },
  {
    id: 8,
    title: "Funding Round",
    subtitle: "VCs se paisa lo",
    description: "Investors ke sawalon ka sahi jawab do!",
    type: "typing",
    targetScore: 450,
    timeLimit: 35,
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
    joke: "VC: 'Isme AI daal do, valuation 10x ho jayegi'",
    instructions: "Sawal ka jawab type karo. Fast aur accurate!"
  },
  {
    id: 9,
    title: "Viral Crisis",
    subtitle: "Twitter pe trend ho rahe ho",
    description: "Negative tweets avoid karo, positive collect karo!",
    type: "avoid",
    targetScore: 500,
    timeLimit: 40,
    icon: AlertCircle,
    color: "from-orange-500 to-red-500",
    joke: "#404Fail trend ho raha hai",
    instructions: "Red tweets avoid, green tweets collect!"
  },
  {
    id: 10,
    title: "IPO Day",
    subtitle: "Final boss: Stock market",
    description: "Timing se stock buy/sell karo. $1B valuation target!",
    type: "timing",
    targetScore: 600,
    timeLimit: 45,
    icon: Target,
    color: "from-cyan-500 to-blue-600",
    joke: "Stock price: $404.00 (ironic)",
    instructions: "Price low pe buy, high pe sell. Timing is everything!"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-hire",
    title: "First Hire",
    description: "Pehla banda hire kiya",
    icon: "👔",
    condition: (state) => state.employees > 1
  },
  {
    id: "coffee-addict",
    title: "Coffee Addict",
    description: "10 cups coffee pi li",
    icon: "☕",
    condition: (state) => state.coffeeConsumed >= 10
  },
  {
    id: "bug-hunter",
    title: "Bug Hunter",
    description: "10 bugs fix kiye",
    icon: "🐛",
    condition: (state) => state.bugsFixed >= 10
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Ek level mein 500+ score",
    icon: "⚡",
    condition: (state, score) => score >= 500
  },
  {
    id: "unicorn",
    title: "Unicorn",
    description: "Game complete kiya",
    icon: "🦄",
    condition: (state) => state.currentLevel >= 10
  },
  {
    id: "rich-af",
    title: "Rich AF",
    description: "$100M valuation cross ki",
    icon: "💰",
    condition: (state) => state.valuation >= 100000000
  }
];