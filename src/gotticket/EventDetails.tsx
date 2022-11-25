import {getEventByID} from 'src/api/api'
import React, { useEffect, useState }  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Box, DataTable, Text, Spinner, Tip, Card, CardHeader, CardFooter, Button, CardBody, Meter} from "grommet";
import {useHistory} from "react-router-dom";

export const ticketColumns = [
  {
    property: 'name',
    header: 'Name'
  },
  {
    property: 'count',
    header: 'Count',
  },
];

export function EventDetails(props: any) {
  const [event, setEvent] = useState(null);
  const {id}: any = useParams();
  const history = useHistory();

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await getEventByID(id);
              console.log(response)
              setEvent(response);
          } catch (error) {
              console.log("error", error);
          }
      };

      fetchData();
  }, []);

///event/:eventId/ticket/create
  // @ts-ignore
  const tickets = event ? event.tickets : []
  // @ts-ignore
  const eventId = event ? event.id : null
  return (
    <>
      <h2>Event {id}</h2>
      ({JSON.stringify(event)})

      <Box>
      {
        <>
        {eventId && <Box align="start" pad="0">
            <Button primary label="New Ticket Type" onClick={() => {history.push(`/event/${eventId}/ticket/create`)}} {...props} />
      </Box>}
              {tickets.length ? <><h2>Ticket Types</h2>
              <DataTable alignSelf="start" style={{height: '100%'}} columns={ticketColumns} data={tickets} />
              </> : null}
        </>
      }
  </Box>
    </>
  );
}
