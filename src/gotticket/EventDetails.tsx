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
import {BaseContainer} from './ui/BaseContainer'

export const ticketColumns = [
  {
    property: 'name',
    header: 'Name'
  },
  {
    property: 'count',
    header: 'Count',
  },
  {
    property: 'name',
    header: '',
    render: (ticket: any) => {
      return (
      <Link to={`/ticket/${ticket.id}/sendBatch`}>Send Tickets By Email</Link>
      )
    }
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
    <BaseContainer pad="0">
      <h2>Event {id}</h2>
      ({JSON.stringify(event)})

      <Box style={{ overflow: "auto", background: 'white'}} pad='medium'>
      {
        <>
        {eventId && <Box align="start" pad="0">
            <Button primary label="New Ticket Type" onClick={() => {history.push(`/event/${eventId}/ticket/create`)}} {...props} />
      </Box>}
              {tickets.length ? <><h2>Ticket Types</h2>
              <DataTable
              className={"g-table-header"}
              style={{ width: "100%", minWidth: "620px" }}
              border={{
                header: {
                  color: "brand",
                },
                body: {
                  color: "border",
                  side: "top",
                  size: "1px",
                },
              }}
              alignSelf="start" columns={ticketColumns} data={tickets} />
              </> : null}
        </>
      }
  </Box>
    </BaseContainer>
  );
}
