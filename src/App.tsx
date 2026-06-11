import { useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanPage from './components/PlanPage';
import RoadmapPage from './components/RoadmapPage';
import ToolsPage from './components/ToolsPage';
import ReferencePage from './components/ReferencePage';
import ProjectGallery from './components/ProjectGallery';
import IdeaLab from './components/IdeaLab';
import AICoach from './components/AICoach';
import AISettingsPage from './components/AISettings';
import BackupPage from './components/BackupPage';
import { useAppStore } from './store/appStore';

export default function App() {
  const { currentSection, updateStreak } = useAppStore();

  useEffect(() => {
    updateStreak();
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard': return <Dashboard />;
      case 'plan': return <PlanPage />;
      case 'roadmap': return <RoadmapPage />;
      case 'tools': return <ToolsPage />;
      case 'references': return <ReferencePage />;
      case 'projects': return <ProjectGallery />;
      case 'ideas': return <IdeaLab />;
      case 'ai-coach': return <AICoach />;
      case 'ai-settings': return <AISettingsPage />;
      case 'backup': return <BackupPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderSection()}
    </Layout>
  );
}
