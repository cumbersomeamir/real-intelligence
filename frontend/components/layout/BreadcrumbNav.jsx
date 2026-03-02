/**
 * @file Breadcrumb navigation component.
 */

import Link from 'next/link';

/**
 * Breadcrumb renderer.
 * @param {Object} props - Props.
 * @param {Array<{label:string,href?:string}>} props.items - Breadcrumb items.
 * @returns {JSX.Element} Breadcrumb nav.
 */
export default function BreadcrumbNav({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-surface-500 dark:text-surface-300">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
            {index < items.length - 1 ? <span>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
