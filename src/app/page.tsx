import Demo from "@/components/Demo";
import { getAccessToken } from "@/lib/hume";
import { log } from "@logtail/next";

export const runtime = "edge";

export default async function Home() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    log.error("Access token is null");
    throw new Error();
  }

  return (
    <main>
      <Demo humeAccessToken={accessToken} />
    </main>
  );
}
