import React, { useState, useEffect } from "react";

const Homepage = ({ eventEmitter, homepage }) => {
    const [locale, setLocale] = useState(null);
    const [user, setUser] = useState(null);
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        const listeners = [
            eventEmitter.subscribe('core.locale', setLocale),
            eventEmitter.subscribe('core.user', setUser),
            eventEmitter.subscribe('core.venue', setVenue),
        ]
        return () => {
            listeners.forEach(unsubscribe => {
                unsubscribe()
            });
        }
    }, []);

    return (
        <div>
            <h1>Hello, {venue?.name}</h1>
            <p>Logged user: {user?.email}</p>
            <p>Locale: {locale}</p>
            <p>Remote Homepage: {homepage}</p>
            <p>This is the homepage</p>
        </div>
    );
}

export default Homepage;
