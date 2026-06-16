import { JsonLd } from "./json-ld";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pitch Perfect",
    url: "https://pitch-perfect.app",
    logo: "https://pitch-perfect.app/api/og",
    description:
      "Free online ear training platform helping musicians develop pitch recognition and aural skills.",
    sameAs: [
      "https://twitter.com/pitchperfect_app",
      "https://github.com/pitch-perfect",
    ],
  };
  return <JsonLd data={data} />;
}
