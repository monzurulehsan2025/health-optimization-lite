import { useState, useEffect } from 'react';
import { Activity, Flame, Heart, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [healthScore, setHealthScore] = useState<{currentScore: number, history: any[]}>({ currentScore: 0, history: [] });
  const [biomarkers, setBiomarkers] = useState<any[]>([]);
  const [actionItem, setActionItem] = useState<{title: string, description: string}>({ title: '', description: '' });
  const [clinicalTeam, setClinicalTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoreRes, markersRes, actionRes, teamRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/health-score'),
          fetch('http://127.0.0.1:8000/api/biomarkers'),
          fetch('http://127.0.0.1:8000/api/action-items'),
          fetch('http://127.0.0.1:8000/api/clinical-team')
        ]);
        
        setHealthScore(await scoreRes.json());
        setBiomarkers(await markersRes.json());
        setActionItem(await actionRes.json());
        setClinicalTeam(await teamRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="main-content flex justify-center items-center"><p>Loading your health dashboard...</p></div>;
  }

  return (
    <div className="main-content animate-fade-in">
      <header className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 className="text-3xl font-bold" style={{ marginBottom: '0.25rem' }}>Good morning, Alex</h2>
          <p className="text-muted">Here's your health summary for today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="glass-panel flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: '50%' }}>
            <Activity size={20} className="text-teal" />
          </button>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-blue))', padding: 2 }}>
            <img src="https://ui-avatars.com/api/?name=Alex+Doe&background=121826&color=fff" alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          </div>
        </div>
      </header>

      <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Health Score Card */}
        <div className="glass-panel p-6 animate-fade-in delay-100" style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Heart size={20} className="text-emerald" /> Preventative Health Score
            </h3>
            <span className="text-emerald font-medium bg-emerald-900/30 px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', padding: '4px 12px', borderRadius: 999 }}>Top 15%</span>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="score-ring" style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                <circle cx="70" cy="70" r="60" fill="none" stroke="var(--border-color)" strokeWidth="12" />
                <circle cx="70" cy="70" r="60" fill="none" stroke="var(--accent-teal)" strokeWidth="12" strokeDasharray="377" strokeDashoffset={377 - (377 * healthScore.currentScore / 100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{healthScore.currentScore}</span>
                <span className="text-xs text-muted">/ 100</span>
              </div>
            </div>
            
            <div style={{ flex: 1, height: 120 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthScore.history}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-teal)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-teal)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ background: 'var(--bg-panel-solid)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-main)' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="var(--accent-teal)" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Action Item Card */}
        <div className="glass-panel p-6 flex flex-col justify-between animate-fade-in delay-200" style={{ padding: '1.5rem', background: 'linear-gradient(145deg, var(--bg-panel) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
          <div>
            <div className="flex items-center gap-2 mb-4" style={{ marginBottom: '1rem' }}>
              <Flame size={20} className="text-warning" />
              <h3 className="text-lg font-semibold">Priority Action</h3>
            </div>
            <p className="text-2xl font-bold" style={{ marginBottom: '0.5rem', lineHeight: 1.2 }}>{actionItem.title}</p>
            <p className="text-sm text-muted">{actionItem.description}</p>
          </div>
          <button className="w-full font-medium" style={{ background: 'var(--text-main)', color: 'var(--bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginTop: '1.5rem', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Book Appointment
          </button>
        </div>

      </div>

      <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        
        {/* Biomarkers */}
        <div className="glass-panel animate-fade-in delay-300" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
            <h3 className="text-lg font-semibold">Recent Biomarkers</h3>
            <button className="text-sm text-teal flex items-center">View all <ChevronRight size={16} /></button>
          </div>
          
          <div className="flex flex-col gap-3">
            {biomarkers.map((marker) => (
              <div key={marker.id} className="flex justify-between items-center" style={{ padding: '1rem', background: 'var(--bg-panel-hover)', borderRadius: 'var(--radius-md)' }}>
                <div className="flex items-center gap-3">
                  {marker.status === 'optimal' ? 
                    <CheckCircle2 size={18} className="text-emerald" /> : 
                    <AlertCircle size={18} className="text-warning" />
                  }
                  <span className="font-medium">{marker.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold">{marker.value}</span>
                  <span className="text-xs" style={{ color: marker.change.startsWith('+') && marker.status === 'warning' ? 'var(--warning)' : 'var(--accent-emerald)' }}>
                    {marker.change} from last
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Team */}
        <div className="glass-panel animate-fade-in delay-300" style={{ padding: '1.5rem' }}>
          <h3 className="text-lg font-semibold" style={{ marginBottom: '1.5rem' }}>Your Clinical Team</h3>
          
          <div className="flex flex-col gap-4">
            {clinicalTeam.map((member) => (
              <div key={member.id} className="flex items-center gap-4">
                <img src={`https://ui-avatars.com/api/?name=${member.name.replace(/ /g, '+')}&background=${member.avatarBg}&color=fff`} alt={member.name} style={{ width: 48, height: 48, borderRadius: '50%' }} />
                <div style={{ flex: 1 }}>
                  <h4 className="font-semibold">{member.name}</h4>
                  <p className="text-sm text-muted">{member.role}</p>
                </div>
                <button className="text-sm border-button" style={{ border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-panel-hover)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  Message
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <h4 className="text-sm font-semibold text-blue" style={{ color: 'var(--accent-blue)', marginBottom: '0.25rem' }}>HealthDash Core Services Active</h4>
            <p className="text-xs text-muted">Your continuous health data is actively syncing via our secure data pipeline.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
