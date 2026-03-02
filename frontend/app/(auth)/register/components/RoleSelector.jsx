/**
 * @file Role selection component.
 */

'use client';

import Select from '@/components/ui/Select';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Role selector field.
 * @param {Object} props - Props.
 * @param {string} props.value - Current role.
 * @param {Function} props.onChange - Change callback.
 * @param {string} [props.error] - Error message.
 * @param {boolean} [props.enabled] - Empty state toggle.
 * @returns {JSX.Element} Role selector.
 */
export default function RoleSelector({ value, onChange, error, enabled = true }) {
  if (!enabled) {
    return <EmptyState title="Role selection disabled" description="Role selector is currently unavailable." />;
  }

  return (
    <Select
      label="Role"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      error={error}
      options={[
        { label: 'Investor', value: 'investor' },
        { label: 'Buyer', value: 'buyer' },
        { label: 'Viewer', value: 'viewer' },
        { label: 'Admin', value: 'admin' }
      ]}
    />
  );
}
