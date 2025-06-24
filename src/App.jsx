import { useState } from 'react';
import { ScaleLoader } from "react-spinners";
import './App.css';

function App() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false); 

  async function handleCheckAdvice(e) {
    e.preventDefault();
    setLoading(true);
    setAdvice(""); 

    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      setAdvice("Could not fetch advice. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCheckAdvice}>
      <h1> WIZDOM </h1>

      <input
        type="text"
        placeholder="CLICK BELOW....."
        readOnly
        value={advice}
      />
      <br/><br/>

      <button
        type="submit"
        disabled={loading}
        
      >
        {loading ? (<> <ScaleLoader height={15} color="#ffffff"/> Seeking...
          </>
        ) : ("SEEK WISDOM")}
      </button>
    </form>
  );
}

export default App;
