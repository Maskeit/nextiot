import { useEffect, useState } from "react";
import { particle, login, deviceId } from "@/shared/particle";
import styles from "@/styles/act6.module.css";

export default function Act6() {
  const [value, setValue] = useState(0);
  const [token, setToken] = useState(null); // Estado para almacenar el token
  const [tempValue, setTempValue] = useState(1); // Valor temporal mientras se mueve el slider

  // Efecto para hacer el login y obtener el valor inicial del TMS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await login();
        setToken(token); // Guardamos el token en el estado para usarlo en otras partes

        const response = await particle.getVariable({
          deviceId: deviceId,
          name: "TMS_Value",
          auth: token,
        });
        setValue(response.body.result); // Establecemos el valor inicial del TMS en el slider
        let sliderVal = (response.body.result)/5
        setTempValue(sliderVal.toFixed(1)); // También inicializamos el valor temporal
      } catch (e) {
        console.error("Error al obtener el estado del TMS:", e);
      }
    };

    fetchData();
  }, []);

  // Función para cambiar el valor del TMS y obtener el valor actualizado desde Particle
  const tmsChanger = async (state) => {
    try {
      if (token) {
        await particle.callFunction({
          deviceId: deviceId,
          name: "TMS_2",
          argument: state,
          auth: token,
        });

        // Hacemos una nueva petición para obtener el valor actualizado
        const response = await particle.getVariable({
          deviceId: deviceId,
          name: "TMS_Value",
          auth: token,
        });
        setValue(response.body.result); // Actualizamos el valor traído desde el dispositivo
      }
    } catch (err) {
      console.error("Error al cambiar el estado del TMS:", err);
    }
  };

  // Método para manejar el cambio del slider sin hacer la petición
  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setTempValue(newValue); // Actualizamos el valor temporal mientras se mueve el slider
  };

  // Método para enviar la petición cuando el usuario suelta el slider
  const handleSliderRelease = () => {
    tmsChanger(tempValue); // Llamamos a la función para cambiar el valor en Particle solo cuando se suelta el slider
  };

  return (
    <div className={styles.container}>
      <h1>Mueve el slider para cambiar el valor</h1>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="1"
          max="100"
          step="0.1" // Permitimos seleccionar valores decimales
          value={tempValue} // Establecemos el valor temporal del input al valor del estado
          onChange={handleSliderChange} // Usamos onChange para actualizar el valor temporal mientras se mueve
          onMouseUp={handleSliderRelease} // Usamos onMouseUp para hacer la petición cuando se suelta el slider
          onTouchEnd={handleSliderRelease} // Usamos onTouchEnd para manejarlo en dispositivos móviles
          className={styles.slider} // Aplicamos estilos personalizados
        />
      </div>

      <div className={styles.information}>
        <div className={styles.box_slider}>
          <span id="put-value" className={styles.valueDisplay}>
            {tempValue} {/* Mostramos el valor actual */}
          </span>
        </div>
        <div className={styles.box_result}>
          <span className={styles.valueDisplay}>
            El valor nuevo es: {value.toFixed(2)}{" "}
            {/* Mostramos el valor actualizado desde Particle */}
          </span>
        </div>
      </div>
    </div>
  );
}
