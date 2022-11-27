import React from 'react';
import { toaster } from "../App";

const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

console.log({ url });

const showToaster = (data: any) => {
  toaster.show({
    message: typeof data === 'string' ? data : JSON.stringify(data)
  })

  return data
}

const toJson = async (r: any) => {
  const parsed = await r.json()

  if (r.status >= 400) {
      showToaster(parsed)
  }

  return parsed
}

const OKToast = (data: any) => {
  showToaster('OK')
  return data
}

const f = (u: string) => {
  return fetch(u).then(toJson).catch(showToaster);
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
const fp = (u: string, method = 'POST', data: any) => {
  return fetch(u, {
    headers,
    method: method,
    body: JSON.stringify(data),
  }).then(toJson).catch(showToaster);
};



export const getEvents = () => f(`${url}/events`);
export const createEvent = (data: any) => fp(`${url}/events`, 'POST', data).then(OKToast);
export const createTicket = (data: any) => fp(`${url}/tickets`, 'POST', data).then(OKToast);
export const getEventByID = (id: number) => f(`${url}/events/${id}`);
export const getVenues = () => f(`${url}/venues`);
export const sendTicketBatch = (data: any) => fp(`${url}/transactions/batch`, 'POST', data);
export const checkTransaction = (number: string) =>
  f(`${url}/transactions/${number}`);

export const useTicket = (transactionId: any) => fp(`${url}/transactions/${transactionId}/use`, 'PATCH', {});
export const getAllTickets = (ticketId: any) => f(`${url}/transactions/ticket/${ticketId}`);


export {};
