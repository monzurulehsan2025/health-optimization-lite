import { Activity, Heart, Calendar, FileText, User, Settings, LogOut, Home, Droplets } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="flex items-center gap-3" style={{ marginBottom: '3rem' }}>
        <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--accent-teal)', color: '#000' }}>
          <Activity size={24} strokeWidth={2.5} />
        </div>
        <h1 className="text-xl font-bold" style={{ letterSpacing: '-0.5px' }}>HealthDash</h1>
      </div>

      <div className="flex flex-col gap-2" style={{ flex: 1 }}>
        <p className="text-xs font-semibold text-muted" style={{ paddingLeft: '1rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Menu</p>
        <NavItem icon={<Home size={20} />} label="Overview" active />
        <NavItem icon={<Heart size={20} />} label="Health Score" />
        <NavItem icon={<Droplets size={20} />} label="Biomarkers" />
        <NavItem icon={<Calendar size={20} />} label="Appointments" />
        <NavItem icon={<FileText size={20} />} label="Records" />
      </div>

      <div className="flex flex-col gap-2" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: 'auto' }}>
        <NavItem icon={<User size={20} />} label="Profile" />
        <NavItem icon={<Settings size={20} />} label="Settings" />
        <NavItem icon={<LogOut size={20} />} label="Log out" />
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => {
  return (
    <button 
      className="flex items-center gap-3 w-full"
      style={{
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-md)',
        background: active ? 'var(--bg-panel-hover)' : 'transparent',
        color: active ? 'var(--text-main)' : 'var(--text-muted)',
        transition: 'all 0.2s',
        textAlign: 'left'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.color = 'var(--text-main)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.color = 'var(--text-muted)';
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      <span style={{ color: active ? 'var(--accent-teal)' : 'inherit' }}>{icon}</span>
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

export default Sidebar;
