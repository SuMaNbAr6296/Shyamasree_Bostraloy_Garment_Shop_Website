import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function CheckoutLoading() {
  return (
    <Section size="md" className="py-12 bg-background min-h-[60vh] font-sans">
      <Container className="space-y-8 animate-pulse">
        <div className="h-4 w-32 bg-muted rounded-xs" />
        <div className="h-8 w-64 bg-muted rounded-md" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 h-96 bg-card rounded-md border border-border" />
          <div className="lg:col-span-5 h-80 bg-card rounded-md border border-border" />
        </div>
      </Container>
    </Section>
  );
}
