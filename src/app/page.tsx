import Demo from "@/components/Demo";
import { getAccessToken } from "@/lib/hume";

export const runtime = "edge";

export default async function Home() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error();
  }

  return (
    <main>
      <Demo humeAccessToken={accessToken} />
    </main>
  );
}
