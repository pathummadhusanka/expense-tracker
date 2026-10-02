import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { FormField } from '../components/ui/FormField';
import { useUser } from '../contexts/UserContext';
import { useExpenses } from '../contexts/ExpensesContext';
import { useToast } from '../contexts/ToastContext';
import { inputClass } from '../utils/styles';

interface ProfileErrors {
  name?: string;
  email?: string;
}

export function SettingsPage() {
  const { user, updateUser } = useUser();
  const { resetData, status } = useExpenses();
  const { showToast } = useToast();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [resetting, setResetting] = useState(false);

  const isDirty = name !== user.name || email !== user.email;

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: ProfileErrors = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';else
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address';
    setErrors(next);
    if (Object.keys(next).length) return;
    updateUser({ name: name.trim(), email: email.trim() });
    showToast({ type: 'success', title: 'Profile updated successfully' });
  };

  const handleReset = async () => {
    setResetting(true);
    await resetData();
    setResetting(false);
  };

  return (
    <>
      <PageHeader title="Settings" description="Manage your profile and demo data" />

      <div className="divide-y divide-border rounded-xl border border-border bg-surface">
        <section aria-labelledby="profile-heading" className="grid gap-6 p-5 sm:p-6 lg:grid-cols-3">
          <div>
            <h2 id="profile-heading" className="text-sm font-semibold text-ink">
              Profile
            </h2>
            <p className="mt-1 text-sm text-muted">Shown in the account menu.</p>
          </div>
          <form onSubmit={handleSave} noValidate className="space-y-4 lg:col-span-2" aria-label="Profile">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField id="profile-name" label="Name" error={errors.name}>
                <input
                  id="profile-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'profile-name-error' : undefined}
                  className={inputClass(Boolean(errors.name), 'h-9 px-3')} />
                
              </FormField>
              <FormField id="profile-email" label="Email" error={errors.email}>
                <input
                  id="profile-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'profile-email-error' : undefined}
                  className={inputClass(Boolean(errors.email), 'h-9 px-3')} />
                
              </FormField>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primary" disabled={!isDirty}>
                Save changes
              </Button>
            </div>
          </form>
        </section>

        <section aria-labelledby="data-heading" className="grid gap-6 p-5 sm:p-6 lg:grid-cols-3">
          <div>
            <h2 id="data-heading" className="text-sm font-semibold text-ink">
              Demo data
            </h2>
            <p className="mt-1 text-sm text-muted">Expenses are stored locally for this prototype.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:col-span-2">
            <p className="text-sm text-muted">
              Restore the original sample expenses. Any expenses you added, edited, or deleted will be reset.
            </p>
            <Button variant="secondary" onClick={handleReset} loading={resetting} disabled={status === 'loading' && !resetting}>
              Reset demo data
            </Button>
          </div>
        </section>
      </div>
    </>);

}