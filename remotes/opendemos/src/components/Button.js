import React, { useState, useEffect } from "react";

const Button = ({ eventEmitter }) => {
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        const listeners = [
            eventEmitter.subscribe('core.venue', setVenue),
        ]
        return () => {
            listeners.forEach(unsubscribe => {
                unsubscribe()
            });
        }
    }, []);

    return (
        <button onClick={() => alert('Hello ' + venue.name)}>Open Demos!</button>
    );
}

export default Button;
