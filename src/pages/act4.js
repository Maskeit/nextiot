import { useEffect, useState } from "react";
import styles from "../styles/act4.module.css"; // Importar estilos
import { particle, login } from "../shared/particle"; // Lógica compartida de Particle

export default function Act4() {
  const [temp, setTemp] = useState(null);
  const [hum, setHum] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await login();
        const tempResponse = await particle.getVariable({
          deviceId: "0a10aced202194944a059ff8",
          name: "temp",
          auth: token,
        });
        const humResponse = await particle.getVariable({
          deviceId: "0a10aced202194944a059ff8",
          name: "hum",
          auth: token,
        });
        setTemp(tempResponse.body.result);
        setHum(humResponse.body.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Monitor de Temperatura y Humedad</h1>
      <div className={styles.information}>
        <div className={styles.temperature}>
          <p>Temperatura: {temp !== null ? `${temp} °C` : "Cargando..."}</p>
        </div>
        <div className={styles.humedad}>
          <p>Humedad: {hum !== null ? `${hum} %` : "Cargando..."}</p>
        </div>
      </div>
    </div>
  );
}
