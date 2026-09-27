import { Container } from '@/components/ui/Container';

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-card border-b border-border py-8 sm:py-12">
        <Container className="space-y-4">
          <div className="h-4 w-32 bg-muted rounded-sm" />
          <div className="h-8 w-64 bg-muted rounded-sm" />
          <div className="h-4 w-96 bg-muted rounded-sm" />
        </Container>
      </div>

      {/* Catalog Skeleton */}
      <Container className="py-8 space-y-6">
        <div className="h-12 w-full bg-card border border-border rounded-md" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block space-y-4">
            <div className="h-6 w-32 bg-muted rounded-sm" />
            <div className="h-40 w-full bg-card border border-border rounded-md" />
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-72 w-full bg-card border border-border rounded-md" />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
