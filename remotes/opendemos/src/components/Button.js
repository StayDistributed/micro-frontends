import React, { useState, useEffect } from "react";

const Button = ({ eventEmitter }) => {
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        const listeners = [
            eventEmitter.listen('storage', event => {
                if (event.key === 'venue') {
                    setVenue(event.value)
                }
            }),
        ]
        return () => {
            listeners.forEach(unsubscribe => {
                unsubscribe()
            });
        }
    }, []);

    return (
        <button onClick={() => alert('Hello ' + venue.name)}>Hello World!</button>
    );
}

export default Button;
