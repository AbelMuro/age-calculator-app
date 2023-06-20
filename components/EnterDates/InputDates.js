import {useRef, useContext} from 'react';
import { DateContext } from '../../pages/_app';
import useMediaQuery from '../../hooks/useMediaQuery';
import Input from './Input';
import styles from '../../styles/EnterDates/InputDates.module.css'
import months from '../../data/months';


export default function InputDates() {
    const {setDate} = useContext(DateContext);
    const mobile = useMediaQuery('(max-width: 642px)');
    const day = useRef();                                           //these refs will be used to access the state and other functions from the <Input/>'s
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

        clearParentError();                                             //removing error message

        if(selectedYear > currentYear || selectedYear < 0){             //displaying error message in child component if true
            year.current.displayInvalidDateError;
            invalidDate = true;
        }

        if(selectedMonth > 12 || selectedMonth <= 0) {                  //displaying error message in child component if true
            month.current.displayInvalidDateError;
            invalidDate = true;
        }

        if(selectedDay > 31 || selectedDay <= 0){                       //displaying error message in child component if true
            day.current.displayInvalidDateError;
            invalidDate = true;
        }

        if(invalidDate)                                                 //if any of the above conditions are true, then we will return
            return;
        else {
            day.current.clearInvalidDateError;
            month.current.clearInvalidDateError;
            year.current.clearInvalidDateError;            
        }

        if(months[selectedMonth - 1] < selectedDay){                    //checking to see if the date is valid
            errorMessageRef.current.style.display = 'block';
            day.current.displayRedBorder;
            month.current.displayRedBorder;
            year.current.displayRedBorder;
            return;
        }

        const selectedDate = [selectedYear, selectedMonth, selectedDay];
        setDate(selectedDate);

    }

    return(
        <form onSubmit={handleSubmit}>
            <div className={styles.container}>
                <Input 
                    label='DAY' 
                    placeholder='DD'
                    errorMessage={mobile ? 'Not valid day' : 'Must be a valid day'}
                    clearParentError={clearParentError}                                         //child component will use callback to clear the error message in parent component
                    mobile={mobile}
                    ref={day}/>
                <Input 
                    label='MONTH' 
                    placeholder='MM' 
                    errorMessage={mobile ? 'Not valid month' : 'Must be a valid month'}
                    clearParentError={clearParentError}                                         //child component will use callback to clear the error message in parent component
                    mobile={mobile}
                    ref={month}/>
                <Input 
                    label='YEAR' 
                    placeholder='YYYY' 
                    errorMessage={mobile ? 'Is not in past' : 'Must be in the past'}
                    clearParentError={clearParentError}                                         //child component will use callback to clear the error message in parent component
                    mobile={mobile}
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