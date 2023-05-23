import React, { Dispatch, SetStateAction } from "react";
import * as Tone from "tone";

const NOTE = "C2";

export const colorVariants = {
    selected:
      "m-4 border-b-4 h-16 w-16 text-white font-bold py-2 px-4 hover: rounded bg-synth-brown-100 border-synth-brown-600",
    unselected:
      "m-4 border-b-4 h-16 w-16 text-white font-bold py-2 px-4 hover: rounded bg-synth-brown-200 border-synth-brown-400",
  };

type Props = {
    drums: {name: string, sample: string}[],
    numberOfBeats: number,
    isPlaying: boolean,
    setLoaded: Dispatch<SetStateAction<boolean>>
}

type Track = {
    id: number, 
    sampler: Tone.Sampler,
  }

type SequencerCell = {
    position: number,
    isActive: boolean
}

type SequencerTrack = {
    id: number,
    name: string,
    sequencerCells: SequencerCell[]
  }

function SequencerGrid({drums, numberOfBeats, isPlaying, setLoaded}: Props) {
    const [currentStep, setCurrentStep] = React.useState<number>(0);
    const [grid, setGrid] = React.useState<SequencerTrack[]>(createInitialGrid)
    const tracksRef = React.useRef<Track[]>([]);
    const sequenceRef = React.useRef<Tone.Sequence | null> (null);
    const drumRowIds = React.useMemo(() => [...Array.from(Array(drums.length).keys())] as const, [drums]);
    const numberOfBeatIds = React.useMemo(() => Array.from(Array(numberOfBeats).keys()), [numberOfBeats]);

    function createInitialGrid(): SequencerTrack[]{
        return drums.map((drum, i) => ({
            id: i,
            name: drum.name,
            sequencerCells: Array.from(Array(numberOfBeats)).map( i => (
                {
                    position: i,
                    isActive: false
                }
            )
            )
        }));
    }

    React.useEffect(() => {
        tracksRef.current = drums.map((sample, i) => ({
            id: i,
            sampler: new Tone.Sampler( {
                urls: {
                    [NOTE] : sample.sample,
                },
                onload: () => {
                    setLoaded(true);
                }
                
            }).toDestination()
        }));

        return () => {
            tracksRef.current.forEach((track) => track.sampler.dispose());
        }
        
    }, [drums]);

    React.useEffect(() => {
        sequenceRef.current = new Tone.Sequence((time, step) => {
            setCurrentStep(step);
            tracksRef.current.forEach((track) => {
                if(grid.find(sequencerTrack => 
                    sequencerTrack.id === track.id)?.sequencerCells.at(step)?.isActive
                    ) {
                        track.sampler.triggerAttack(NOTE, time);
                }
            })
        }, [...numberOfBeatIds], "16n");

        if(isPlaying) {
            sequenceRef.current?.start(undefined, currentStep);
        } else {
            sequenceRef.current?.stop();
            setCurrentStep(0);
        }

        return () => {
            sequenceRef.current?.dispose();
        }
    }, [grid, isPlaying, numberOfBeatIds]);
    

    function handleButtonClick(drumRowId: number, numberOfBeatId: number) {
        setGrid(grid.map(sequencerTrack => {
            if(sequencerTrack.id === drumRowId){
                sequencerTrack.sequencerCells[numberOfBeatId].isActive = !sequencerTrack.sequencerCells[numberOfBeatId].isActive
                return sequencerTrack;
        } else {
            return sequencerTrack;
        }}))
        }
    
    return <div className="grid max-w-full" >
        {drumRowIds.map(drumRowId => (
            <>
            <div className="text-left font-bold w-32 mt-3">{drums[drumRowId].name}</div>
            <div key={drumRowId} className="flex flex-row justify-items-center [&>*:nth-child(4n)]:mr-10">
                {/* <div className="text-center font-bold w-32">{drums[drumRowId].name}</div> */}
                {numberOfBeatIds.map( numberOfBeatId => (
                    <button
                        key={drumRowId + " " + numberOfBeatId} 
                        className={
                            grid.find(sequencerTrack => sequencerTrack.id === drumRowId)?.sequencerCells[numberOfBeatId].isActive
                            ? colorVariants.selected
                            : colorVariants.unselected
                        }
                        onClick={() => handleButtonClick(drumRowId, numberOfBeatId)}
                    ></button>
                    )
                )
            }
        </div>
        </>
        ))}
        <div className="flex flex-row [&>*:nth-child(4n)]:mr-14">
        {numberOfBeatIds.map( (numberOfBeatId) => (
            <div key={numberOfBeatId} className={(numberOfBeatId === currentStep) ?
                "m-10 rounded-full space-x-16 space-y-32 py-2 px-2 rounded bg-synth-red-400"
                :"m-10 rounded-full space-x-16 space-y-32 py-2 px-2 rounded bg-synth-red-100"
            }
                ></div>
        ) ) 
        }
            </div>
    </div>;
}

export default SequencerGrid;