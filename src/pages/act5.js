import { useEffect, useState} from "react";
import { particle, login } from "@/shared/particle";
import styles from "@/styles/act5.module.css"

export default function Act5() {
    const [ledState, setLedState] = useState(null);
    const [token, setToken] = useState(null);
    const deviceId = '0a10aced202194944a059ff8';
  
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
  
    const handleToggle = (event) => {
      const newState = event.target.open ? '1' : '0';
      toggleLed(newState);
    };
  
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