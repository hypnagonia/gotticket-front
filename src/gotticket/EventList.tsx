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
    header: <Text>#</Text>,
    primary: true,
  },
  {
    property: 'name',
    header: 'Event Name',
    // todo 
    render: (e :any) => {
      return <>
      <Grid
      style={{height:50}}
      rows={['xxsmall', 'xxsmall']}
      columns={['xxsmall', 'xxsmall']}
      >
      {typeof e.image === 'string' && e.image.includes('data') &&
        <Box style={{height: 50, width:50, marginTop:5}}>
        <img src={e.image}/></Box>}
        <Box style={{marginTop: 15, marginLeft: 25, maxWidth: 10}}>
      <Link to={`/event/${e.id}`}>{e.name}</Link>
      </Box>
      </Grid>
      </>
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
    render: (d: any) => (
      <Box pad={{ vertical: 'xsmall' }}>
        {new Date(d.eventDate).toLocaleDateString('en-US')}
      </Box>
    ),
  },
  {
    property: 'image',
    header: 'Tickets',
    render: (d: any) => (
      <Box pad={{ vertical: 'xsmall' }}><b>
        {
          //@ts-ignore
        d.tickets &&  d.tickets.reduce((acc, b)=> acc + b.count, 0)}
        </b>
      </Box>
    ),
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
              // @ts-ignore
              setEvents(response.sort((a,b)=>b.id-a.id));
          } catch (error) {
              console.log("error", error);
          }
      };

      fetchData();
  }, []);


  return (
    <Box>
        <h2>Events</h2>

        <Box align="start" pad="0">

        <Grid
        style={{height:70}}
rows={['xxsmall', 'xxsmall']}
columns={['small', 'small']}
gap="small"
>
<Button primary label="Scanner" onClick={() => {history.push('/scanner')}} {...props} />
<Button primary label="New Event" onClick={() => {history.push('/event/create')}} {...props} />
</Grid>

            </Box>
<Box style={{ overflow: "auto", background: 'white', marginTop: 0}} pad='medium'>
          <DataTable style={{height: '100%', marginTop: 0}} columns={columns} data={events} />
</Box>
    </Box>
  );
}
