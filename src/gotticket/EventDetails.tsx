import {getEventByID, getAllTickets} from 'src/api/api'
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
    render: (ticket: any) => {
      return (
      <b>{ticket.count}</b>
      )
    }
  },
  {
    property: 'issued',
    header: 'Issued',
    render: (ticket: any) => {
      return (
      <b>{ticket.issued}</b>
      )
    }
  },
  {
    property: 'used',
    header: 'Activated',
    render: (ticket: any) => {
      return (
      <b>{ticket.used}</b>
      )
    }
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
  const [event, setEvent] = useState(null as any);
  const {id}: any = useParams();
  const history = useHistory();

  // @ts-ignore
  const tickets = event ? event.tickets : []

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await getEventByID(id);

              for (const ticket of response.tickets) {
                const used = await getAllTickets(ticket.id)
                // @ts-ignore
                ticket.used = used.filter(u => u.status === 'used').length
                // @ts-ignore
                ticket.issued = used.filter(u => u.status === 'issued').length
              }

              setEvent(response);
          } catch (error) {
              console.log("error", error);
          }
      };

      fetchData();
  }, []);

///event/:eventId/ticket/create

  // @ts-ignore
  const eventId = event ? event.id : null
  return (
    <BaseContainer pad="0">
      <h2>Event <b>{event ? event!.name : id}</b></h2>
      ({JSON.stringify(event)})
      <br/><br/>

      {
        <>
        {eventId && <Box align="start" pad="0">
            <Button primary label="New Ticket Type" onClick={() => {history.push(`/event/${eventId}/ticket/create`)}} {...props} />
      </Box>}
              {tickets.length ? <><h2>Ticket Types</h2>
                <Box style={{ overflow: "auto", background: 'white'}} pad='medium'>
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
              </Box></> : null}
        </>
      }
    </BaseContainer>
  );
}
