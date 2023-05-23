'use client'
import SequencerGrid from '@/components/SequencerGrid'
import React from 'react'
import * as Tone from "tone";

export default function Home() {
  const [toneStarted, setToneStarted] = React.useState(false);
  const [loaded,setLoaded] = React.useState(false);
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
        {name: "Hihat Closed", sample: "/drums/open hat.wav"},
        {name: "Hihat Open", sample: "/drums/closed hat.wav"},
        {name: "Clave", sample: "/drums/clave.wav"},
        {name: "Snare", sample: "/drums/snare.wav"},
        {name: "Kick", sample: "/drums/kick.wav"},
    ]}
    numberOfBeats={16}
    isPlaying={isPlaying}
    setLoaded={setLoaded}
    ></SequencerGrid>
    <button className={
      isPlaying ? 
      "justify-self-start m-8 border-b-4 h-16 w-64 text-white text-lg font-bold py-2 px-4 hover: rounded bg-synth-red-200 border-synth-red-600"
        : 
        "justify-self-start m-8 border-b-4 h-16 w-64 text-white text-lg font-bold py-2 px-4 hover: rounded bg-synth-red-200 border-synth-red-600"
      } 
      onClick={() => setIsPlaying(!isPlaying)}
      disabled={!loaded}
      >{isPlaying? "Stop" : "Start"}</button>
    </main>
  )
}
