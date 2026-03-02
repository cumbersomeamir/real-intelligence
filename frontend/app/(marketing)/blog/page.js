/**
 * @file Blog listing page.
 */

import Link from 'next/link';
import Card from '@/components/ui/Card';
import JsonLd from '@/components/common/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { blogCategories, blogPosts } from '@/lib/mockData';

/**
 * Metadata for blog listing.
 * @returns {Promise<import('next').Metadata>} Metadata payload.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: 'Property Intelligence Insights',
    description:
      'Market analysis, investment strategies, and data-driven perspectives on Lucknow real estate.',
    path: '/blog'
  });
}

/**
 * Renders blog listing UI.
 * @returns {JSX.Element} Blog page.
 */
export default function BlogPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: 'https://lucknowpropintel.com/' },
          { name: 'Blog', item: 'https://lucknowpropintel.com/blog' }
        ])}
      />
      <h1 className="text-4xl font-extrabold">Property Intelligence Insights</h1>
      <p className="mt-3 text-surface-600">Market analysis, investment strategies, and data-driven perspectives on Lucknow real estate.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {blogCategories.map((category) => (
          <span key={category} className="rounded-full bg-surface-100 px-3 py-1 text-xs font-semibold text-surface-700">
            {category}
          </span>
        ))}
      </div>
      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug}>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">{post.category}</p>
            <h2 className="mt-2 text-xl font-bold">{post.title}</h2>
            <p className="mt-2 text-sm text-surface-600">{post.excerpt}</p>
            <p className="mt-3 text-xs text-surface-500">
              {post.readTime} · {new Date(post.date).toLocaleDateString('en-IN')} · {post.author}
            </p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary-600">
              Read article
            </Link>
          </Card>
        ))}
      </section>
    </main>
  );
}
