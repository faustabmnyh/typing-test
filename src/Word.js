const Word = ({ word, activeWord, correct }) => {
  
  if (correct === true) {
    return <span className="correct">{word} </span>;
  }
  if (correct === false) {
    return <span className="incorrect">{word} </span>;
  }
  return activeWord ? (
    <span className="active-word">{word} </span>
  ) : (
    <span className="word">{word} </span>
  );
};

export default Word;
