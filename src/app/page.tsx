import Demo from "@/components/Demo";
import { fetchAccessToken } from "@humeai/voice";

export const runtime = "edge";

export default async function Home() {
  try {
    const accessToken = await fetchAccessToken({
      apiKey: process.env.HUME_API_KEY,
      clientSecret: process.env.HUME_CLIENT_SECRET,
    });

    if (!accessToken) {
      throw new Error();
    }

    return (
      <main>
        <p>Access Token: {accessToken}</p>
        <Demo humeAccessToken={accessToken} />
      </main>
    );
  } catch (e) {
    console.log(e);

    return (
      <p>
        <p>API Key: {process.env.HUME_API_KEY}</p>
        <p>Client Sec: {process.env.HUME_CLIENT_SECRET}</p>
        Error: {JSON.stringify(e)}
      </p>
    );
  }
}
