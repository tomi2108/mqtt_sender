import mqtt, { MqttClient } from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

let mqttInstance: MqttClient | null = null;

export function getMqttClient(): Promise<MqttClient> {
  if (mqttInstance?.connected)
    return Promise.resolve(mqttInstance);

  return new Promise((resolve, reject) => {
    const client = mqtt.connect(
      `wss://${process.env.MQTT_HOST}:8884/mqtt`,
      {
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD,
        clientId: `webuser-${Date.now()}`,
      },
    );

    client.once('connect', () => {
      console.log('MQTT connected');
      mqttInstance = client;
      resolve(client);
    });

    client.once('error', (error) => {
      console.error('MQTT error:', error);
      reject(error);
    });
  });
}
