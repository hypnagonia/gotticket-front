import React from 'react';

const url = process.env.REACT_APP_BACKEND_URL
console.log({url})


const f = (u: string) => {
    return fetch(u).then( r=> r.json())
}

export const getEvents = () => f(`${url}/events`);
export const getEventByID = (id: number) => f(`${url}/events/${id}`);

export {};
