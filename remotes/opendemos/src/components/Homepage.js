import React, { useState, useEffect } from "react";

const Homepage = ({ eventEmitter, homepage }) => {
    const [locale, setLocale] = useState(eventEmitter.get('locale'));
    const [user, setUser] = useState(eventEmitter.get('user'));
    const [venue, setVenue] = useState(eventEmitter.get('venue'));

    useEffect(() => {
        const listeners = [
            eventEmitter.listen('storage', event => {
                switch (event.key) {
                    case 'locale':
                        setLocale(event.value);
                        break;
                    case 'user':
                        setUser(event.value);
                        break;
                    case 'venue':
                        setVenue(event.value);
                        break;
                }
            })
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
