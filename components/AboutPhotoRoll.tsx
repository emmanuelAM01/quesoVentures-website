"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * A camera roll that pretends to be one photograph.
 *
 * At rest it is Tokyo, a wide shot that suits the strip. Clicking steps
 * through the rest of the roll and ends on the one with the camera, which is
 * the punchline: the photos on this site were taken by the same person who
 * built it. Landing on that frame opens the contact modal, titled "You caught
 * me", once per visit and after a beat so the photo registers first. Then the
 * roll loops. No caption, no arrows, no hint; like the portrait
 * card above it, it is there for whoever clicks.
 *
 * Every frame is stacked and crossfaded rather than swapped, so the next photo
 * is already decoded and the strip never flashes empty. The two portrait
 * shaped selfies carry their own object position, because a 21:9 crop through
 * the middle of a vertical photo lands on the chest, not the face.
 */
/** How long the camera frame shows before the modal opens over it. */
const CAUGHT_DELAY_MS = 900;

const FRAMES = [
  {
    src: "/hero/aboutTokyo.jpg",
    alt: "Emmanuel Mendieta on an observation deck above Tokyo",
    position: "50% 20%",
  },
  {
    src: "/hero/aboutColosseum.jpg",
    alt: "Emmanuel Mendieta inside the Colosseum in Rome",
    position: "50% 55%",
  },
  {
    src: "/hero/aboutHills.jpg",
    alt: "Emmanuel Mendieta on a green hillside under a summer sky",
    position: "50% 45%",
  },
  {
    src: "/hero/aboutCamera.jpg",
    alt: "Emmanuel Mendieta holding the camera behind the photos on this site",
    position: "50% 28%",
  },
];

export default function AboutPhotoRoll() {
  const [index, setIndex] = useState(0);
  const caught = useRef(false);

  const next = () => {
    const to = (index + 1) % FRAMES.length;
    setIndex(to);
    if (to === FRAMES.length - 1 && !caught.current) {
      caught.current = true;
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("contact:prefill", {
            detail: {
              title: "Gotcha",
              message: "I like to click around.",
            },
          })
        );
        window.dispatchEvent(
          new CustomEvent("modal:open", { detail: { id: "contact-popup" } })
        );
      }, CAUGHT_DELAY_MS);
    }
  };

  return (
    <button
      type="button"
      onClick={next}
      aria-label="Next photo"
      className="relative block w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder cursor-pointer select-none"
    >
      {FRAMES.map((frame, i) => (
        <Image
          key={frame.src}
          src={frame.src}
          alt={frame.alt}
          fill
          sizes="(max-width: 1152px) 100vw, 1152px"
          className={`object-cover transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: frame.position }}
          aria-hidden={i !== index}
        />
      ))}
    </button>
  );
}
