import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { CTA } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-mist py-20 md:py-28">
      <div className="container-site max-w-2xl text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">We could not find that page.</h1>
        <p className="mt-4 text-lg text-muted">It may have moved. Try one of these instead.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Go to the home page</ButtonLink>
          <ButtonLink href="/book-consultation/" variant="secondary">
            {CTA.consultation}
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm">
          <Link href="/development/" className="underline">Development</Link> · <Link href="/marketing/" className="underline">Marketing</Link> · <Link href="/pr/" className="underline">PR</Link> · <Link href="/contact/" className="underline">Contact</Link>
        </p>
      </div>
    </section>
  );
}
