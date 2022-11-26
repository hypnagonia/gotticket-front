import {getEventByID} from 'src/api/api'
import React, { useEffect, useState, Component }  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import {
  Button,
  CheckBox,
  Form,
  FormField,
  RadioButtonGroup,
  Select,
  DateInput,
  TextArea
} from "grommet";
import {getVenues, sendTicketBatch} from 'src/api/api'
import {useHistory} from "react-router-dom";

import { Box, Calendar, Drop, Keyboard, TextInput } from 'grommet';

// Yes, these are for the odd but conventional U.S. way of representing dates.
const MONTHS = ['[2-9]', '0[1-9]', '1[0-2]'];
const DAYS = ['[4-9]', '0[1-9]', '[1-2][0-9]', '3[0-1]'];
const MONTH_REGEXP = new RegExp(MONTHS.map(m => `^${m}$`).join('|'));
const MONTH_DAY_REGEXP =
  new RegExp(DAYS.map(d => MONTHS.map(m => `^${m}/${d}$`).join('|')).join('|'));
const MONTH_DAY_YEAR_REGEXP = new RegExp('^(\\d{1,2})/(\\d{1,2})/(\\d{4})$');


export function SendTicketsBatch(props: any) {
  const history = useHistory();
  // ticketId
  const {id}: any = useParams();

  const submitForm = async (formData: any) => {

    console.log({formData})

    const emails = formData.emails.split(' ')

    const data = {
      emails,
      ticket: id
    }

    try {
    const res = await sendTicketBatch(data)

    // @ts-ignore
    if (res && res.id || res.length) {
      history.push(`/`)
    }
  } catch(err) {
    console.error(err)
  }
  }

  return (
    <>
      <h2>Send Ticket By Emails</h2>

  <Form onSubmit={({ value }) => submitForm(value)}>

  <FormField name="emails" label="Emails (space separated)" required={true} component={TextArea}/>

  <Button type="submit" label="Send" primary={true} />
</Form>
    </>
  );
}
