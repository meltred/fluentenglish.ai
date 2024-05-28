import Demo from "@/components/Demo";
import { fetchAccessToken } from "@humeai/voice";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Home() {
  const accessToken = await fetchAccessToken({
    apiKey: String(process.env.HUME_API_KEY),
    clientSecret: String(process.env.HUME_CLIENT_SECRET),
  });

  if (!accessToken) {
    return redirect("https://kunalsin9h.com");
  }

  return (
    <main>
      <Demo humeAccessToken={accessToken} />
    </main>
  );
}
