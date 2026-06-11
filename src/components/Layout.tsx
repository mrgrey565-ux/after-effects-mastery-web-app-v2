import React, { useState } from 'react';
import {
  LayoutDashboard, CalendarDays, Map, Wrench, BookOpen,
  FolderKanban, Lightbulb, Bot, Settings, HardDrive,
  ChevronLeft, ChevronRight, Menu
} from 'lucide-react';
import { useAppStore } from '../store/appStore';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'plan', label: '90-Day Plan', icon: CalendarDays },
  { id: 'roadmap', label: 'Roadmap', icon: Map },
  { id: 'tools', label: 'Tools Matrix', icon: Wrench },
  { id: 'references', label: 'Reference Vault', icon: BookOpen },
  { id: 'projects', label: 'Project Gallery', icon: FolderKanban },
  { id: 'ideas', label: 'Idea Lab', icon: Lightbulb },
  { id: 'ai-coach', label: 'AI Coach', icon: Bot },
  { id: 'ai-settings', label: 'AI Settings', icon: Settings },
  { id: 'backup', label: 'Backup', icon: HardDrive },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentSection, setCurrentSection } = useAppStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 lg:z-auto
          flex flex-col bg-gray-900 border-r border-gray-800
          transition-all duration-300 h-full
          ${sidebarCollapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                AE
              </div>
              <span className="font-bold text-white text-sm leading-tight">
                AE Mastery<br />
                <span className="text-gray-400 font-normal text-xs">90-Day Plan</span>
              </span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm mx-auto">
              AE
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex text-gray-400 hover:text-white transition-colors p-1 rounded"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentSection(item.id);
                  setMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200
                  ${active
                    ? 'bg-purple-600/20 text-purple-400 border-r-2 border-purple-500'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
                  }
                  ${sidebarCollapsed ? 'justify-center' : ''}
                `}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-t border-gray-800">
            <p className="text-xs text-gray-600">AE Mastery v1.0</p>
            <p className="text-xs text-gray-600">Consume → Recreate → Vary → Reflect</p>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900">
          <button onClick={() => setMobileOpen(true)} className="text-gray-400">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
              AE
            </div>
            <span className="font-semibold text-sm">AE Mastery</span>
          </div>
          <div className="w-6" />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-30">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map(item => {
            const Icon = item.icon;
            const active = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                  active ? 'text-purple-400' : 'text-gray-500'
                }`}
              >
                <Icon size={18} />
                <span className="text-xs">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
