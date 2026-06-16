import { JsonLd } from "./json-ld";

interface VideoGameSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  image?: string;
}

export function VideoGameSchema({
  name = "Pitch Perfect - Ear Training Game",
  description = "Interactive pitch recognition game that helps musicians develop their musical ear through progressive exercises and real-time audio feedback.",
  url = "https://pitch-perfect.app",
  image = "https://pitch-perfect.app/api/og",
}: VideoGameSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name,
    description,
    url,
    image,
    operatingSystem: "Web",
    applicationCategory: "EducationalApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
  return <JsonLd data={data} />;
}
