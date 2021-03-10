import { memo, useRef, useState } from "react";
import Timer from "./Timer";
import Word from "./Word";

const getWords = () =>
  "hai tayo apakah anda sudah makan tayo hai tayo mari kesini kita akan mempertemukan anda dengan dora karena dia juga sama seperti anda kenapa saya bilang seperti itu karena saya suka makan bakso sukses itu bukan di dapat hanya dengan jarang melakukan hal tersebut api sukses itu di dapat jika kita melakukannya secara konsisten aku tidak tahu semua ini dan siapa anda tetapi apakah anda tahu siapa saya kurasa anda akan mengetahui segera kamu tahu kenapa karena aku juga tidak tahu mengapa dunia ini bekerja seperti ini semangat konsisten tapi kenapa saya merasa capai dengan semua ini aku juga tidak tahu kenapa tapi yang saya tahu saya harus tetap melangkah walau semangat dan tersenyum lebar aku i dont know who you are but i have strange feeling to you i dont know why since i saw you although we never met moreover i dont know your language waw aneh kali mang ini campuran inggris dan indo yeah this is right this is strange and i feel like i will met you someday whether its will be sooner or later i dont know i just feel i will find you someday and meet you aneh dasar ngimpi mulu ngayal mulu".split(
    " "
  );

// this is will check whether this function will be render or not
const WordMemo = memo(Word);

const Home = () => {
  const [userInput, setUserInput] = useState("");
  // this is for check index correct word all section
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  // this is for check index correct word each section
  const [activeWordSection, setActiveWordSection] = useState(0);
  // this is for contain correct or incorrect word each section
  const [correctWordArray, setCorrectWordArray] = useState([]);
  // this is for contain correct incorrect word all Section
  const [allCorrectResult, setAllCorrectResult] = useState([]);
  const [resetWord, setResetWord] = useState(false);
  const [startCounting, setStartCounting] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [WordPerSection] = useState(20);

  const minutes = timeElapsed / 60;

  const words = useRef(getWords());

  // get current section
  const indexOfLastSection = currentSection * WordPerSection;
  const indexOfFirstSection = indexOfLastSection - WordPerSection;
  const currentSections = words.current.slice(
    indexOfFirstSection,
    indexOfLastSection
  );

  const createWords = currentSections.map((word, index) => {
    return (
      <WordMemo
        word={word}
        activeWord={index === activeWordSection}
        correct={correctWordArray[index]}
      />
    );
  });

  const processInput = (value) => {
    setStartCounting(true);
    // this is mean we already finished the word or we pressed space

    if (value.endsWith(" ")) {
      setActiveWordIndex((index) => index + 1);
      setActiveWordSection((index) => index + 1);
      setUserInput("");

      if (activeWordIndex === words.current.length - 1) {
        // if last word we gonna stop that
        setStartCounting(false);
        setResetWord(true);
        setUserInput("Completed");
      }

      // correct word
      const word = value.trim();

      //check word each section
      setCorrectWordArray((data) => {
        const newResult = [...data];
        newResult[activeWordSection] =
          word === currentSections[activeWordSection];
        return newResult;
      });

      //check word all section
      setAllCorrectResult((data) => {
        const newResult = [...data];
        newResult[activeWordIndex] = word === words.current[activeWordIndex];
        return newResult;
      });

      // last word each section
      if (activeWordSection === currentSections.length - 1) {
        setCurrentSection((index) => index + 1);
        setActiveWordSection(0);
        // set to default correct or incorrect each section
        setCorrectWordArray([]);
      }
    } else {
      setUserInput(value);
    }
  };

  const handleReset = () => {
    setUserInput("");
    setTimeElapsed(0);
    setCorrectWordArray([]);
    setAllCorrectResult([]);
    setActiveWordIndex(0);
    setActiveWordSection(0);
    setCurrentSection(1);
    setResetWord(false);
    setStartCounting(false);
  };

  return (
    <div className="home">
      <h1>This is just trying test app </h1>
      <Timer
        allCorrectResult={allCorrectResult.filter(Boolean).length}
        startCounting={startCounting}
        setStartCounting={setStartCounting}
        setUserInput={setUserInput}
        setTimeElapsed={setTimeElapsed}
        minutes={minutes}
        setResetWord={setResetWord}
      />
      {!resetWord && (
        <div className="home__wordContainer">
          <p>{createWords}</p>
        </div>
      )}
      <div className="home__input">
        <input
          type="text"
          value={userInput}
          disabled={userInput === "Completed"}
          onChange={(e) => processInput(e.target.value)}
          placeholder="Type in here"
        />
        <p>
          {timeElapsed === 60
            ? "1:00"
            : activeWordIndex === words.current.length
            ? timeElapsed < 10
              ? `0:0${timeElapsed}`
              : `0:${timeElapsed}`
            : startCounting
            ? timeElapsed < 10
              ? `0:0${timeElapsed}`
              : `0:${timeElapsed}`
            : "0:00"}
        </p>
        <span onClick={handleReset} className="home__reset">
          <i className="fa fa-refresh" />
        </span>
      </div>
    </div>
  );
};

export default Home;
