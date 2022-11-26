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
  TextArea,
  // TextInput
} from "grommet";
import {getVenues, createTicket} from 'src/api/api'
import {useHistory} from "react-router-dom";

import { Box, Calendar, Drop, Keyboard, TextInput } from 'grommet';

// Yes, these are for the odd but conventional U.S. way of representing dates.
const MONTHS = ['[2-9]', '0[1-9]', '1[0-2]'];
const DAYS = ['[4-9]', '0[1-9]', '[1-2][0-9]', '3[0-1]'];
const MONTH_REGEXP = new RegExp(MONTHS.map(m => `^${m}$`).join('|'));
const MONTH_DAY_REGEXP =
  new RegExp(DAYS.map(d => MONTHS.map(m => `^${m}/${d}$`).join('|')).join('|'));
const MONTH_DAY_YEAR_REGEXP = new RegExp('^(\\d{1,2})/(\\d{1,2})/(\\d{4})$');


export function CreateTicket(props: any) {
  const history = useHistory();
  const {eventId}: any = useParams();

  const submitForm = async (formData: any) => {

    const data = {
      ...formData,
      eventId: eventId
    }

    try {
    const res = await createTicket(data)

    if (res && res.id) {
      history.push(`/event/${eventId}`)
    }
  } catch(err) {
    console.error(err)
  }
  }

  return (
    <>
      <h2>Create Ticket Type</h2>
<Box style={{ overflow: "auto", background: 'white', marginTop: 0, maxWidth: 600}} pad='medium'>
  <Form onSubmit={({ value }) => submitForm(value)}>
  <FormField name="name" label="Name" required={true} />

  <FormField name="count" label="Number of tickets" required={true} />
<Box align='center' pad='small' style={{marginTop: 20}}>
  <Button type="submit" label="Add" primary={true} />
  </Box>
</Form>
</Box>
    </>
  );
}
