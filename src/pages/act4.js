import { useEffect, useState } from "react";
import styles from "../styles/act4.module.css"; // Importar estilos
import { particle, login, deviceId } from "../shared/particle"; // Lógica compartida de Particle

export default function Act4() {
  const [temp, setTemp] = useState(null);
  const [hum, setHum] = useState(null);

   // metodo para hacer la peticion a la api de particle, enviamos el token como argumento en el header
  useEffect(() => {
    const fetchData = async () => {
      // Verificar si tenemos un token válido
      try {
        const token = await login();
        // Si tenemos un token, pedimos los valores de temperatura y humedad
        const tempResponse = await particle.getVariable({
          deviceId: deviceId,
          name: "temp",
          auth: token,
        });
        const humResponse = await particle.getVariable({
          deviceId: deviceId,
          name: "hum",
          auth: token,
        });
        // Actualizar los estados con los valores obtenidos de la API
        setTemp(tempResponse.body.result);
        setHum(humResponse.body.result);
      } catch (error) {
        // Mostrar el error en caso de que haya ocurrido un error al pedir los datos
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Estructura HTML para mostrar los valores de temperatura y humedad en la interfaz
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
