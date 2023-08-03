import React from "react";
import { createRoot } from "react-dom/client";
import Button from "./components/Button";
import Homepage from "./components/Homepage";
import AppointmentWidget from "./components/AppointmentWidget";

export const registerRemote = (register) => {
    register({
        namespace: 'remote.homepage.$.opendemos',
        order: 10,
        render: ({ eventEmitter, homepage, rootNode }) => {
            createRoot(rootNode).render(<Homepage homepage={homepage} eventEmitter={eventEmitter} />);
        }
    });
    register({
        namespace: 'host.agenda.header.widgets',
        order: 10,
        render: ({ eventEmitter, homepage, rootNode }) => {
            createRoot(rootNode).render(<Button eventEmitter={eventEmitter} homepage={homepage} />);
        }
    })
    register({
        namespace: 'host.appointment-window.widgets',
        order: 10,
        render: ({ payload, rootNode }) => {
            createRoot(rootNode).render(<AppointmentWidget payload={payload} />);
        }
    })
}
