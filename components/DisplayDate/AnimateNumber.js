import {useState, useEffect, useRef} from 'react';
import styles from '../../styles/DisplayDate/AnimateNumber.module.css';

export default function DisplayNumber({number}) {
    const [num, setNum] = useState('- -');
    const interval = useRef();


    useEffect(() => {
        if(interval.current)
            clearInterval(interval.current);
        setNum(0);
    }, [number])

    useEffect(() => {
        if(!Number(number)) return;

        interval.current = setInterval(() => {
            setNum((prevNum) => {           
                if(prevNum >= Number(number)){
                    clearInterval(interval.current);
                    return prevNum;
                } 
                else
                    return prevNum + 1;
            })
        }, 30)

    }, [number])

    return(
        <span className={styles.number}>
            {num}
        </span>
    )
}