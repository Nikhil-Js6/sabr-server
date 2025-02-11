import { LeftOutlined, PauseCircleOutlined, PlayCircleOutlined, RightOutlined } from '@ant-design/icons'
import '../styles/card.css'

const Card = ({ fade, note, isPaused, setIsPaused, handlePrev, handleNext }) => {
    return (
        <div className='container'>
            <div className={`card ${fade ? 'fade-in' : 'fade-out'}`}>
                <p>{note}</p>
            </div>
            <div className="controls">
                <span onClick={handlePrev} className='slideButton'>
                    <LeftOutlined className='icon'/>
                </span>
                <span className='slideButton' onClick={() => setIsPaused(prev => !prev)}>
                    {isPaused ? <PlayCircleOutlined className='play'/> : <PauseCircleOutlined className='pause'/>}
                </span>
                <span onClick={handleNext} className='slideButton'>
                    <RightOutlined className='icon'/>
                </span>
            </div>
        </div>
    )
}

export default Card