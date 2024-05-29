import { HumeAccessToken } from "@/types/basic";
import { log } from "@logtail/next";

export async function getAccessToken() {
  const clientID = btoa(
    `${process.env.HUME_API_KEY}:${process.env.HUME_CLIENT_SECRET}`
  );

  try {
    const result = await fetch("https://api.hume.ai/oauth2-cc/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${clientID}`,
      },
      body: `grant_type=client_credentials`,
    });

    const data: HumeAccessToken = await result.json();

    return data.access_token;
  } catch (e) {
    log.error("Error: failed to fetch accesstoken from apihume.ai", {
      error: e,
    });

    console.log(e);

    return null;
    // use logging library
  }
}
