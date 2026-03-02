'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import {
  createApiKey,
  deleteApiKey,
  getApiKeys,
  getSessionUser,
  getTeamMembers,
  getUserSettings,
  inviteTeamMember,
  removeTeamMember,
  saveUserSettings,
  updateLocalProfile
} from '@/lib/dataClient';

/**
 * Settings client page.
 * @returns {JSX.Element}
 */
export default function SettingsClient() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [team, setTeam] = useState([]);
  const [newKeyLabel, setNewKeyLabel] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('viewer');

  useEffect(() => {
    setUser(getSessionUser());
    setSettings(getUserSettings());
    setApiKeys(getApiKeys());
    setTeam(getTeamMembers());
  }, []);

  if (!settings) {
    return null;
  }

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">Settings</h1>
        <p className="mt-1 text-sm text-surface-400">Profile, alert preferences, team access, and API credentials.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="bg-surface-900/60 xl:col-span-2">
          <h2 className="text-lg font-semibold">Profile</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Input
              label="Name"
              value={user?.name || ''}
              onChange={(event) => setUser((current) => ({ ...(current || {}), name: event.target.value }))}
            />
            <Input
              label="Email"
              value={user?.email || ''}
              onChange={(event) => setUser((current) => ({ ...(current || {}), email: event.target.value }))}
            />
            <Input
              label="Phone"
              value={user?.phone || ''}
              onChange={(event) => setUser((current) => ({ ...(current || {}), phone: event.target.value }))}
            />
            <Select
              label="Language"
              value={settings.language}
              onChange={(event) => setSettings((current) => ({ ...current, language: event.target.value }))}
              options={[
                { label: 'English', value: 'en' },
                { label: 'Hindi', value: 'hi' }
              ]}
            />
          </div>
          <Button
            className="mt-4"
            onClick={() => {
              const updatedUser = updateLocalProfile(user || {});
              setUser(updatedUser || user);
              saveUserSettings(settings);
              toast.success('Profile updated');
            }}
          >
            Save Profile
          </Button>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Alert Preferences</h2>
          <div className="mt-3 space-y-2 text-sm">
            {[
              ['email', 'Email alerts'],
              ['whatsapp', 'WhatsApp alerts'],
              ['push', 'Push notifications']
            ].map(([key, label]) => (
              <label key={key} className="flex items-center justify-between rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">
                <span>{label}</span>
                <input
                  type="checkbox"
                  checked={Boolean(settings.alerts?.[key])}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      alerts: {
                        ...(current.alerts || {}),
                        [key]: event.target.checked
                      }
                    }))
                  }
                />
              </label>
            ))}
          </div>
          <Button
            className="mt-4"
            onClick={() => {
              setSettings(saveUserSettings(settings));
              toast.success('Preferences saved');
            }}
          >
            Save Preferences
          </Button>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">API Keys</h2>
          <div className="mt-3 flex gap-2">
            <Input label="Key label" value={newKeyLabel} onChange={(event) => setNewKeyLabel(event.target.value)} className="flex-1" />
            <Button
              onClick={() => {
                if (!newKeyLabel.trim()) {
                  toast.error('Enter key label');
                  return;
                }
                createApiKey(newKeyLabel.trim());
                setApiKeys(getApiKeys());
                setNewKeyLabel('');
                toast.success('API key created');
              }}
            >
              Create
            </Button>
          </div>
          <div className="mt-3 space-y-2 text-sm text-surface-300">
            {apiKeys.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">
                <div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-surface-400">{item.token.slice(0, 16)}...</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    deleteApiKey(item.id);
                    setApiKeys(getApiKeys());
                    toast.success('API key deleted');
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
            {!apiKeys.length ? <p className="text-surface-400">No API keys created.</p> : null}
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Team Management</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Input label="Name" value={inviteName} onChange={(event) => setInviteName(event.target.value)} />
            <Input label="Email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} />
            <Select
              label="Role"
              value={inviteRole}
              onChange={(event) => setInviteRole(event.target.value)}
              options={[
                { label: 'Viewer', value: 'viewer' },
                { label: 'Buyer', value: 'buyer' },
                { label: 'Investor', value: 'investor' },
                { label: 'Admin', value: 'admin' }
              ]}
            />
            <div className="flex items-end">
              <Button
                className="w-full"
                onClick={() => {
                  if (!inviteName.trim() || !inviteEmail.trim()) {
                    toast.error('Enter name and email');
                    return;
                  }
                  inviteTeamMember({ name: inviteName.trim(), email: inviteEmail.trim(), role: inviteRole });
                  setTeam(getTeamMembers());
                  setInviteName('');
                  setInviteEmail('');
                  toast.success('Invite sent');
                }}
              >
                Invite
              </Button>
            </div>
          </div>

          <div className="mt-3 space-y-2 text-sm text-surface-300">
            {team.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">
                <div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-xs text-surface-400">{member.email} · {member.role}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    removeTeamMember(member.id);
                    setTeam(getTeamMembers());
                    toast.success('Member removed');
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            {!team.length ? <p className="text-surface-400">No team members yet.</p> : null}
          </div>
        </Card>
      </div>
    </section>
  );
}
