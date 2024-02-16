import { useState } from 'react';
import './Dictionary-style.css'


const Dictionary = () => {

  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  const [inpWord, setInpWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    fetch(`${url}${inpWord}`)
      .then((response) => response.json())
      .then((data) => {
        setWordData(data[0]);
        setError(false);
      })
      .catch(() => {
        setWordData(null);
        setError(true);
      });
  };

  const playSound = () => {
    if (wordData && wordData.phonetics && wordData.phonetics[0] && wordData.phonetics[0].audio) {
      const sound = new Audio(`https:${wordData.phonetics[0].audio}`);
      sound.play();
    }
  };


  return (
    <>
     <div>
        <audio id="sound" />
        <div className="container">
          <div className="dictionary">
            <div className="search-box">
              <input
                type="text"
                id="inp-word"
                value={inpWord}
                onChange={(e) => setInpWord(e.target.value)}
                placeholder="Type the word here..."
              />
              
              <button id="search-btn" onClick={handleSearch}>Search</button>
            </div>
            
            {wordData ? (
              <div className="result" id="result" >
                <div className="word">
                  <h3>{inpWord}</h3>
                  <button onClick={playSound}>
                    <i className="fa fa-volume-up" aria-hidden="true"></i>
                  </button>
                </div>
                <div className="details">
                  <p>{wordData.meanings[0].partOfSpeech}</p>
                  <p>{wordData.phonetic}</p>
                </div>
                <p className="word-meaning">
                  {wordData.meanings[0].definitions[0].definition}
                </p>
                <p className="word-example">
                  {wordData.meanings[0].definitions[0].example || ""}
                </p>
              </div>
            ) : error ? (
              <h2 className="error">Couldn&apos;t Find the word</h2>
            ) : null}
          
          
          </div>
        </div>
      </div>

    </>
  )
}

export default Dictionary