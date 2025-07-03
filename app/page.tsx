import { Metadata } from 'next';
import CerebrasStudioSimple from '../components/CerebrasStudioSimple';

export const metadata: Metadata = {
  title: 'Cerebras Studio - Ultra-Fast AI Creative Platform',
  description: 'Experience the world\'s fastest AI inference with Cerebras Studio. Generate content, code, and creative writing at lightning speed with 1,800 tokens per second.',
  openGraph: {
    title: 'Cerebras Studio - Ultra-Fast AI Creative Platform',
    description: 'Experience the world\'s fastest AI inference with Cerebras Studio.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <CerebrasStudioSimple />
    </main>
  );
}
