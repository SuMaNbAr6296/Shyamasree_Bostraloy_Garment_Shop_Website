import React from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';

interface StorefrontShellProps {
  children: React.ReactNode;
}

export function StorefrontShell({ children }: StorefrontShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      <AnnouncementBar />
      <Header />
      <div className="flex-1 w-full">{children}</div>
      <Footer />
    </div>
  );
}
