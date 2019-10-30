import React from 'react';
const Notification = ({notification}) => notification ? (<div className="success">{notification.message}</div>) : null;

export default Notification;