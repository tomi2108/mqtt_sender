import mqtt, { MqttClient } from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

let mqttInstance: MqttClient | null = null;

export function getMqttClient() {
  if (!mqttInstance) {
    mqttInstance = mqtt.connect(
      `wss://${process.env.MQTT_HOST}:8884/mqtt`,
      {
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD,
        clientId: 'webuser',
      },
    );
  }

  return mqttInstance;
}
