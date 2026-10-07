import React from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Scan,
  LayoutDashboard,
  Radio,
  History,
  MessageSquareQuote,
  GraduationCap,
  Lock,
  Cpu,
  AlertTriangle,
  Menu,
  X,
  Wifi,
  WifiOff,
  Search,
  Network,
  Users,
  FlaskConical,
  PlaySquare,
  Activity,
  FileText,
} from 'lucide-react';

export type NavTab =
  | 'overview'
  | 'scanner'
  | 'dashboard'
  | 'live-stream'
  | 'campaigns'
  | 'student-family'
  | 'adversarial'
  | 'incidents'
  | 'soc-view'
  | 'history'
  | 'copilot'
  | 'learn'
  | 'privacy'
  | 'architecture';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  offlineMode: boolean;
  setOfflineMode: (enabled: boolean) => void;
  onOpenEmergency: () => void;
  onOpenSearch: () => void;
  onOpenPresentation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  offlineMode,
  setOfflineMode,
  onOpenEmergency,
  onOpenSearch,
  onOpenPresentation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const primaryNavItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Shield className="w-4 h-4" /> },
    { id: 'scanner', label: 'Threat Scanner', icon: <Scan className="w-4 h-4" /> },
    { id: 'dashboard', label: 'SOC Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Network className="w-4 h-4" /> },
    { id: 'student-family', label: 'Family Shield', icon: <Users className="w-4 h-4" /> },
    { id: 'adversarial', label: 'Adversarial Lab', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'incidents', label: 'Incidents', icon: <FileText className="w-4 h-4" /> },
    { id: 'soc-view', label: 'SOC Health', icon: <Activity className="w-4 h-4" /> },
    { id: 'copilot', label: 'Copilot', icon: <MessageSquareQuote className="w-4 h-4" /> },
    { id: 'learn', label: 'Academy', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070a13]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-lg shadow-cyan-950/40">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  SentinelAI
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-bold">
                  V2 FUSION
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Think Before You Trust · On-Device Defense
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden 2xl:flex items-center gap-1">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Compact Desktop Navigation for standard laptops */}
          <nav className="hidden xl:flex 2xl:hidden items-center gap-1">
            {[
              { id: 'overview' as NavTab, label: 'Overview' },
              { id: 'scanner' as NavTab, label: 'Scanner' },
              { id: 'dashboard' as NavTab, label: 'SOC' },
              { id: 'campaigns' as NavTab, label: 'Campaigns' },
              { id: 'student-family' as NavTab, label: 'Family' },
              { id: 'adversarial' as NavTab, label: 'Lab' },
              { id: 'incidents' as NavTab, label: 'Incidents' },
              { id: 'copilot' as NavTab, label: 'Copilot' },
              { id: 'privacy' as NavTab, label: 'Privacy' },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 transition-colors"
              title="Search threats, lessons, tools (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline px-1 py-0.2 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Judge Pitch / Presentation Mode Button */}
            <button
              onClick={onOpenPresentation}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-cyan-950/60 border border-cyan-700/60 text-cyan-300 hover:bg-cyan-900/40 transition-colors"
              title="3-Minute Executive Pitch Walkthrough"
            >
              <PlaySquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pitch Deck</span>
            </button>

            {/* Offline Mode Toggle Button */}
            <button
              onClick={() => setOfflineMode(!offlineMode)}
              title={offlineMode ? 'Offline Mode Active (100% Local Heuristics)' : 'Local First Hybrid Engine'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                offlineMode
                  ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-300 shadow-sm shadow-emerald-900/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {offlineMode ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">Offline</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden md:inline">Local First</span>
                </>
              )}
            </button>

            {/* Emergency Button */}
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white border border-rose-500/60 shadow-md shadow-rose-950/40 transition-all active:scale-95"
            >
              <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-white" />
              <span className="hidden sm:inline">I MAY BE SCAMMED</span>
              <span className="sm:hidden">Emergency</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-[#070a13]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-1">
          <div className="pb-2 border-b border-slate-800/80 mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Threat Fusion Engine V2</span>
            <span className="text-emerald-400 font-mono flex items-center gap-1 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span> ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 mt-2 flex gap-2">
            <button
              onClick={() => {
                onOpenPresentation();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-semibold rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 text-center"
            >
              Pitch Deck
            </button>
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-center"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
