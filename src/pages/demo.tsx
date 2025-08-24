import  { useEffect, useState } from 'react'
const Demo = () => {
    const [timer, setTimer] = useState(1);
    const [flag, setFlag] = useState(-1);

    useEffect(() => {

        if (flag == 1)
            return;
      
        if (flag == 4) {
            setTimer(1)

        }
        setTimeout(() => {
            setTimer(timer + 1)
        }, 1000)


    }, [timer])
    const handleStop = () => {
        setFlag(1)
    }
    const handleReset = () => {
        setFlag(4)
        handleStop();
        setTimer(1)
    }
    const handleRestart = () => {
       
        setFlag(3);
        setTimer(timer+1);
    }
    const handleResume = () => {
        setFlag(-1)
        setTimer(timer+1)
    }

    return (
        <div>
            Hii
            {timer}
            <br />
            <div className='flex gap-2'>
                <button onClick={handleStop} className='bg-red-400'>Stop</button>
                <button onClick={handleResume} className='bg-green-400'>Resume</button>

                <button onClick={handleReset} className='bg-blue-400'>Reset</button>
                <button onClick={handleRestart} className='bg-yellow-400'>Restart</button>
            </div>

        </div>
    )
}

export default Demo
