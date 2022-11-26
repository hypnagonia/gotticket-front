import React from 'react';

const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
console.log({url}, process.env.REACT_APP_BACKEND_URL )
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
export const sendTicketBatch = (data: any) => fp(`${url}/transactions/batch`, 'POST', data);
export const checkTransaction = (number: string) =>
  f(`${url}/transactions/${number}`);

export const useTicket = (transactionId: any) => fp(`${url}/transactions/${transactionId}/use`, 'PATCH', {});
export const getAllTickets = (ticketId: any) => f(`${url}/transactions/ticket/${ticketId}`);


export {};
