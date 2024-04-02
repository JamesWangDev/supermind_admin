import Btn from '../../Elements/Buttons/Btn';

const CloseDateRange = ({ setDate, setIsComponentVisible }) => {
    return (
        <div className='calender-btn-group'>
            <Btn className='calender-button' onClick={() => { setDate([{ startDate: '', endDate: '', key: 'selection' }]); setIsComponentVisible(false) }}>Clear</Btn>
            <Btn className='close-button' onClick={() => setIsComponentVisible(false)}>Close</Btn>
        </div>
    )
}

export default CloseDateRange