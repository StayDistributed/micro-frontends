import React, { useState, useEffect } from "react";

const Button = ({ eventEmitter, homepage }) => {
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        const listeners = [
            eventEmitter.listen('storage', event => {
                if (event.key === 'venue') {
                    setVenue(event.value)
                }
            }),
            eventEmitter.listen('unmount', event => {
                console.log('Button - unmounted', event);
            })
        ]
        return () => {
            listeners.forEach(unsubscribe => {
                unsubscribe()
            });
        }
    }, []);

    return (
        <button onClick={() => eventEmitter.emit('location', homepage)}>Hello World!</button>
    );
}

export default Button;
