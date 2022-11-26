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
  FileInput
} from "grommet";
import {getVenues, createEvent} from 'src/api/api'
import {useHistory} from "react-router-dom";

import { Box, Calendar, Drop, Keyboard, TextInput } from 'grommet';

// Yes, these are for the odd but conventional U.S. way of representing dates.
const MONTHS = ['[2-9]', '0[1-9]', '1[0-2]'];
const DAYS = ['[4-9]', '0[1-9]', '[1-2][0-9]', '3[0-1]'];
const MONTH_REGEXP = new RegExp(MONTHS.map(m => `^${m}$`).join('|'));
const MONTH_DAY_REGEXP =
  new RegExp(DAYS.map(d => MONTHS.map(m => `^${m}/${d}$`).join('|')).join('|'));
const MONTH_DAY_YEAR_REGEXP = new RegExp('^(\\d{1,2})/(\\d{1,2})/(\\d{4})$');


export function EventCreate(props: any) {
  const [venues, setVenue] = useState([{name: '', address: '', id: -1}]);
  const history = useHistory();

  const submitForm = async (formData: any) => {

    const image = await new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(formData.image[0]);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });

    const venue = venues.find((v) => v.name + ' - ' + v.address === formData.venue)!.id
    const data = {
      markdown: 'none',
      // @ts-ignore
      company: 1,
      ...formData,
      image,
      venue
    }

    try {
    const res = await createEvent(data)
    console.log({res})
    if (res && res.id) {
      history.push(`/event/${res.id}`)
    }
  } catch(err) {
    console.error(err)
  }
  }

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await getVenues();
              console.log(response)
              setVenue(response);
          } catch (error) {
              console.log("error", error);
          }
      };

      fetchData();
  }, []);

  return (
    <>
      <h2>Create New Event</h2>
<Box style={{ overflow: "auto", background: 'white', marginTop: 0, maxWidth: 600}} pad='medium'>
  <Form onSubmit={({ value }) => submitForm(value)}>
  <FormField name="name" label="Name" required={true} />
  <FormField
    label="Venue"
    name="venue"
    component={Select}
    options={venues.map(v => v.name + ' - ' + v.address)}
  />

  <FormField name="image" label="Image" component={FileInput} required={true}/>


  <FormField name="description" label="Description" required={true} />

  <FormField name="eventDate" label="Date" component={DateInput} required={true}/>
<Box align='center' pad='small' style={{marginTop: 20}}>
  <Button type="submit" label="Add" primary={true} />
  </Box>
</Form>
</Box>
    </>
  );
}
