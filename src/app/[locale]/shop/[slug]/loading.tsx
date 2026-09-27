import { Container } from '@/components/ui/Container';

export default function ProductLoading() {
  return (
    <Container className="py-12 space-y-8 animate-pulse font-sans">
      <div className="h-4 w-48 bg-muted rounded-sm" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="aspect-4/3 w-full bg-card border border-border rounded-md" />
        <div className="space-y-4">
          <div className="h-4 w-24 bg-muted rounded-sm" />
          <div className="h-8 w-3/4 bg-muted rounded-sm" />
          <div className="h-6 w-32 bg-muted rounded-sm" />
          <div className="h-12 w-full bg-card border border-border rounded-md" />
        </div>
      </div>
    </Container>
  );
}
