'use client'
import Image from 'next/image'
import SequencerGrid from '@/components/SequencerGrid'
import Button, { colorVariants } from '@/components/button'
import React from 'react'
import * as Tone from "tone";
import kick from "/drums/kick.wav";
import snare from "/drums/snare.wav";
import clave from "/drums/clave.wav";
import closedHat from "/drums/closed hat.wav";
import openHat from "/drums/open hat.wav";



export default function Home() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentBeat, setCurrentBeat] = React.useState(0);

  React.useEffect(() => {
    if(isPlaying) {
      console.log("transport started")
      Tone.start();
      Tone.getTransport().start();
    } else {
      Tone.getTransport().stop();
    }
  },[isPlaying])
   
  return (
    <main className="flex min-h-screen items-center flex-col flex-row justify-between bg-synth-body-cream">
      <SequencerGrid 
      drums={[
        {name: "kick", sample: "/drums/kick.wav"},
        {name: "snare", sample: "/drums/snare.wav"},
        {name: "clave", sample: "/drums/clave.wav"},
        {name: "hihatOpen", sample: "/drums/closed hat.wav"},
        {name: "hihatClosed", sample: "/drums/open hat.wav"},
    ]}
    numberOfBeats={16}
    ></SequencerGrid>
    <button className={
      isPlaying ? 
        colorVariants.selected 
          : colorVariants.unselected
      } onClick={() => setIsPlaying(!isPlaying)}></button>
    </main>
  )
}
