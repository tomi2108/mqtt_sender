import type { Buffer } from 'node:buffer';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { getMqttClient } from './mqtt.js';

type Message = {
  message: string;
  topic: string;
  duration: number;
};

function encodeMessage({ message, duration }: Message) {
  const encoder = new TextEncoder();
  const messageBytes = encoder.encode(message);
  const buffer = new Uint8Array(
    4 + messageBytes.length + (duration ? 4 : 0),
  );
  const view = new DataView(buffer.buffer);

  view.setUint32(0, messageBytes.length, true);
  buffer.set(messageBytes, 4);

  if (duration) {
    view.setUint32(4 + messageBytes.length, duration, true);
  }

  return buffer as Buffer;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end();
    return;
  }

  try {
    let body = '';

    for await (const chunk of req) {
      body += chunk.toString();
    }

    const data: Message = JSON.parse(body);

    const client = getMqttClient();

    client.publish(data.topic, encodeMessage(data));

    res.writeHead(200);
    res.end();
  } catch {
    res.writeHead(400);
    res.end();
  }
}
