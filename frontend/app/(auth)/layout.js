/**
 * @file Auth route-group layout.
 */

/**
 * Auth pages layout without dashboard chrome.
 * @param {Object} props - Layout props.
 * @param {React.ReactNode} props.children - Child routes.
 * @returns {JSX.Element} Layout wrapper.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen light-mesh">
      <main className="mx-auto max-w-md px-4 py-16">{children}</main>
    </div>
  );
}
