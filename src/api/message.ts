import type { Buffer } from 'node:buffer';
import { IncomingMessage, ServerResponse } from 'node:http';
import { getMqttClient } from '../server';

type Message = {
  message: string;
  topic: string;
  duration: number;
}

function encodeMessage({ message, duration }: Message) {
  const encoder = new TextEncoder();
  const messageBytes = encoder.encode(message);
  const buffer = new Uint8Array(4 + messageBytes.length + (duration ? 4 : 0));
  const view = new DataView(buffer.buffer);
  view.setUint32(0, messageBytes.length, true);
  buffer.set(messageBytes, 4);
  if (duration) view.setUint32(4 + messageBytes.length, duration, true);
  return buffer as Buffer
}

export async function POST(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const client = getMqttClient();
  let body = '';
  req.on('data', (chunk: Buffer) => body += chunk.toString());
  req.on('end', async () => {
    try {
      const data: Message = JSON.parse(body);
      res.writeHead(200);
      client.publish(data.topic, encodeMessage(data));
      res.end();
    } catch {
      res.writeHead(400);
      res.end();
    }
  });
}

