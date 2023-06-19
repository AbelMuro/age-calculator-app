import {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import styles from '../../styles/EnterDates/Input.module.css';

const Input = forwardRef(({label, placeholder, errorMessage, clearParentError}, ref) => {
    const [date, setDate] = useState('');
    const inputRef = useRef();
    const labelRef = useRef();
    const emptyMessageRef = useRef();
    const invalidDateErrorRef = useRef();

    const displayError = (error) => {
        inputRef.current.style.border = '1px solid #FF5959';
        labelRef.current.style.color = '#FF5959'

        if(error)
            error.current.style.display = 'block';
    }

    const clearError = () => {
        inputRef.current.style.border = '';
        labelRef.current.style.color = '';
        emptyMessageRef.current.style.display = '';
        invalidDateErrorRef.current.style.display = '';
    }

    const handleChange = (e) => {
        e.target.setCustomValidity('');                 //removing the custom error
        clearParentError();
        clearError();
        setDate(e.target.value);
    }   

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();

        if(!isValid)
            displayError(emptyMessageRef);
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');                        //removing the default popup
        const isEmpty = e.target.validity.valueMissing;

        if(isEmpty)
            displayError(emptyMessageRef);   
    }

    useImperativeHandle(ref, () => ({
        get state() {
            return date;
        },
        get displayInvalidDateError() {
            displayError(invalidDateErrorRef);
        },
        get clearInvalidDateError() {
            clearError()
        },
        get displayRedBorder() {
            displayError();
        }
    }))

    return(
        <fieldset className={styles.container}>
            <label htmlFor={label} className={styles.label} ref={labelRef}>
                {label}
            </label>
            <input 
                id={label}
                type='number'
                placeholder={placeholder}
                value={date} 
                onChange={handleChange}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                className={styles.input}
                ref={inputRef}
                required
            />    
            <div className={styles.errorMessage} ref={invalidDateErrorRef}>
                {errorMessage}
            </div>      
            <div className={styles.errorMessage} ref={emptyMessageRef}>
                This field is required
            </div>  
        </fieldset>
    )
})

export default Input;