import { useEffect, useState } from 'react'
import './App.css'

interface Quote {
  id: number;
  quoteContent: string;
  author: string;
}

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [author, setAuthor] = useState("");

  async function randomSearch() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const response = await result.json();
    let randomAuthor = response["author"];
    let randomQuoteContent = response["content"];
    const newQuote: Quote = {
      id: -1,
      quoteContent: randomQuoteContent,
      author: randomAuthor
    }
    setQuotes([newQuote]);
  }

  async function searchAuthor() {
    if (author === "") return;
    let newQuotes = [];
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + author);
    const response = await result.json();
    const count = response["count"];
    for (let i = 0; i < count; i++) {
      let curr_author = response["results"][i]["author"];
      let curr_content = response["results"][i]["content"];
      const newQuote: Quote = {
        id: i,
        quoteContent: curr_content,
        author: curr_author
      };
      newQuotes.push(newQuote);
    }
    setQuotes(newQuotes);
  }

  useEffect(() => {
    randomSearch();
  }, []);

  return (
    <div className="App">
      <div>
        <h2>Quote Search</h2>
        <input type="text" placeholder="Albert Einstein" onChange={e => setAuthor(e.target.value)}></input>
        <button onClick={searchAuthor}>Search</button>
      </div>
      <div className="output">
        {
          quotes.map((quote) => (
            <div className="box" key={quote.id}>
              {quote.quoteContent !== ""
                ? <p>{quote.quoteContent}</p>
                : <p>An error has occurred.</p>
              }
              {quote.author !== ""
              ? <h4>-{quote.author}</h4>
              : <h4></h4>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
