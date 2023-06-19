import '../styles/global/styles.css';
import {useState, createContext} from 'react';

export const DateContext = createContext();

export default function MyApp({Component, pageProps}){
    const [date, setDate] = useState('');

    const value= {date, setDate}

    return(
        <DateContext.Provider value={value}>
            <Component {...pageProps}/>            
        </DateContext.Provider>
    )
}