import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold">CostCal</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              เช็กก่อนขาย ว่ากำไรเหลือจริงกี่บาท
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">ลิงก์</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  ข้อตกลงการใช้งาน
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">ติดต่อ</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              hello@costcal.app
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-4 text-center text-xs text-muted-foreground">
          © {year} CostCal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
