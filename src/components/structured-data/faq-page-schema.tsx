import { JsonLd } from "./json-ld";

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "What is Pitch Perfect?",
    answer:
      "Pitch Perfect is a free online ear training game that helps musicians develop pitch recognition skills. A note plays — you identify it. With Tone.js-powered audio and an intuitive interface, Pitch Perfect makes ear training accessible to musicians of all levels.",
  },
  {
    question: "Is Pitch Perfect suitable for beginners?",
    answer:
      "Yes! Pitch Perfect is designed for musicians of all levels. Beginners can start with simple exercises and progress to more challenging modes as their ear develops. No music theory knowledge is required to start.",
  },
  {
    question: "How often should I practice ear training?",
    answer:
      "For best results, we recommend 10-15 minutes of daily practice. Consistent short sessions are more effective than occasional long sessions. Even 5 minutes a day can significantly improve your pitch recognition over time.",
  },
  {
    question: "Do I need any special equipment?",
    answer:
      "No special equipment is needed. Pitch Perfect works entirely in your web browser on any device. We recommend headphones or quality speakers for the best audio experience.",
  },
  {
    question: "Is Pitch Perfect really free?",
    answer:
      "Yes! Pitch Perfect is completely free to use. All exercises and features are available without payment. We support the platform through non-intrusive advertising.",
  },
  {
    question: "What musical skills does Pitch Perfect develop?",
    answer:
      "Pitch Perfect develops relative pitch, pitch memory, and auditory discrimination. These are fundamental aural skills essential for improvisation, transcription, sight-singing, and overall musical fluency.",
  },
];

export function FAQPageSchema({ faqs = defaultFAQs }: { faqs?: FAQItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return <JsonLd data={data} />;
}
