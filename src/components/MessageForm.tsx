import { useState, type SubmitEvent } from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from '@base-ui/react/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';


type Message = {
  message: string
  duration: number
  topic: string
}

async function postMessage(message: Message) {
  await fetch("/api/message", { method: "POST", body: JSON.stringify(message) });
}

function MessageForm() {
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

  return <Card className="w-full max-w-sm" >
    <form onSubmit={handleSubmit}>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="mensaje">Mensaje</Label>
            <Input
              id='mensaje'
              type="text"
              placeholder='Mensaje'
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duracion</Label>
            <Input
              value={duration}
              type="number"
              id="duration"
              placeholder='Duracion'
              onChange={(e) => setDuration(Number.isNaN(e.target.value) ? 0 : Number(e.target.value))}
            />
          </div>
        </div>
        <div className="mt-6">
          <RadioGroup
            value={topic}
            onValueChange={setTopic}
            className="flex flex-row gap-6"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="tomi" id="tomi" />
              <Label htmlFor="tomi">Tomi</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="rochi" id="rochi" />
              <Label htmlFor="rochi">Rochi</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="mt-6 flex-col gap-2">
        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </CardFooter>
    </form>
  </Card>
};

export default MessageForm;

