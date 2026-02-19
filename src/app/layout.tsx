import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Paws & Love - Pet Shop',
  description: 'Find your perfect companion and shop quality pet products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
