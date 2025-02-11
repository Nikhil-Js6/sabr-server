import { useEffect, useState } from 'react';
import { CheckCircleOutlined, LeftOutlined, PauseCircleOutlined, RightOutlined } from '@ant-design/icons';
import Alert from './Alert';
import FireworksEffect from './FireworkEffects';
import '../styles/card.css';

const SubmitForm = ({ handlePrev, currentIndex }) => {
    const [response, setResponse] = useState('');
    const [state, setState] = useState(false);
    const [text, setText] = useState("I'm talking for long, now it's you. Wanna say something? I'd love to hear anything from you");
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const [color, setColor] = useState('#ccc');
    let colorIndex = 0;

    const colors = [
        '#1775e7', '#ff5733', '#ff914d', '#ffbf69', '#33ffbd', '#33ccff',
        '#3388ff', '#ff33a6', '#ff6699', '#ff2a00', '#00ff88'
    ];

    const getRandomDelay = () => Math.floor(Math.random() * (9000 - 1000 + 1)) + 2000;

    useEffect(() => {
        const interval = setInterval(() => {
            colorIndex = (colorIndex + 1) % colors.length;
            setColor(colors[colorIndex]);
        }, getRandomDelay());

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const textInterval = setInterval(() => {
            if (response.length > 1) {
                const nextText = {
                    "Are you still Writing? Never mind the longer it is, the better": "Oh you're writing, I'm so excited to know whatever you write",
                    "Oh you're writing, I'm so excited to know what you gotta write": "Are you liking the dynamic colors effect? if not I've got others for you too!"
                }[text] || "Oh you're writing, I'm so excited to know whatever you write";

                setText(nextText);
            } 
            else {
                setText("Why aren't you writing yet. I'm still waiting🥱");
            }
        }, 5000);

        return () => clearInterval(textInterval);
    }, [response.length, text]);

    const handleSubmit = async e => {
        e.preventDefault();
        setState(true);
        setTitle(<span>Success! <CheckCircleOutlined /></span>);
        setDesc('Response sent! Thank you for your precious response & time.');

        setTimeout(() => {
            setTitle("Congrats!");
            setDesc("Here we go my love!");
        }, 3000);

        setTimeout(() => {
            setState(false);
            setSubmitted(true);
        }, 6000);
    };

    return (
        <div className="formWrapper">
        { submitted ? <FireworksEffect/> : 
        <>
            { state 
                ? <Alert title={title} desc={desc} /> 
                : <>
                <form className="form">
                    <span className="text">{text}</span>
                    <textarea
                        className="textarea"
                        placeholder="Start Typing..."
                        value={response}
                        style={{
                            borderTop: `1.3px ${response ? 'solid' : 'dashed'} ${color}`,
                            borderBottom: `1.3px ${response ? 'solid' : 'dashed'} ${color}`,
                            color: `${color}`,
                            transition: 'border 0.3s ease'
                        }}
                        onChange={e => setResponse(e.target.value)}
                    />
                </form>

                <div className="formControls">
                    <span onClick={handlePrev} className="slideButton">
                        <LeftOutlined />
                    </span>
                    {currentIndex < 6 ? (
                        <span className="slideButton">
                            <PauseCircleOutlined />
                        </span>
                    ) : (
                        response?.trim().length > 0 && (
                            <button className="button" onClick={handleSubmit}>
                                Send Response <RightOutlined />
                            </button>
                        )
                    )}
                </div>
            </>
            }
        </>
        }
        </div>
    );
};

export default SubmitForm;