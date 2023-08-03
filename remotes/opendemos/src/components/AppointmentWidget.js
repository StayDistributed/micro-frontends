import React from "react";

const AppointmentWidget = ({ payload }) => {
    const appointment = payload?.appointment || {};
    return (
        <div style={{padding: 10, background: "#fff"}}>
            <h2>Remote Widget</h2>
            <p>time_no_tz: {appointment.time_no_tz}</p>
            <div style={{height: 50, overflow: 'scroll', background: '#eee'}}>
                {Object.keys(appointment).map(k => <div key={k}>{k}</div>)}
            </div>
        </div>
    );
}

export default AppointmentWidget;