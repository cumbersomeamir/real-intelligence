/**
 * @file Avatar component.
 */

import Image from 'next/image';

/**
 * Circular avatar with initials fallback.
 * @param {Object} props - Props.
 * @param {string} [props.name] - Full name.
 * @param {string} [props.src] - Image url.
 * @returns {JSX.Element} Avatar.
 */
export default function Avatar({ name = 'U', src }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return <Image src={src} alt={name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />;
  }

  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
      {initials}
    </span>
  );
}
