import '../styles/card.css'

const Alert = ({ title, desc, id }) => {
    return (
        <div className='alert'>
            <span className='title'>{title}</span>
            <span className='desc'>{desc}</span>
        </div>
    )
}

export default Alert