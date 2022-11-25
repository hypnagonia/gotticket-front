import React from 'react';

const url = process.env.REACT_APP_BACKEND_URL;
console.log({ url });

const f = (u: string) => {
  return fetch(u).then((r) => r.json());
};

const fp = (u: string, method = 'POST', data: any) => {
  return fetch(u, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: method,
    body: JSON.stringify(data),
  }).then((r) => r.json());
};

export const getEvents = () => f(`${url}/events`);
export const createEvent = (data: any) => fp(`${url}/events`, 'POST', data);
export const createTicket = (data: any) => fp(`${url}/tickets`, 'POST', data);
export const getEventByID = (id: number) => f(`${url}/events/${id}`);
export const getVenues = () => f(`${url}/venues`);

export {};
