'use client'
import Image from 'next/image'
import SequencerGrid, { colorVariants } from '@/components/SequencerGrid'
import React from 'react'
import * as Tone from "tone";

export default function Home() {
  const [toneStarted, setToneStarted] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if(!toneStarted) {
      Tone.start();
      setToneStarted(true);
    }
    if(isPlaying) {
      Tone.getTransport().start();
    } else {
      Tone.getTransport().stop();
    }
  },[isPlaying, toneStarted])
   
  return (
    <main className="flex min-h-screen items-center flex-col flex-row justify-between bg-synth-body-cream">
      <SequencerGrid 
      drums={[
        {name: "hihatClosed", sample: "/drums/open hat.wav"},
        {name: "hihatOpen", sample: "/drums/closed hat.wav"},
        {name: "clave", sample: "/drums/clave.wav"},
        {name: "snare", sample: "/drums/snare.wav"},
        {name: "kick", sample: "/drums/kick.wav"},
    ]}
    numberOfBeats={16}
    isPlaying={isPlaying}
    ></SequencerGrid>
    <button className={
      isPlaying ? 
        colorVariants.selected 
          : colorVariants.unselected
      } onClick={() => setIsPlaying(!isPlaying)}></button>
    </main>
  )
}
