interface PersonPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold">Profile: {slug}</h1>
      <p className="text-gray-600 mt-4">Content coming soon.</p>
    </main>
  );
}
