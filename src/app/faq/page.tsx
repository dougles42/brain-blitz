import type { Metadata } from "next";
import { FAQPageSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Ear Training Game",
  description:
    "Learn how Pitch Perfect helps musicians develop relative pitch and aural skills through interactive exercises. Free online ear training for all levels.",
  openGraph: {
    title: "Frequently Asked Questions | Pitch Perfect",
    description:
      "Learn how Pitch Perfect helps musicians develop relative pitch through interactive exercises.",
  },
};

const faqs = [
  {
    question: "What is Pitch Perfect and how does it help with ear training?",
    answer:
      "Pitch Perfect is a free online ear training game that helps musicians develop pitch recognition skills. A note plays — you identify it on a virtual piano keyboard. With solo practice, daily challenges, and multiplayer duels, Pitch Perfect makes ear training fun and effective for musicians of all levels.",
  },
  {
    question: "Is Pitch Perfect suitable for beginners?",
    answer:
      "Yes! Pitch Perfect is designed for musicians of all levels. Beginners can start with Solo mode to practice at their own pace, and progress to Daily Challenges and Multiplayer duels as their confidence grows. The piano keyboard interface is intuitive and no music theory knowledge is required to start.",
  },
  {
    question: "How does the Daily Challenge work?",
    answer:
      "Every day, Pitch Perfect generates a new note from a seeded algorithm. Everyone worldwide gets the same note on the same day. You listen, guess the note on the piano keyboard, and get immediate feedback. Track your streak, win rate, and total games played. Share your score with friends to compare results.",
  },
  {
    question: "How does Multiplayer mode work?",
    answer:
      "In Multiplayer mode, you configure a challenge (difficulty level and instrument sound), and Pitch Perfect generates a sequence of notes from a random seed. Play through the challenge to get your score. Share the link with a friend — they play the exact same sequence and you compare scores.",
  },
  {
    question: "Do I need any special equipment to use Pitch Perfect?",
    answer:
      "No special equipment needed! Pitch Perfect works entirely in your web browser on desktop, tablet, or mobile phone. We recommend using headphones or quality speakers for the best audio experience. A MIDI keyboard is not required.",
  },
  {
    question: "How often should I practice ear training?",
    answer:
      "For best results, we recommend short daily practice sessions. The Daily Challenge mode is perfect for this — it takes just a minute to play and helps build a consistent ear training habit. Even 5-10 minutes of daily practice can significantly improve your pitch recognition over time.",
  },
  {
    question: "What musical skills does Pitch Perfect develop?",
    answer:
      "Pitch Perfect develops relative pitch (recognizing notes by ear), pitch memory, and auditory discrimination. These are fundamental aural skills essential for improvisation, learning songs by ear, transcription, sight-singing, and overall musical fluency.",
  },
  {
    question: "Can Pitch Perfect help with music exam preparation?",
    answer:
      "Yes! Pitch recognition is a core component of aural skills tested in major music exams including ABRSM, Trinity, RCM, and AP Music Theory. Pitch Perfect's daily practice helps build the ear training foundation needed for these exams.",
  },
  {
    question: "Is Pitch Perfect really free?",
    answer:
      "Yes! Pitch Perfect is completely free to use. All game modes — Solo, Daily Challenge, Multiplayer, and Challenge — are available without any payment or account creation. We support the platform through non-intrusive advertising so quality ear training remains accessible to everyone.",
  },
];

export default function FAQPage() {
  return (
    <>
      <FAQPageSchema faqs={faqs} />
      <div className="flex flex-1 flex-col items-center px-4 py-12">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
              Everything you need to know about ear training with Pitch Perfect.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900"
              >
                <summary className="cursor-pointer text-lg font-semibold text-zinc-900 dark:text-zinc-100 list-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between">
                    {faq.question}
                    <svg
                      className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
