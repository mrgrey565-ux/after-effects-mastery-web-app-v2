import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AppState, ToolMastery, ReferenceItem,
  ProjectItem, CreativeIdea, AISettings, ToolStatus
} from '../types';
import { allTools } from '../data/tools';

const defaultAISettings: AISettings = {
  providerName: '',
  apiStyle: 'openai-chat',
  apiKey: '',
  apiKeyStorage: 'session',
  authType: 'bearer',
  customAuthHeaderName: '',
  customAuthHeaderValue: '',
  baseUrl: '',
  chatUrl: '',
  modelListUrl: '',
  selectedModel: '',
  modelFetchMethod: 'GET',
  modelResponsePath: 'data[].id',
  temperature: 0.7,
  maxContextTokens: 128000,
  maxOutputTokens: 4096,
  systemPrompt: 'You are an expert After Effects coach helping a beginner-to-intermediate learner master Adobe After Effects in 90 days.',
  testPrompt: 'Reply with exactly: AI connection working.',
  rawCurl: '',
  availableModels: [],
};

const initToolMastery = (): Record<string, ToolMastery> => {
  const record: Record<string, ToolMastery> = {};
  allTools.forEach(t => {
    record[t.tool] = {
      tool: t.tool,
      category: t.category,
      status: 'not-started',
      confidence: 0,
      notes: '',
    };
  });
  return record;
};

interface AppStore extends AppState {
  // Navigation
  currentSection: string;
  setCurrentSection: (section: string) => void;

  // Day actions
  setCurrentDay: (day: number) => void;
  toggleDayTask: (day: number, taskId: string) => void;
  updateDayNotes: (day: number, notes: string) => void;
  updateDayRating: (day: number, field: 'difficultyRating' | 'confidenceRating', value: number) => void;
  updateDayMinutes: (day: number, field: 'consumeMinutes' | 'practiceMinutes', value: number) => void;
  markDayComplete: (day: number) => void;
  
  // Tool mastery
  updateToolStatus: (tool: string, status: ToolStatus) => void;
  updateToolConfidence: (tool: string, confidence: number) => void;
  updateToolNotes: (tool: string, notes: string) => void;

  // References
  addReference: (ref: ReferenceItem) => void;
  updateReference: (id: string, ref: Partial<ReferenceItem>) => void;
  deleteReference: (id: string) => void;

  // Projects
  addProject: (project: ProjectItem) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  // Creative ideas
  addIdea: (idea: CreativeIdea) => void;
  updateIdea: (id: string, idea: Partial<CreativeIdea>) => void;
  deleteIdea: (id: string) => void;

  // AI settings
  updateAISettings: (settings: Partial<AISettings>) => void;
  setAvailableModels: (models: string[]) => void;

  // Streak
  updateStreak: () => void;

  // Backup
  exportData: () => string;
  importData: (json: string) => boolean;
  resetAll: () => void;
  resetProgress: () => void;
  resetReferences: () => void;
  resetProjects: () => void;
  resetAISettings: () => void;
}

// Session-only API key storage
let sessionApiKey = '';

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      currentDay: 1,
      currentSection: 'dashboard',
      dayProgress: {},
      toolMastery: initToolMastery(),
      references: [],
      projects: [],
      creativeIdeas: [],
      aiSettings: defaultAISettings,
      streak: 0,
      lastActiveDate: '',

      setCurrentSection: (section) => set({ currentSection: section }),

      setCurrentDay: (day) => set({ currentDay: day }),

      toggleDayTask: (day, taskId) => {
        const { dayProgress } = get();
        const current = dayProgress[day] || {
          day,
          tasksCompleted: [],
          notes: '',
          difficultyRating: 0,
          confidenceRating: 0,
          consumeMinutes: 0,
          practiceMinutes: 0,
        };
        const completed = current.tasksCompleted.includes(taskId)
          ? current.tasksCompleted.filter(id => id !== taskId)
          : [...current.tasksCompleted, taskId];
        set({
          dayProgress: {
            ...dayProgress,
            [day]: { ...current, tasksCompleted: completed },
          },
        });
      },

      updateDayNotes: (day, notes) => {
        const { dayProgress } = get();
        const current = dayProgress[day] || {
          day, tasksCompleted: [], notes: '',
          difficultyRating: 0, confidenceRating: 0,
          consumeMinutes: 0, practiceMinutes: 0,
        };
        set({ dayProgress: { ...dayProgress, [day]: { ...current, notes } } });
      },

      updateDayRating: (day, field, value) => {
        const { dayProgress } = get();
        const current = dayProgress[day] || {
          day, tasksCompleted: [], notes: '',
          difficultyRating: 0, confidenceRating: 0,
          consumeMinutes: 0, practiceMinutes: 0,
        };
        set({ dayProgress: { ...dayProgress, [day]: { ...current, [field]: value } } });
      },

      updateDayMinutes: (day, field, value) => {
        const { dayProgress } = get();
        const current = dayProgress[day] || {
          day, tasksCompleted: [], notes: '',
          difficultyRating: 0, confidenceRating: 0,
          consumeMinutes: 0, practiceMinutes: 0,
        };
        set({ dayProgress: { ...dayProgress, [day]: { ...current, [field]: value } } });
      },

      markDayComplete: (day) => {
        const { dayProgress } = get();
        const current = dayProgress[day] || {
          day, tasksCompleted: [], notes: '',
          difficultyRating: 0, confidenceRating: 0,
          consumeMinutes: 0, practiceMinutes: 0,
        };
        set({
          dayProgress: {
            ...dayProgress,
            [day]: { ...current, completedAt: new Date().toISOString() },
          },
        });
      },

      updateToolStatus: (tool, status) => {
        const { toolMastery } = get();
        set({
          toolMastery: {
            ...toolMastery,
            [tool]: { ...toolMastery[tool], status },
          },
        });
      },

      updateToolConfidence: (tool, confidence) => {
        const { toolMastery } = get();
        set({
          toolMastery: {
            ...toolMastery,
            [tool]: { ...toolMastery[tool], confidence },
          },
        });
      },

      updateToolNotes: (tool, notes) => {
        const { toolMastery } = get();
        set({
          toolMastery: {
            ...toolMastery,
            [tool]: { ...toolMastery[tool], notes },
          },
        });
      },

      addReference: (ref) => {
        set(state => ({ references: [...state.references, ref] }));
      },

      updateReference: (id, ref) => {
        set(state => ({
          references: state.references.map(r => r.id === id ? { ...r, ...ref } : r),
        }));
      },

      deleteReference: (id) => {
        set(state => ({ references: state.references.filter(r => r.id !== id) }));
      },

      addProject: (project) => {
        set(state => ({ projects: [...state.projects, project] }));
      },

      updateProject: (id, project) => {
        set(state => ({
          projects: state.projects.map(p => p.id === id ? { ...p, ...project } : p),
        }));
      },

      deleteProject: (id) => {
        set(state => ({ projects: state.projects.filter(p => p.id !== id) }));
      },

      addIdea: (idea) => {
        set(state => ({ creativeIdeas: [...state.creativeIdeas, idea] }));
      },

      updateIdea: (id, idea) => {
        set(state => ({
          creativeIdeas: state.creativeIdeas.map(i => i.id === id ? { ...i, ...idea } : i),
        }));
      },

      deleteIdea: (id) => {
        set(state => ({ creativeIdeas: state.creativeIdeas.filter(i => i.id !== id) }));
      },

      updateAISettings: (settings) => {
        // Handle session-only API key
        if (settings.apiKey !== undefined) {
          const storage = settings.apiKeyStorage || get().aiSettings.apiKeyStorage;
          if (storage === 'session') {
            sessionApiKey = settings.apiKey;
            settings = { ...settings, apiKey: '***SESSION***' };
          }
        }
        set(state => ({ aiSettings: { ...state.aiSettings, ...settings } }));
      },

      setAvailableModels: (models) => {
        set(state => ({ aiSettings: { ...state.aiSettings, availableModels: models } }));
      },

      updateStreak: () => {
        const today = new Date().toDateString();
        const { lastActiveDate, streak } = get();
        if (lastActiveDate === today) return;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const newStreak = lastActiveDate === yesterday.toDateString() ? streak + 1 : 1;
        set({ streak: newStreak, lastActiveDate: today });
      },

      exportData: () => {
        const state = get();
        return JSON.stringify({
          currentDay: state.currentDay,
          dayProgress: state.dayProgress,
          toolMastery: state.toolMastery,
          references: state.references,
          projects: state.projects,
          creativeIdeas: state.creativeIdeas,
          streak: state.streak,
          lastActiveDate: state.lastActiveDate,
          exportedAt: new Date().toISOString(),
        }, null, 2);
      },

      importData: (json) => {
        try {
          const data = JSON.parse(json);
          set({
            currentDay: data.currentDay || 1,
            dayProgress: data.dayProgress || {},
            toolMastery: data.toolMastery || initToolMastery(),
            references: data.references || [],
            projects: data.projects || [],
            creativeIdeas: data.creativeIdeas || [],
            streak: data.streak || 0,
            lastActiveDate: data.lastActiveDate || '',
          });
          return true;
        } catch {
          return false;
        }
      },

      resetAll: () => {
        set({
          currentDay: 1,
          dayProgress: {},
          toolMastery: initToolMastery(),
          references: [],
          projects: [],
          creativeIdeas: [],
          aiSettings: defaultAISettings,
          streak: 0,
          lastActiveDate: '',
        });
      },

      resetProgress: () => set({ currentDay: 1, dayProgress: {}, streak: 0, lastActiveDate: '' }),
      resetReferences: () => set({ references: [] }),
      resetProjects: () => set({ projects: [] }),
      resetAISettings: () => set({ aiSettings: defaultAISettings }),
    }),
    {
      name: 'ae-mastery-store',
      partialize: (state) => ({
        currentDay: state.currentDay,
        dayProgress: state.dayProgress,
        toolMastery: state.toolMastery,
        references: state.references,
        projects: state.projects,
        creativeIdeas: state.creativeIdeas,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        aiSettings: {
          ...state.aiSettings,
          // Never persist session-only API keys
          apiKey: state.aiSettings.apiKeyStorage === 'local' ? state.aiSettings.apiKey : '',
        },
      }),
    }
  )
);

// Helper to get the actual API key (considering session storage)
export const getApiKey = (settings: AISettings): string => {
  if (settings.apiKeyStorage === 'session') {
    return sessionApiKey;
  }
  return settings.apiKey;
};
