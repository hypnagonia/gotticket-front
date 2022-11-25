import React, { useEffect, useState }  from "react";
import { Add } from 'grommet-icons';
import { Box, DataTable, Text, Spinner, Tip, Card, CardHeader, CardFooter, Button, CardBody, Meter} from "grommet";
import * as Icons from 'grommet-icons';
import {getEvents} from 'src/api/api'
import { Link } from "react-router-dom";

/*

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public image: string;

  @Column()
  public description: string;

  @Column()
  public markdown: string;

  @Column({ type: 'timestamptz' })
  eventDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Company, (company) => company.events)
  company: Company;

  @ManyToOne(() => Venue, (venue) => venue.events)
  venue: Venue;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}

*/

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
            <Button primary label="New Event" onClick={() => {}} {...props} />
      </Box>

          <DataTable style={{height: '100%'}} columns={columns} data={events} />

    </>
  );
}
