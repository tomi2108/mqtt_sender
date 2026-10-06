import mqtt, { MqttClient } from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

let mqttInstance: MqttClient | null = null;

export function getMqttClient() {
  console.log("Connecting")
  console.log(process.env.MQTT_HOST)
  console.log(process.env.MQTT_USER)
  console.log(process.env.MQTT_PASSWORD)
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
