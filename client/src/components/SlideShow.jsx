import { useState, useEffect } from "react"
import Card from "./Card"
import notes from "./Notes"
import axios from 'axios'
import SubmitForm from "./SubmitForm";
import audioFile from "../assets/caravan.mp3"

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
  "/img6.jpg",
  "/img3.jpg"
];

const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [fade, setFade] = useState(true);
    const [isPlaying, setPlaying] = useState(false);

    useEffect(() => {
        if (isPaused) return; // Stop auto-slide when paused

        const interval = setInterval(() => {
            if (currentIndex === notes.length - 1) {
                clearInterval(interval);
            }
            else {
                setFade(false);
                setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
                updateUserProgress(currentIndex + 1);
                setFade(true);
                }, 1000);
            }  
        }, 5000);
            
        return () => clearInterval(interval);
        
    }, [currentIndex, isPaused]);

    const updateUserProgress = async (slideIndex) => {
        const userId = localStorage.getItem("userId");
        try {
            await axios.post(`${process.env.REACT_APP_API}/update-progress`, { userId, slideIndex });
        }
        catch (err) {
            console.error("Error updating user progress", err);
        }
    };

    const handlePrev = () => {
        setFade(false);
        setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + notes.length) % notes.length);
        setFade(true);
        }, 500);
    };

    const handleNext = () => {
        playSound();
        setFade(false);
        setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notes.length);
        setFade(true);
        }, 500);
    };

    const backgroundImage = `url(${images[currentIndex]})`;

    const containerStyle = {
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.75,
        width: "100vw",
        height: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-image 1s ease-in-out",
    };
    
    const playSound = () => {
        let audio = new Audio(audioFile);

        if (!isPlaying) {
            audio.play()
            .then(() => {
                console.log("Playing caravan");
                audio.volume = .5;
            })
            .catch(err => {
                console.log("Error", err);
            });
            setPlaying(true);
        }
    }

    return (
        <div style={containerStyle}>
        { currentIndex < 6 ? 
            <Card
                fade={fade}
                note={notes[currentIndex]}
                isPaused={isPaused}
                setIsPaused={setIsPaused}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handle
            />
            : <SubmitForm 
                handlePrev={handlePrev}
                handleNext={handleNext}
                currentIndex={currentIndex}
            />
        }
        </div>
    );
};

export default Slideshow;
