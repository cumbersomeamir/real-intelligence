/**
 * @file Dynamic blog post page.
 */

import { notFound } from 'next/navigation';
import JsonLd from '@/components/common/JsonLd';
import { blogPosts } from '@/lib/mockData';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

/**
 * Generates blog post metadata.
 * @param {Object} props - Route props.
 * @param {Promise<{slug:string}>} props.params - Route params.
 * @returns {Promise<import('next').Metadata>} Metadata object.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    return buildMetadata({ title: 'Post not found', description: 'The requested post was not found.', path: '/blog' });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraph: { type: 'article', images: [`/og/blog/${post.slug}.png`] }
  });
}

/**
 * Statically generates blog slugs.
 * @returns {Array<{slug:string}>} Static params.
 */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/**
 * Renders blog detail page.
 * @param {Object} props - Route props.
 * @param {Promise<{slug:string}>} props.params - Params promise.
 * @returns {Promise<JSX.Element>} Blog post view.
 */
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            author: { '@type': 'Person', name: post.author },
            datePublished: post.date
          },
          breadcrumbJsonLd([
            { name: 'Home', item: 'https://lucknowpropintel.com/' },
            { name: 'Blog', item: 'https://lucknowpropintel.com/blog' },
            { name: post.title, item: `https://lucknowpropintel.com/blog/${post.slug}` }
          ])
        ]}
      />
      <article>
        <h1 className="text-4xl font-extrabold">{post.title}</h1>
        <p className="mt-3 text-sm text-surface-500">
          {post.category} · {new Date(post.date).toLocaleDateString('en-IN')} · {post.readTime}
        </p>
        <p className="mt-6 text-base leading-7 text-surface-700">
          {post.excerpt} This article explains the underlying data signals, model assumptions, and execution tactics investors can apply immediately. We evaluate micro-location momentum, pricing anomalies, policy context, and risk filters to convert raw listings into decision-grade intelligence.
        </p>
      </article>
    </main>
  );
}
