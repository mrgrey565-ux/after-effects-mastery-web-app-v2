export type DayTaskType = 'consume' | 'recreate' | 'variation' | 'reflect' | 'export';

export interface DayTask {
  id: string;
  label: string;
  type: DayTaskType;
  completed: boolean;
}

export interface CurriculumDay {
  day: number;
  month: 1 | 2 | 3;
  week: number;
  focus: string;
  goal: string;
  consume: string[];
  platforms: string[];
  searchKeywords: string[];
  recreate: string;
  variation: string;
  output: string;
  reflectionPrompts: string[];
  tools: string[];
  estimatedMinutes: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  isWeeklyProject?: boolean;
  isReviewDay?: boolean;
  isFinalProject?: boolean;
}

export type ToolStatus = 'not-started' | 'watched' | 'recreated' | 'used-independently' | 'can-explain';

export interface ToolMastery {
  tool: string;
  category: string;
  status: ToolStatus;
  confidence: number; // 0-5
  notes: string;
}

export type ReferenceStatus = 'saved' | 'analyzed' | 'recreated' | 'variant-created';

export interface ReferenceItem {
  id: string;
  title: string;
  url: string;
  platform: string;
  tags: string[];
  styleCategory: string;
  whyItWorks: string;
  hook: string;
  motion: string;
  typography: string;
  color: string;
  effects: string;
  sound: string;
  transition: string;
  toolsLikelyUsed: string;
  difficulty: number; // 1-5
  status: ReferenceStatus;
  relatedDay?: number;
  timecodes: string;
  createdAt: string;
}

export type ProjectType = 'micro-recreation' | 'mini-project' | 'portfolio-project' | 'showreel';

export interface ProjectItem {
  id: string;
  name: string;
  date: string;
  relatedDays: number[];
  type: ProjectType;
  toolsUsed: string[];
  consumedSources: string;
  recreatedWhat: string;
  variationMade: string;
  exportLinkOrPath: string;
  selfRating: number; // 1-5
  timingRating: number;
  smoothnessRating: number;
  designRating: number;
  clarityRating: number;
  creativityRating: number;
  technicalRating: number;
  soundRating: number;
  exportQualityRating: number;
  critique: string;
  aiCritique: string;
  nextImprovement: string;
  month: 1 | 2 | 3;
  week: number;
}

export interface CreativeIdea {
  id: string;
  title: string;
  description: string;
  style: string;
  mood: string;
  tools: string[];
  format: string;
  soundType: string;
  timeLimit: string;
  difficulty: number;
  sourceRefs: string[];
  createdAt: string;
  status: 'idea' | 'in-progress' | 'completed';
}

export interface DayProgress {
  day: number;
  tasksCompleted: string[];
  notes: string;
  difficultyRating: number;
  confidenceRating: number;
  consumeMinutes: number;
  practiceMinutes: number;
  completedAt?: string;
}

export interface AISettings {
  providerName: string;
  apiStyle: 'openai-chat' | 'openai-responses' | 'custom-curl';
  apiKey: string;
  apiKeyStorage: 'session' | 'local' | 'none';
  authType: 'bearer' | 'x-api-key' | 'custom';
  customAuthHeaderName: string;
  customAuthHeaderValue: string;
  baseUrl: string;
  chatUrl: string;
  modelListUrl: string;
  selectedModel: string;
  modelFetchMethod: 'GET' | 'POST';
  modelResponsePath: string;
  temperature: number;
  maxContextTokens: number;
  maxOutputTokens: number;
  systemPrompt: string;
  testPrompt: string;
  rawCurl: string;
  availableModels: string[];
}

export interface AppState {
  currentDay: number;
  dayProgress: Record<number, DayProgress>;
  toolMastery: Record<string, ToolMastery>;
  references: ReferenceItem[];
  projects: ProjectItem[];
  creativeIdeas: CreativeIdea[];
  aiSettings: AISettings;
  streak: number;
  lastActiveDate: string;
}

export type NavSection =
  | 'dashboard'
  | 'plan'
  | 'roadmap'
  | 'tools'
  | 'references'
  | 'projects'
  | 'ideas'
  | 'ai-coach'
  | 'ai-settings'
  | 'backup';
