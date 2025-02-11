import { useState } from 'react'
import SoundPlayer from '../components/Audio';
import styles from '../styles/App.module.css'

const Error = () => {

    const [view, setView] = useState(true);
    const [style, setStyle] = useState({ cursor: 'progress'});
    const [color, setColor] = useState(true);
    const [message, setMessage] = useState("Nope baby nope, device not allowed! Message has already been sent to the intended user");
 
    color && setTimeout(() => {
        setColor(false)
        setMessage("Unauthorized Access!")
        setTimeout(() => {
            setMessage("Malware Installation Started!")
        }, 3000);
    }, 7000);
    
    setTimeout(() => {
        setInterval(() => {
            setView(!view)
        }, 1500);
        setMessage("Access Denied!")
    }, 9000);

    setTimeout(() => {
        setMessage("Malware Installed Successfully!")
        setStyle({ cursor: 'wait' })
    }, 13000);

    return (
        <div className={styles.error} style={style}>
            <SoundPlayer />
            { view &&
                <span className={color ? `${styles.access} ${styles.message}` : `${styles.access} ${styles.warning}`}>
                    { message }
                </span>
            }
        </div>
    )
}

export default Error