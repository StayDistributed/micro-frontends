import React from "react";
import { createRoot } from "react-dom/client";
import Homepage from "./src/components/Homepage";
import { createEventEmitter, createStore } from "./src/store";
import remoteMetadata from './package.json';
import Button from "./src/components/Button";
import AppointmentWidget from "./src/components/AppointmentWidget";

// This file is for local development,
// It injects the Remote component providing a mocked version of the store
console.info('%cDevelopment version of ' + remoteMetadata.name + '@' + remoteMetadata.version, "color: blue; font-family:sans-serif; font-size: 20px");
console.info('%cSee doc: https://github.com/StayDistributed/micro-frontends', "color: blue; font-family:sans-serif; font-size: 14px");

const store = createStore({
    "core.user": { email: "email@sample.com" },
    "core.venue": { name: "Open Demo Venue" },
    "core.locale": "en",
});
const eventEmitter = createEventEmitter(store);

const LocalApp = () => {
    return (
        <div>
            <Button eventEmitter={eventEmitter} />
            <hr />
            <AppointmentWidget />
            <hr />
            <Homepage eventEmitter={eventEmitter} />
        </div>
    );
}

createRoot(document.getElementById("root")).render(<LocalApp />);

