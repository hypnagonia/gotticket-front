import {getEventByID, getAllTickets} from 'src/api/api'
import React, { useEffect, useState }  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Box, DataTable, Text, Spinner, Tip, Card,
Table,
TableBody,
TableCell,
TableRow,
  CardHeader, CardFooter, Button, CardBody, Meter} from "grommet";
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

  const eventData = event ? [
    {a:'When', b:event.eventDate},
        {a:'Venue', b:event.venue.name},
        {a:'Address', b:event.venue.address},
        {a:'Description',b: event.description},
        {a:'Promoter', b:event.company.name}
  ] : null

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
      {event ? <h2 style={{textTransform: 'capitalize'}}><b>{event!.name}</b> at&nbsp;
      <b>{event.venue.name} {event.venue.address}</b></h2> : null}
<>
{eventData ? <>
<Box style={{ overflow: "auto", background: 'white'}} pad='medium'>

<Table style={{maxWidth: 600, fontSize: 16}}>
    <TableBody>
        {eventData && eventData.map(datum => <TableRow>
          <TableCell>{datum.a}</TableCell>
          <TableCell style={{textTransform: 'capitalize'}}><b>{datum.b}</b></TableCell>
        </TableRow>)}
    </TableBody>
  </Table>
</Box>
<br/>
  </>: null}
</>
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
