import {useRef} from 'react';
import Input from './Input';
import styles from '../../styles/EnterDates/InputDates.module.css'
import months from '../../data/months';

//now i need to make a fetch request inside the on submit event handler

export default function InputDates() {
    const day = useRef();                       //refs will be used to access the state and other functions from the <Input/>'s
    const month = useRef();
    const year = useRef();
    const errorMessageRef = useRef();

    const clearParentError = () => {
        errorMessageRef.current.style.display = '';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let selectedDay = Number(day.current.state);
        let selectedMonth = Number(month.current.state);
        let selectedYear = Number(year.current.state);
        let invalidDate = false;
        const currentYear = new Date().getFullYear();

        if(selectedYear > currentYear || selectedYear < 0){
            year.current.displayInvalidDateError;
            invalidDate = true;
        }

        if(selectedMonth > 12 || selectedMonth <= 0) {
            month.current.displayInvalidDateError;
            invalidDate = true;
        }

        if(selectedDay > 31 || selectedDay <= 0){
            day.current.displayInvalidDateError;
            invalidDate = true;
        }

        if(invalidDate)
            return;
        else {
            day.current.clearInvalidDateError;
            month.current.clearInvalidDateError;
            year.current.clearInvalidDateError;            
        }

        
        if(months[selectedMonth - 1] <= selectedDay){
            errorMessageRef.current.style.display = 'block';
            day.current.displayRedBorder;
            month.current.displayRedBorder;
            year.current.displayRedBorder;
            return;
        }
            

        
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className={styles.container}>
                <Input 
                    label='DAY' 
                    placeholder='DD' 
                    errorMessage='Must be a valid day'
                    clearParentError={clearParentError}
                    ref={day}/>
                <Input 
                    label='MONTH' 
                    placeholder='MM' 
                    errorMessage='Must be a valid month'
                    clearParentError={clearParentError}
                    ref={month}/>
                <Input 
                    label='YEAR' 
                    placeholder='YYYY' 
                    errorMessage='Must be in the past'
                    clearParentError={clearParentError}
                    ref={year}/>
                <div className={styles.errorMessage} ref={errorMessageRef}>
                    Must be a valid date
                </div>
            </div>     
            <div className={styles.submitContainer}>
                <hr className={styles.horizontalLine}/>
                <button type='submit' value='' className={styles.submit}>
                    <img src={'/Icons/icon-arrow.svg'} className={styles.arrow}/>
                </button>
            </div>   
        </form>

    )
}