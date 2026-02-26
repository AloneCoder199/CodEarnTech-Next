export interface GameState {
  currentLevel: number;
  companyName: string;
  valuation: number;
  employees: number;
  codeQuality: number;
  bugsFixed: number;
  coffeeConsumed: number;
  achievements: string[];
  highScore: number;
  lastPlayed?: string;
}

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  type: "typing" | "clicker" | "timing" | "memory" | "avoid";
  targetScore: number;
  timeLimit: number;
  icon: any;
  color: string;
  joke: string;
  instructions: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: GameState, score: number) => boolean;
}

export interface ShareData {
  level: number;
  valuation: number;
  employees: number;
  companyName: string;
  message: string;
}