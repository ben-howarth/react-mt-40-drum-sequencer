import React from "react";
import Button from "./button";
import * as Tone from "tone";

const NOTE = "C2";

type Props = {
    drums: {name: string, sample: string}[],
    numberOfBeats: number,
}

type Track = {
    id: number, 
    sampler: Tone.Sampler,
  }
  

function SequencerGrid({drums, numberOfBeats}: Props) {

    const tracksRef = React.useRef<Track[]>([]);
    const stepsRef = React.useRef<React.ReactElement[]>()
    const sequenceRef = React.useRef<Tone.Sequence | null> (null);

    const drumRowIds = [...Array.from(Array(drums.length).keys())] as const;
    const numberOfBeatIds = [...Array.from(Array(numberOfBeats).keys())] as const;

    React.useEffect(() => {
        tracksRef.current = drums.map((sample, i) => ({
            id: i,
            sampler: new Tone.Sampler( {
                urls: {
                    [NOTE] : sample.sample,
                }
            }).toDestination()
        }));
        sequenceRef.current = new Tone.Sequence((time, step) => {
            console.log("step:" + step)
            tracksRef.current.forEach((track) => {
                if(stepsRef.current[track.id]?.step?.isPlaying) {
                    track.sampler.triggerAttack(NOTE, time);
                }
            })
            
        }, [...numberOfBeatIds], "16n").start();

        return () => {
            sequenceRef.current?.dispose();
            tracksRef.current.forEach((track) => track.sampler.dispose());
        }
        
    }, [drums, numberOfBeatIds])
    
    return <div className="gridmax-w-full justify-items-center " >
        {drumRowIds.map(drumRowId => (
            <div key={drumRowId} className="flex flex-row [&>*:nth-child(4n)]:mr-8">
                {numberOfBeatIds.map( numberOfBeatId => (
                    <Button key={drumRowId +numberOfBeatId}></Button>
                    )
                )
            }
        </div>
        ))}
    </div>;
}

export default SequencerGrid;