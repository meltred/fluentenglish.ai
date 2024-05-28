import type { Metadata } from "next";

export function getMetadata(): Metadata {
  return {
    title: { default: "FluentEnglish.AI", template: "%s • FluentEnglish.AI" },
    creator: "Meltred Pvt Ltd.",
    publisher: "Meltred Pvt Ltd.",
    description: "An AI native application for non-native English learners.",
    keywords: [
      "ai",
      "fluent english",
      "english",
      "english learning ai",
      "ai english learning tool",
      "aienglish",
      "ai fluent english",
      "fluent english learning",
      "group conversation",
      "english group conversation",
      "face emotions",
      "writing emails",
    ],
    authors: [{ name: "Meltred Pvt Ltd.", url: "https://meltred.com" }],
    colorScheme: "dark",
    openGraph: {
      title: "FluentEnglish.AI",
      description: "An AI native application for non-native English learners.",
      url: "https://fluentenglish.ai",
      siteName: "FluentEnglish.AI",
      images: [
        {
          // todo: remove this with own image /og.jpeg
          url: "https://i.imgur.com/2wB1GqB.jpeg",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en-US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
    twitter: {
      card: "summary_large_image",
      title: "FluentEnglish.AI",
      description: "An AI native application for non-native English learners.",
      siteId: "fluentenglish_ai",
      creator: "@fluentenglishai",
      creatorId: "fluentenglishai",
      images: {
        url: "https://i.imgur.com/2wB1GqB.jpeg",
        alt: "A gradient background with noise and website description written at the bottom left",
      },
    },
    verification: {
      google: "QaDDzSdVB9rbLtACat7LBgfamFanwkSYv0MzdCGERxU=",

      yandex: "Ey7X4/zlbWtObK3I",
      yahoo: "yahoo",
      other: { me: ["kunal@kunalsin9h.com"] },
    },
    alternates: {
      canonical: "https://fluentenglish.ai",
      types: { "application/rss+xml": "https://fluentenglish.ai/rss.xml" },
    },
    assets: ["https://fluentenglish.ai/assets.zip"],
    category: "technology",
  };
}
