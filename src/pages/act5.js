import { useEffect, useState} from "react";
import { particle, login, deviceId} from "@/shared/particle";
import styles from "@/styles/act5.module.css"

export default function Act5() {
    const [ledState, setLedState] = useState(null); // creamos un estado para el Led, indica si estara encedido o apagado
    const [token, setToken] = useState(null); // creamos un estado para el token, esto ayuda a verficar si se tiene o no
    
    // metodo para hacer la peticion a la api de particle, enviamos el token como argumento en el header
    useEffect(() => { 
      const fetchData = async () => {
        try {
          const token = await login();
          setToken(token);
          getLedState(token);
        } catch (error) {
          console.error('Error al iniciar la app:', error);
        }
      };
  
      fetchData();
    }, []);
    
    // Metodo para obtener el estado del Led
    const getLedState = async (token) => {
      try {
        const response = await particle.getVariable({
          deviceId: deviceId,
          name: 'ledState',
          auth: token,
        });
        setLedState(response.body.result);
      } catch (err) {
        console.log('Error al obtener el estado del LED:', err);
      }
    };
  
    // recibe el nuevo estado del Boton y hace una solicitud a la API para llamra el metodo que cambia el Led en el dispositivo fisico.
    const toggleLed = async (newState) => {
      try {
        await particle.callFunction({
          deviceId: deviceId,
          name: 'LED',
          argument: newState,
          auth: token,
        });
        setLedState(newState);
      } catch (err) {
        console.error('Error al cambiar el estado del LED:', err);
      }
    };
    // metodo para alternar el estado del LED cuando hacemos click en el boton summary
    // Manejo del estado entre 1 High y 0 Low
    const handleToggle = (event) => {
      const newState = event.target.open ? '1' : '0';
      toggleLed(newState);
    };
    
    // estructura HTML para mostrar los elementos en la interfaz
    return (
      <div className={styles.container}>
        <h1>Cambia el estado del LED</h1>
        <div className={styles.switch}>
          <details className="details" id="switch-buttom" open={ledState === '1'} onToggle={handleToggle}>
            <summary className="summary"></summary>
          </details>
          <output id="estado">{ledState !== null ? ledState : 'Cargando...'}</output>
        </div>
      </div>
    );
  }