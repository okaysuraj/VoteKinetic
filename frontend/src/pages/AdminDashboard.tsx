import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockData = [
  { name: 'Alice J.', votes: 400 },
  { name: 'Bob S.', votes: 300 },
  { name: 'Charlie T.', votes: 200 },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-gray-400 mt-1">Manage elections and view analytics.</p>
        </div>
        <Button>+ New Election</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-6">Live Election: Student Council 2026</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }} 
                  />
                  <Bar dataKey="votes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Election List</h3>
            </div>
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="text-xs uppercase bg-white/5 text-gray-300">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Turnout</th>
                  <th className="px-4 py-3 rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 text-white font-medium">Student Council 2026</td>
                  <td className="px-4 py-4"><span className="text-green-400">Active</span></td>
                  <td className="px-4 py-4">45% (900/2000)</td>
                  <td className="px-4 py-4"><Button variant="outline" className="text-xs py-1 px-3">Manage</Button></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 text-white font-medium">Housing Society Board</td>
                  <td className="px-4 py-4"><span className="text-yellow-400">Draft</span></td>
                  <td className="px-4 py-4">-</td>
                  <td className="px-4 py-4"><Button variant="outline" className="text-xs py-1 px-3">Edit</Button></td>
                </tr>
              </tbody>
            </table>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20">
            <h3 className="text-lg font-bold text-white mb-2">System Health</h3>
            <div className="space-y-4 mt-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">API Latency</span>
                  <span className="text-green-400">42ms</span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full w-[20%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Database Load</span>
                  <span className="text-yellow-400">65%</span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-1.5"><div className="bg-yellow-500 h-1.5 rounded-full w-[65%]"></div></div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start text-left">Generate Voter Tokens</Button>
              <Button variant="secondary" className="w-full justify-start text-left">Import Voter List (CSV)</Button>
              <Button variant="danger" className="w-full justify-start text-left">Emergency Freeze</Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
