import React, { useEffect, useState }  from "react";
import { Add } from 'grommet-icons';
import { Grid, Box, DataTable, Text, Spinner, Tip, Card, CardHeader, CardFooter, Button, CardBody, Meter} from "grommet";
import * as Icons from 'grommet-icons';
import {getEvents} from 'src/api/api'
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";


const columns = [
  {
    property: 'id',
    header: <Text>ID</Text>,
    primary: true,
  },
  {
    property: 'name',
    header: 'Name',
    render: (e :any) => {
      return <>  <Link to={`/event/${e.id}`}>{e.name}</Link></>
    }
  },
  {
    property: 'venue',
    header: 'Venue',
    render: (e :any) => {
      return <>{e && e.venue && e.venue.name}</>
    }
  },
  {
    property: 'eventDate',
    header: 'Date',
  },
  {
    property: 'image',
    header: '',
    render: (d: any) => (
      <Box pad={{ vertical: 'xsmall' }}>
      </Box>
    ),
  },
];


export function EventList(props: any) {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await getEvents();
              console.log(response)
              setEvents(response);
          } catch (error) {
              console.log("error", error);
          }
      };

      fetchData();
  }, []);


  return (
    <>
        <h2>Event List</h2>

        <Box align="start" pad="0">

        <Grid
rows={['xxsmall', 'xxsmall']}
columns={['small', 'small']}
gap="small"
areas={[
{ name: 'header', start: [0, 0], end: [1, 0] },
{ name: 'nav', start: [0, 1], end: [0, 1] },
{ name: 'main', start: [1, 1], end: [1, 1] },
]}
>
<Button primary label="Scanner" onClick={() => {history.push('/scanner')}} {...props} />
<Button primary label="New Event" onClick={() => {history.push('/event/create')}} {...props} />
</Grid>

            </Box>

          <DataTable style={{height: '100%'}} columns={columns} data={events} />

    </>
  );
}
