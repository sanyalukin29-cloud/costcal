import Link from "next/link";
import { Calculator } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <Calculator className="h-4 w-4" />
          </span>
          <span className="text-lg">CostCal</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/calc/online-seller"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            ขายออนไลน์
          </Link>
          <Link
            href="#features"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            ฟีเจอร์
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            ราคา
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/calc/online-seller"
            className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            คำนวณเลย
          </Link>
        </div>
      </div>
    </header>
  );
}
