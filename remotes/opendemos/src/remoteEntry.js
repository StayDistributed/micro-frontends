import React from "react";
import { createRoot } from "react-dom/client";
import Button from "./components/Button";
import Homepage from "./components/Homepage";

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
        namespace: 'remote.homepage.header.widgets.$.opendemos',
        order: 10,
        render: ({ eventEmitter, homepage, rootNode }) => {
            createRoot(rootNode).render(<Button eventEmitter={eventEmitter} homepage={homepage} />);
        }
    })
}
