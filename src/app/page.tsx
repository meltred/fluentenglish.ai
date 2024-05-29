import Demo from "@/components/Demo";
import { fetchAccessToken } from "@humeai/voice";

export default async function Home() {
  const accessToken = await fetchAccessToken({
    apiKey: process.env.HUME_API_KEY,
    clientSecret: process.env.HUME_CLIENT_SECRET,
  });

  if (!accessToken) {
    throw new Error();
  }

  return (
    <main>
      <Demo humeAccessToken={accessToken} />
    </main>
  );
}
