import React, { Dispatch, SetStateAction, useEffect, useMemo, useState, useRef } from "react";
import * as Tone from "tone";
import debounce from "lodash.debounce";

const NOTE = "C2";

type Drum = {
  name: string;
  sample: string;
};

type Props = {
  drums: Drum[];
  numberOfBeats: number;
  isPlaying: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
};

type Track = {
  id: number;
  sampler: Tone.Sampler;
};

type SequencerCell = {
  position: number;
  isActive: boolean;
};

type SequencerTrack = {
  id: number;
  name: string;
  sequencerCells: SequencerCell[];
};

function SequencerGrid({ drums, numberOfBeats, isPlaying, setIsLoaded }: Props) {
  // store a grid to mark drums as active/inactive at a given point in the sequence
  const [grid, setGrid] = useState<SequencerTrack[]>(createInitialGrid(drums));
  // stores the current step for display purposes
  const [activeStep, setActiveStep] = useState<number>(0);
  // load each drum sample into a Tone Sampler and store using a ref
  const tracksRef = useRef<Track[]>();
   // Ref to hold the grid state separate from the UI rendering
  const gridStateRef = useRef<SequencerTrack[]>([]);

  const debouncedUpdateGrid = useRef(debounce(updateGrid, 100)).current; // Debounced updateGrid function

  const drumRowIds = useMemo(() => Array.from(Array(drums.length).keys()), [drums]);
  const numberOfBeatIds = useMemo(() => Array.from(Array(numberOfBeats).keys()), [numberOfBeats]);

  useEffect(() => {
      gridStateRef.current = grid; // Update the ref with the current grid state

  }, [grid]);
  
  useEffect(() => {
    if(tracksRef.current) {
      tracksRef.current = drums.map((sample, i) => ({
        id: i,
        sampler: new Tone.Sampler({
          urls: {
            [NOTE]: sample.sample,
          },
          onload: () => {
            setIsLoaded(true);
          },
        }).toDestination(),
      }));
    }
    
    return () => {
      tracksRef.current?.forEach((track) => track.sampler.dispose());
      setIsLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createInitialGrid(drums: Drum[]): SequencerTrack[] {
    return drums.map((drum, i) => ({
      id: i,
      name: drum.name,
      sequencerCells: Array.from(Array(numberOfBeats)).map((_, position) => ({
        position,
        isActive: false,
      })),
    }));
  }

  useEffect(() => {
    if (!isPlaying) return;
    
    const loop = new Tone.Sequence(
      (time, step) => {
        setActiveStep(step);
        gridStateRef.current.forEach((sequencerTrack) => {
          const { id, sequencerCells } = sequencerTrack;
          const cell = sequencerCells[step];
          if (cell.isActive && tracksRef.current) {
            const track = tracksRef.current.find((t) => t.id === id);
            if (track) {
              track.sampler.triggerAttack(NOTE, time);
            }
          }
        });
      },
      numberOfBeatIds,
      "16n"
    );

    loop.start();
    loop.loop = true;

    return () => {
      loop.stop();
    };
  }, [isPlaying, numberOfBeatIds]);

  function updateGrid(drumRowId: number, numberOfBeatId: number) {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((sequencerTrack) => {
        if (sequencerTrack.id === drumRowId) {
          return {
            ...sequencerTrack,
            sequencerCells: sequencerTrack.sequencerCells.map((cell) => {
              if (cell.position === numberOfBeatId) {
                return {
                  ...cell,
                  isActive: !cell.isActive,
                };
              }
              return cell;
            }),
          };
        }
        return sequencerTrack;
      });
      return newGrid;
    });
  }

  function debouncedGridUpdate(drumRowId: number, numberOfBeatId: number) {
    debouncedUpdateGrid(drumRowId, numberOfBeatId);
  }

  return (
    <div className="grid mt-2">
      {drumRowIds.map((drumRowId) => (
        <div key={drumRowId + "-container"}>
          <div
            key={drumRowId + "-name"}
            className="text-left border-2 border-black bg-white text-sm font-bold w-32 mt-1 ml-4 drop-shadow-2xl"
          >
            {drums[drumRowId].name}
          </div>
          <div key={drumRowId} className="flex flex-row justify-items-center [&>*:nth-child(4n)]:mr-10">
            {numberOfBeatIds.map((numberOfBeatId) => (
              <button
                key={drumRowId + " " + numberOfBeatId}
                className={
                  grid.find((sequencerTrack) => sequencerTrack.id === drumRowId)
                    ?.sequencerCells[numberOfBeatId].isActive
                    ? "m-4 border-b-4 border-2 h-10 w-10 bg-synth-brown-100 border-synth-brown-600"
                    : "m-4 border-b-4 border-2 h-10 w-10 bg-synth-brown-200 border-synth-brown-400"
                }
                onClick={() => debouncedGridUpdate(drumRowId, numberOfBeatId)}
              ></button>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-row [&>*:nth-child(4n)]:mr-[3.25rem] ">
        {numberOfBeatIds.map((numberOfBeatId) => (
          <div
            key={numberOfBeatId}
            className={
              numberOfBeatId === activeStep
                ? "mx-7 border-2 border-black rounded-full py-1.5 px-1.5 rounded bg-synth-red-400"
                : "mx-7 border-2 border-black rounded-full py-1.5 px-1.5 rounded bg-synth-red-100"
            }
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SequencerGrid;
