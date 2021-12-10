import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';

const CountdownTimer = (props) => {
    // State
    const [timerString, setTimerString] = useState('');

    // Our useEffect will run on component load
    useEffect(() => {
        console.log('Setting interval...');


        // Get the current date and dropDate in a JavaScript Date object
        const currentDate = new Date();
        const dropDate1 = new Date(props.goLiveData);

        // If currentDate is before dropDate, render our Countdown component
        if (currentDate < dropDate1) {

            console.log('Before drop date!');

            // Use setInterval to run this piece of code every second
            const interval = setInterval(() => {
                const currentDate = new Date().getTime();
                const distance = dropDate1 - currentDate;

                // Here it's as easy as doing some time math to get the different properties
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // We have our desired output, set it in state!
                setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

                // If our distance passes zero this means that it's drop time!
                if (distance < 0) {
                    console.log('Clearing interval...');
                    clearInterval(interval);
                }
            }, 1000);

            // Anytime our component unmounts let's clean up our interval
            return () => {
                if (interval) {
                    clearInterval(interval);
                }
            };


        }

        return null;

    }, []);


    return (
        <div className="timer-container">
            {timerString && <div><p className="timer-header">Candy Drop Starting In</p><p className="timer-value">{`⏰ ${timerString}`}</p></div>}
            {!timerString && <p className="timer-header">NFT DROP ALREADY STARTED</p>}
        </div>
    );
};

export default CountdownTimer;
