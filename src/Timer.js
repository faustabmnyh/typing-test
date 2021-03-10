import { useEffect } from "react";

const Timer = ({
  startCounting,
  allCorrectResult,
  setStartCounting,
  setUserInput,
  minutes,
  setTimeElapsed,
  setResetWord,
}) => {
  useEffect(() => {
    let timer;
    if (startCounting) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }

    if (minutes >= 1) {
      setStartCounting(false);
      setResetWord(true);
      setUserInput("Completed");
      return () => {
        clearInterval(timer);
      };
    }
    return () => {
      clearInterval(timer);
    };
  }, [
    startCounting,
    minutes,
    setStartCounting,
    setUserInput,
    setTimeElapsed,
    setResetWord,
  ]);

  return (
    <div>
      <p>Speed: {minutes ? (allCorrectResult / minutes).toFixed(2) : 0} WPM</p>
    </div>
  );
};

export default Timer;
