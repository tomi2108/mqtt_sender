import type { VercelRequest, VercelResponse } from '@vercel/node';
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
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const data = req.body as Message;
    const client = getMqttClient();

    client.publish(data.topic, encodeMessage(data));

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}
