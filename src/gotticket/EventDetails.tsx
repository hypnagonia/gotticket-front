import {getEventByID} from 'src/api/api'
import React, { useEffect, useState }  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export function EventDetails(props: any) {
  const [event, setEvent] = useState([]);
  const {id}: any = useParams();

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

  return (
    <>
      <h2>Event {id}</h2>
      ({JSON.stringify(event)})
    </>
  );
}
