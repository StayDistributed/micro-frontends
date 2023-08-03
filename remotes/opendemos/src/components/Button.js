import React, { useCallback } from "react";

const Button = ({ eventEmitter, homepage }) => {
    const onClick = useCallback(() => {
        eventEmitter.publish('location', homepage);
    }, [eventEmitter, homepage]);

    return (
        <button onClick={onClick}>Open Demos!</button>
    );
}

export default Button;
