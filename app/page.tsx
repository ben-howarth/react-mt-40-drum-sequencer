"use client";
import SequencerGrid from "@/components/SequencerGrid";
import React, { useState } from "react";
import Image from "next/image";
import * as Tone from "tone";

export default function Home() {
  const [toneStarted, setToneStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleButtonClick() {
    if (!toneStarted) {
      Tone.start();
      setToneStarted(true);
    }
    if (!isPlaying) {
      Tone.getTransport().start();
    } else {
      Tone.getTransport().stop();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <main className="flex min-h-screen items-center flex-col flex-row justify-between bg-bright-yellow font-mono">
      <header className="flex mt-2 border-2 border-black bg-white drop-shadow-2xl">
        Drum Sequencer built using React, typescript, Tone.js and sounds from
        the Casio MT-40
        <a
          href={"https://github.com/ben-howarth/react-mt-40-drum-sequencer"}
          className="justify-self-end"
          target="_blank"
        >
          <Image
            src={"/github-mark.svg"}
            alt="link to github repo"
            width={20}
            height={20}
            className="ml-8 mr-2 my-1"
          ></Image>
        </a>
      </header>
      <SequencerGrid
        drums={[
          { name: "Hihat Open", sample: "/samples/open hat.wav" },
          { name: "Hihat Closed", sample: "/samples/closed hat.wav" },
          { name: "Clave", sample: "/samples/clave.wav" },
          { name: "Snare", sample: "/samples/snare.wav" },
          { name: "Kick", sample: "/samples/kick.wav" },
        ]}
        numberOfBeats={16}
        isPlaying={isPlaying}
        // setLoaded={setLoaded}
      ></SequencerGrid>
      <button
        className={
          isPlaying
            ? "justify-self-start mb-8 border-b-4 border-2 h-12 w-64 text-white text-lg font-bold py-2 px-4 bg-synth-red-200 border-synth-red-600"
            : "justify-self-start mb-8 border-b-4 border-2 h-12 w-64 text-white text-lg font-bold py-2 px-4 bg-synth-red-200 border-synth-red-600"
        }
        onClick={() => handleButtonClick()}
        // disabled={!loaded}
      >
        {isPlaying ? "Stop" : "Start"}
      </button>
    </main>
  );
}
