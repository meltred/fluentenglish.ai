import { TextAnimate } from "@/components/ui/text-animate";

export default async function Home() {
  return (
    <main className="container mx-auto flex h-screen items-center justify-center">
      <TextAnimate text="FluentEnglish.AI" type="popIn" />
    </main>
  );
}
