import { RefObject, useEffect, useMemo, useRef } from 'react';
import RoundsStepperView from './RoundsStepperView';
import { useResizeObserver } from '../../../../utils/useResizeObserver';

export default function RoundsStepperController({
  roundInPlay,
  roundInPlayFinished,
  numberOfRounds,
  selectedRound,
  setSelectedRound,
}: {
  roundInPlay: number;
  roundInPlayFinished: boolean;
  numberOfRounds: number;
  selectedRound: number;
  setSelectedRound: (round: number) => void;
}) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);
  const stepperWrapperRef = useRef<HTMLDivElement>(null);

  const numberOfRoundsArray = useMemo(() => {
    return Array.from(
      { length: (numberOfRounds - 1 - 0) / 1 + 1 },
      (value, index) => 0 + index * 1
    );
  }, [numberOfRounds]);

  function scrollToSelectedRound(
    scrollContainer: RefObject<HTMLElement>,
    stepperRef: RefObject<HTMLElement>,
    selectedRound: number,
    numberOfRounds: number
  ) {
    if (!scrollContainer.current || !stepperRef.current) return;

    const stepperWidth = stepperRef.current?.offsetWidth;
    if (stepperWidth) {
      scrollContainer.current?.scrollTo({
        left:
          ((stepperWidth - 48) / (numberOfRounds - 1)) * selectedRound -
          (scrollContainer.current?.offsetWidth - 48) / 2,
        behavior: 'smooth',
      });
    }
  }

  // Scroll to the selected round when the selectedRound or numberOfRounds changes
  useEffect(() => {
    scrollToSelectedRound(
      scrollContainer,
      stepperRef,
      selectedRound,
      numberOfRounds
    );
  }, [
    scrollContainer?.current,
    stepperRef?.current,
    stepperWrapperRef?.current,
    selectedRound,
    numberOfRounds,
  ]);

  // This observer is triggered whenever the scrollContainer's height or width is changed
  useResizeObserver(scrollContainer, (rect) => {
    if (!scrollContainer.current || !stepperRef.current) return;

    // This section is a fix for a bug when the last stepper is active.
    // The ping animation enlarges the stepper and causes the scrollContainer to resize.
    // To get rid of this: Whenever the scrollContainer resizes, the stepper is resized to add some extra width.
    const padding = 48;
    if (
      scrollContainer.current?.offsetWidth > stepperRef.current?.offsetWidth
    ) {
      stepperRef?.current?.style.setProperty(
        'width',
        `${scrollContainer?.current.offsetWidth - padding}px`
      );
    } else {
      stepperWrapperRef?.current?.style.setProperty(
        'width',
        `${stepperRef?.current.offsetWidth + padding}px`
      );
    }

    // Scroll to the selected round when the scrollContainer's width changes. Example: when opening the games tab.
    scrollToSelectedRound(
      scrollContainer,
      stepperRef,
      selectedRound,
      numberOfRounds
    );
  });

  return (
    <RoundsStepperView
      roundInPlay={roundInPlay}
      roundInPlayFinished={roundInPlayFinished}
      numberOfRounds={numberOfRounds}
      selectedRound={selectedRound}
      setSelectedRound={setSelectedRound}
      scrollContainer={scrollContainer}
      stepperRef={stepperRef}
      stepperWrapperRef={stepperWrapperRef}
      numberOfRoundsArray={numberOfRoundsArray}
    />
  );
}
