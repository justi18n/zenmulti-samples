import { getDictionary } from "@/i18n/dictionaries";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ params }: Readonly<{ params: Readonly<{ lang: string }> }>) {
  const dict = await getDictionary(params.lang);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-4xl font-extrabold">{dict.seo.title}</div>
      <Link href="https://zenmulti.cc">ZenMulti NextJS Demo</Link>
    </main>
  );
}
