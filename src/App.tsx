import { useState, type SubmitEvent } from 'react';
import './App.css'


type Message = {
  message: string
  duration: number
  topic: string
}

async function postMessage(message: Message) {
  await fetch("/api/message", { method: "POST", body: JSON.stringify(message) });
}

function App() {
  const [topic, setTopic] = useState<"tomi" | "rochi">("tomi");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(0);

  const clearForm = () => {
    setDuration(0);
    setMessage("");
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postMessage({ message, duration, topic })
    clearForm()
  };


  return <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder='mensaje'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <input
      checked={topic === "tomi"}
      value="tomi"
      type="radio"
      id="tomi"
      onChange={() => setTopic("tomi")}
    />
    <label htmlFor="tomi">Tomi</label>
    <input
      checked={topic === "rochi"}
      type="radio"
      id="rochi"
      onChange={() => setTopic("rochi")}
    />
    <label htmlFor="rochi">Rochi</label>
    <input
      type="number"
      id="duration"
      onChange={(e) => setDuration(Number.isNaN(e.target.value) ? 0 : Number(e.target.value))}
    />
    <label htmlFor="duration">Duration</label>
    <button type='submit'>Enviar</button>
  </form>
};

export default App;
