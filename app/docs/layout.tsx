import { Container } from "@/components/container";
import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24 pb-24 md:pt-32 md:pb-32">
      <Container width="wide">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <div className="sticky top-28">
              <DocsSidebar />
            </div>
          </aside>
          <div className="md:col-span-9">
            <article className="prose-krellix max-w-[72ch]">{children}</article>
          </div>
        </div>
      </Container>
    </div>
  );
}
