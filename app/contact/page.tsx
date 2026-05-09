import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Talk to us about a pilot",
  description:
    "Krellix is in early pilot with a small number of customers. If you think it might fit your work, send a note — we read every email and reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Pilot inquiries"
        eyebrowNumber="01"
        title={<>Talk to us about a pilot.</>}
        lede={
          <>
            Krellix is in early pilot with a small number of customers. If you think
            it might fit your work, send a note — I read every email and reply within
            one business day.
          </>
        }
      />

      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow number="02">Send a note</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Tell me a little about the work.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-[52ch] text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                  A sentence or two about the matter or use case is enough. If a
                  pilot makes sense, the next step is a 20-minute call. If it
                  doesn&apos;t, I&apos;ll tell you that too.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 text-[length:var(--text-body-sm)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  Prefer to email directly? Write to{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                  >
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-5">
              <Reveal delay={0.12}>
                <div className="sticky top-28">
                  <div className="border border-[var(--color-rule)] bg-[var(--color-bg)]">
                    <div className="flex items-center justify-between border-b border-[var(--color-border-strong)] bg-[var(--color-bg-deep)] px-5 py-2.5">
                      <span className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
                        Schedule of expectations
                      </span>
                      <span className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
                        I → III
                      </span>
                    </div>
                    <ol className="divide-y divide-[var(--color-border)]">
                      {expectations.map((item, i) => (
                        <li key={item.title} className="px-5 py-5">
                          <p className="font-mono text-[length:var(--text-mono-sm)] tabular text-[color:var(--color-ink-subtle)]">
                            §&nbsp;{String(i + 1).padStart(2, "0")}
                          </p>
                          <h3 className="mt-2 font-display text-[1.125rem] leading-[1.25] tracking-[-0.005em] text-[color:var(--color-ink)]">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-[length:var(--text-body-sm)] leading-[1.55] text-[color:var(--color-ink-muted)]">
                            {item.body}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

const expectations = [
  {
    title: "A real reply, same day",
    body: "Within one business day. No autoresponders, no SDR queue, no qualification form.",
  },
  {
    title: "A 20-minute call to understand the use case",
    body: "If it looks like a fit, we set up a short call to walk through the matter and the workflow.",
  },
  {
    title: "A signed installer and license, by email",
    body: "After the call, you get a digitally signed Windows installer and a license file — sent directly.",
  },
];
