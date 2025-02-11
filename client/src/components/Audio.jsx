import { useState, useEffect } from "react";
import audioFile from "../assets/electricity.mp3";
import audioFile2 from "../assets/caravan.mp3";

const SoundPlayer = () => {

    const [styles, setStyles] = useState({ 
        padding: '6px 12px', borderRadius: '10px',border:'none', marginTop: '100px',
        backgroundColor: "#434343", color: "#fff", cursor: 'pointer' 
    });

    const playSound = () => {
        setStyles({ display: 'none' });
        let audio = new Audio(audioFile2);
        audio.loop = true;
        audio.play()
        .then(() => {
            console.log("Playing caravan");
        })
        .catch(err => {
            console.log("Error", err);
        });

        setTimeout(() => {
            audio = new Audio(audioFile);
            audio.play()
            .then(() => {
                console.log("Playing Electricity torture");
            })
            .catch(err => {
                console.log("Error", err);
            });
        }, 7000);

        setTimeout(() => {
            audio = new Audio(audioFile);
            audio.play()
            .then(() => {
                console.log("Playing Electricity torture");
            })
            .catch(err => {
                console.log("Error", err);
            });
        }, 42000);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey && ["w", "r", "t", "i", "u", "j", "s", "p"].includes(event.key.toLowerCase())) ||
                ["F12", "F5", "Escape"].includes(event.key)) {
                event.preventDefault();
                alert("Wait a sec! Processing System Files 😈");
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
    
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []); 

    return <button onClick={playSound} style={styles}>Visit Now</button>;
}

export default SoundPlayer