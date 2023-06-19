import {useContext, useEffect, useState} from 'react';
import { DateContext } from '../../pages/_app';
import AnimateNumber from './AnimateNumber';
import styles from '../../styles/DisplayDate/ConvertDate.module.css';
import months from '../../data/months';

export default function ConvertDate() {
    const {date} = useContext(DateContext);
    const [year, setYear] = useState('- -');
    const [month, setMonth] = useState('- -');
    const [day, setDay] = useState('- -');

    useEffect

    useEffect(() => {
        if(!date) return;

        const currentDate = new Date();
        let userAgeInYears, userAgeInMonths, userAgeInDays;

        const birthYear = Number(date[0]);
        const birthMonth = Number(date[1]);
        const birthDay = Number(date[2]);

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();


        if(currentMonth > birthMonth) {          //we assume that the current date has passed the birthday for the current year
            userAgeInYears = currentYear - birthYear;
            userAgeInDays = currentDay - birthDay;
            userAgeInMonths = currentMonth - birthMonth;         
            userAgeInMonths = userAgeInDays < 0 ? userAgeInMonths - 1 : userAgeInMonths; 
            userAgeInDays = userAgeInDays < 0 ? months[currentMonth - 2] - Math.abs(userAgeInDays) : userAgeInDays;

        }
        else if(currentMonth < birthMonth) {                                      //we assume that the current date has NOT passed the birthday for the current year
            userAgeInYears = currentYear - birthYear - 1;
            userAgeInDays = currentDay - birthDay;
            userAgeInMonths = 12 - (birthMonth - currentMonth);
            userAgeInMonths = userAgeInDays < 0 ? userAgeInMonths - 1 : userAgeInMonths;
            userAgeInDays = userAgeInDays < 0 ? months[currentMonth - 2] - Math.abs(userAgeInDays) : userAgeInDays;
        }
        else {
            userAgeInDays = currentDay - birthDay;            
            userAgeInYears = userAgeInDays < 0 ? currentYear - birthYear - 1 : currentYear - birthYear;

            userAgeInMonths = userAgeInDays < 0 ? 11 : 0;
            userAgeInDays = userAgeInDays < 0 ? months[currentMonth - 2] - Math.abs(userAgeInDays) : userAgeInDays;
        }


        setYear(userAgeInYears);
        setMonth(userAgeInMonths);
        setDay(userAgeInDays);
        
    }, [date])


    return(
        <>
            <div className={styles.years}>
                <AnimateNumber number={year}/>
                years
            </div>
            <div className={styles.months}>
                <AnimateNumber number={month}/>
                months
            </div>
            <div className={styles.days}>
                <AnimateNumber number={day}/>
                days
            </div>
        </>
    )
}