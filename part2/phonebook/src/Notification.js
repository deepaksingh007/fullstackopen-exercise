import React from 'react';
const Notification = ({notification}) => notification ? (<div className={notification.type}>{notification.message}</div>) : null;

export default Notification;