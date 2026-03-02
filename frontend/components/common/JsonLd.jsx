/**
 * @file JSON-LD script injector component.
 */

/**
 * Injects structured data scripts into the page.
 * @param {Object} props - Component props.
 * @param {Object|Object[]} props.data - JSON-LD object(s).
 * @returns {JSX.Element} Script element.
 */
export default function JsonLd({ data }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, index) => (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          key={index}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
