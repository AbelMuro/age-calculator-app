import {useState, useEffect} from 'react';
import styles from '../../styles/DisplayDate/AnimateNumber.module.css';

export default function DisplayNumber({number}) {
    const [num, setNum] = useState('- -');

    useEffect(() => {
        if(!Number(number)) return;
        let initializeToZero = true;

        const interval = setInterval(() => {
            setNum((prevNum) => {
                if(initializeToZero){
                    initializeToZero = false;
                    return 0;
                }
                    
                if(prevNum >= Number(number)){
                    clearInterval(interval);
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