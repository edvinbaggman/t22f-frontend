import { Step, Stepper } from '@material-tailwind/react';
import React from 'react';

interface RoundsStepperViewProps {
  roundInPlay: number;
  roundInPlayFinished: boolean;
  numberOfRounds: number;
  selectedRound: number;
  setSelectedRound: (round: number) => void;
  scrollContainer: React.RefObject<HTMLDivElement>;
  stepperRef: React.RefObject<HTMLDivElement>;
  stepperWrapperRef: React.RefObject<HTMLDivElement>;
  numberOfRoundsArray: number[];
}
export default function RoundsStepperView({
  roundInPlay,
  roundInPlayFinished,
  numberOfRounds,
  selectedRound,
  setSelectedRound,
  scrollContainer,
  stepperRef,
  stepperWrapperRef,
  numberOfRoundsArray,
}: RoundsStepperViewProps) {
  return (
    <div className='w-full pb-4'>
      <div className='w-full flex gap-2 items-center'>
        <p className='font-semibold text-sm'>Rounds</p>
      </div>
      <div
        ref={scrollContainer}
        className='w-full h-20 overflow-x-scroll px-4 relative z-0'
      >
        <div ref={stepperWrapperRef} className='w-full'>
          <div ref={stepperRef} className='w-fit'>
            <Stepper
              activeStep={roundInPlay}
              lineClassName=''
              activeLineClassName='bg-success'
              className='z-10 h-20'
              style={{ minWidth: `${numberOfRounds * 5}rem` }}
            >
              {numberOfRoundsArray.map((round: number) => (
                <Step
                  key={`round-${round}`}
                  className={`h-20 bg-transparent${
                    round + 1 === numberOfRounds ? '' : ''
                  }  ${
                    round <= roundInPlay
                      ? 'cursor-pointer'
                      : 'bg-tansparent text-gray-400'
                  } ${round === roundInPlay ? 'bg-error' : ''}}`}
                  activeClassName='bg-transparent'
                  completedClassName='bg-transparent'
                  onClick={() => setSelectedRound(round)}
                >
                  <div
                    className={`${
                      round + 1 === numberOfRounds
                        ? 'h-20 flex items-center content-center'
                        : ''
                    }`}
                  >
                    <div className={`rounded-full h-10 w-10 relative`}>
                      <div
                        className={`rounded-full h-10 w-10 absolute ${
                          roundInPlay === round
                            ? roundInPlayFinished
                              ? 'bg-success'
                              : 'animate-ping bg-warning'
                            : ''
                        }`}
                      />
                      <div
                        className={`rounded-full h-10 w-10 absolute flex items-center justify-center transition duration-50 ease-in-out ${
                          roundInPlay === round
                            ? roundInPlayFinished
                              ? 'bg-success hover:scale-125'
                              : 'bg-warning hover:scale-125'
                            : ''
                        } ${
                          round < roundInPlay
                            ? 'bg-success hover:brightness-125 hover:scale-150'
                            : ''
                        } ${
                          round === selectedRound
                            ? 'scale-150'
                            : round > roundInPlay
                            ? 'bg-gray-200'
                            : ''
                        }`}
                      >
                        {round + 1}
                      </div>
                    </div>
                  </div>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
      </div>
    </div>
  );
}
