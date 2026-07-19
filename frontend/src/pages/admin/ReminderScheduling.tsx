import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ReminderScheduling: React.FC = () => {
  const [deliveryChannels, setDeliveryChannels] = useState({
    email: true,
    sms: false,
    push: false
  });

  const handleChannelToggle = (channel: 'email' | 'sms' | 'push') => {
    setDeliveryChannels(prev => ({
      ...prev,
      [channel]: !prev[channel]
    }));
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant">
        <nav className="flex justify-between items-center px-gutter py-4 w-full max-w-[1440px] mx-auto">
          <Link to="/admin" className="font-headline-md text-headline-md font-bold text-primary">VOTEKINETIC</Link>
          <div className="hidden md:flex items-center gap-8">
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Organizations</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Tenants</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Billing</a>
            <a className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1" href="#">Global Settings</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Security</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">notifications</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">account_circle</span>
          </div>
        </nav>
      </header>

      <main className="flex-grow w-full max-w-[1440px] mx-auto px-gutter py-stack-lg flex flex-col gap-stack-lg">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg">Reminder Scheduling</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Automated communication triggers for election milestones.</p>
          </div>
          <button className="bg-primary text-on-primary h-12 px-6 rounded-lg font-label-md flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined">add</span>
            Create New Trigger
          </button>
        </div>

        {/* Multi-Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
          {/* Left Pane: Configuration & Template (Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-stack-lg">
            {/* Automation Triggers Card */}
            <section className="bg-surface-container-lowest border border-outline-variant p-gutter rounded-xl">
              <div className="flex items-center gap-2 mb-gutter">
                <span className="material-symbols-outlined text-secondary">bolt</span>
                <h2 className="font-headline-md text-headline-md">Automation Triggers</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface">Election Milestone</label>
                  <select className="h-12 border border-outline rounded-lg px-4 bg-surface-container-low focus:ring-2 focus:ring-secondary focus:outline-none transition-all">
                    <option>24 Hours Before Polls Close</option>
                    <option>1 Week Before Election Day</option>
                    <option>Registration Deadline Reminder</option>
                    <option>Post-Election Results Notification</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface">Priority Level</label>
                  <select className="h-12 border border-outline rounded-lg px-4 bg-surface-container-low focus:ring-2 focus:ring-secondary focus:outline-none transition-all">
                    <option>High (Immediate Delivery)</option>
                    <option>Medium (Standard Queue)</option>
                    <option>Low (Off-peak Only)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface">Delivery Channel</label>
                  <div className="flex gap-4">
                    <label 
                      className={`flex-1 flex items-center justify-center gap-2 border h-12 rounded-lg cursor-pointer transition-all ${deliveryChannels.email ? 'border-secondary bg-primary-fixed text-on-primary-fixed' : 'border-outline text-on-surface-variant hover:bg-surface-container-high'}`}
                    >
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={deliveryChannels.email} 
                        onChange={() => handleChannelToggle('email')}
                      />
                      <span className="material-symbols-outlined">email</span>
                      <span className="font-label-md">Email</span>
                    </label>
                    <label 
                      className={`flex-1 flex items-center justify-center gap-2 border h-12 rounded-lg cursor-pointer transition-all ${deliveryChannels.sms ? 'border-secondary bg-primary-fixed text-on-primary-fixed' : 'border-outline text-on-surface-variant hover:bg-surface-container-high'}`}
                    >
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={deliveryChannels.sms} 
                        onChange={() => handleChannelToggle('sms')}
                      />
                      <span className="material-symbols-outlined">sms</span>
                      <span className="font-label-md">SMS</span>
                    </label>
                    <label 
                      className={`flex-1 flex items-center justify-center gap-2 border h-12 rounded-lg cursor-pointer transition-all ${deliveryChannels.push ? 'border-secondary bg-primary-fixed text-on-primary-fixed' : 'border-outline text-on-surface-variant hover:bg-surface-container-high'}`}
                    >
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={deliveryChannels.push} 
                        onChange={() => handleChannelToggle('push')}
                      />
                      <span className="material-symbols-outlined">notifications_active</span>
                      <span className="font-label-md">Push</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface">Target Segment</label>
                  <select className="h-12 border border-outline rounded-lg px-4 bg-surface-container-low focus:ring-2 focus:ring-secondary focus:outline-none transition-all">
                    <option>All Eligible Voters</option>
                    <option>Unregistered Residents</option>
                    <option>Voters who haven't cast ballot</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Message Template Editor */}
            <section className="bg-surface-container-lowest border border-outline-variant p-gutter rounded-xl">
              <div className="flex items-center justify-between mb-gutter">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">edit_note</span>
                  <h2 className="font-headline-md text-headline-md">Message Template</h2>
                </div>
                <div className="flex gap-2">
                  <span className="bg-surface-container-highest px-2 py-0.5 rounded text-sm font-mono">#voter_name</span>
                  <span className="bg-surface-container-highest px-2 py-0.5 rounded text-sm font-mono">#election_title</span>
                  <span className="bg-surface-container-highest px-2 py-0.5 rounded text-sm font-mono">#deadline_time</span>
                </div>
              </div>
              <div className="flex flex-col gap-stack-md">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface">Subject Line</label>
                  <input 
                    className="h-12 border border-outline rounded-lg px-4 bg-surface-container-low focus:ring-2 focus:ring-secondary focus:outline-none" 
                    type="text" 
                    defaultValue="Action Required: 24 Hours Left to Vote in {{election_title}}" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface">Message Body</label>
                  <div className="border border-outline rounded-lg bg-surface-container-low overflow-hidden focus-within:ring-2 focus-within:ring-secondary transition-all">
                    <div className="bg-surface-container p-2 border-b border-outline flex gap-4">
                      <span className="material-symbols-outlined cursor-pointer hover:text-secondary">format_bold</span>
                      <span className="material-symbols-outlined cursor-pointer hover:text-secondary">format_italic</span>
                      <span className="material-symbols-outlined cursor-pointer hover:text-secondary">link</span>
                      <div className="w-px h-6 bg-outline-variant mx-1"></div>
                      <span className="material-symbols-outlined cursor-pointer hover:text-secondary">attachment</span>
                    </div>
                    <textarea 
                      className="w-full p-4 bg-transparent border-none focus:ring-0 resize-none font-body-md outline-none" 
                      rows={8}
                      defaultValue={`Dear {{voter_name}},\n\nThis is an official reminder from VOTEKINETIC.\n\nThe voting window for the {{election_title}} will close in exactly 24 hours at {{deadline_time}}. Records indicate your ballot has not yet been received.\n\nPlease log in to your secure portal to cast your vote.\n\nSincerely,\nState Election Commission`}
                    ></textarea>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Pane: Visualization & Monitoring (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-stack-lg">
            {/* Deployment Visual Scheduler */}
            <section className="bg-surface-container-lowest border border-outline-variant p-gutter rounded-xl">
              <div className="flex items-center justify-between mb-gutter">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">calendar_today</span>
                  <h2 className="font-headline-md text-headline-md">Visual Scheduler</h2>
                </div>
                <span className="font-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">UTC -05:00</span>
              </div>
              <div className="relative h-64 border border-outline-variant rounded-lg bg-surface-container-low overflow-hidden">
                {/* Simulated Calendar/Timeline View */}
                <div className="absolute inset-0 p-4 flex flex-col gap-4">
                  <div className="flex justify-between text-on-surface-variant font-label-sm mb-2 border-b border-outline-variant pb-2">
                    <span>MON 12</span><span>TUE 13</span><span>WED 14</span><span>THU 15</span><span>FRI 16</span>
                  </div>
                  <div className="relative flex-grow">
                    {/* Trigger Items */}
                    <div className="absolute top-2 left-[5%] right-[20%] bg-primary text-on-primary p-2 rounded text-xs font-label-sm shadow-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">mail</span> Registration Blast
                    </div>
                    <div className="absolute top-12 left-[40%] right-[10%] bg-secondary text-on-secondary p-2 rounded text-xs font-label-sm shadow-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">sms</span> SMS 1: Election Start
                    </div>
                    <div className="absolute top-24 left-[75%] right-[2%] border-2 border-secondary bg-primary-fixed text-on-primary-fixed p-2 rounded text-xs font-label-sm shadow-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">campaign</span> FINAL 24H (Active)
                    </div>
                    {/* Vertical Time Marker */}
                    <div className="absolute left-[70%] top-0 bottom-0 w-0.5 bg-error opacity-50 z-10">
                      <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-error"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-label-sm text-on-surface-variant mt-4 text-center">Click a deployment block to modify timing or constraints.</p>
            </section>

            {/* Recent Automation Logs */}
            <section className="bg-surface-container-lowest border border-outline-variant p-gutter rounded-xl overflow-hidden">
              <div className="flex items-center justify-between mb-gutter">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">analytics</span>
                  <h2 className="font-headline-md text-headline-md">Automation Logs</h2>
                </div>
                <button className="text-secondary font-label-md hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low">
                      <th className="p-3 font-label-sm text-on-surface-variant">Trigger Name</th>
                      <th className="p-3 font-label-sm text-on-surface-variant">Status</th>
                      <th className="p-3 font-label-sm text-on-surface-variant text-right">Success</th>
                    </tr>
                  </thead>
                  <tbody className="font-label-md">
                    <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                      <td className="p-3">Welcome Onboarding</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-800">COMPLETE</span>
                      </td>
                      <td className="p-3 text-right text-secondary font-bold">99.8%</td>
                    </tr>
                    <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                      <td className="p-3">Pre-Reg Reminder</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-800">COMPLETE</span>
                      </td>
                      <td className="p-3 text-right text-secondary font-bold">98.2%</td>
                    </tr>
                    <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                      <td className="p-3">District Updates</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-yellow-100 text-yellow-800">SCHEDULED</span>
                      </td>
                      <td className="p-3 text-right text-on-surface-variant">--</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-3">Identity Verify Failed</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-error-container text-on-error-container">FAILED</span>
                      </td>
                      <td className="p-3 text-right text-error font-bold">14%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Quick Help / Documentation */}
            <div className="bg-primary-container p-gutter rounded-xl text-on-primary-container flex gap-4 items-start">
              <span className="material-symbols-outlined text-secondary-container">help</span>
              <div>
                <h4 className="font-label-md mb-1">State-Grade Encryption Active</h4>
                <p className="font-label-sm opacity-80">All scheduled communications are PGP-signed. Ensure template variables match your uploaded voter manifest fields exactly.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-stack-md w-full max-w-[1440px] mx-auto gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="font-label-md text-label-md font-bold text-on-surface">VOTEKINETIC</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 VOTEKINETIC Institutional Voting Systems. All rights reserved. State-grade encryption active.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Audit Logs</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Compliance</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
