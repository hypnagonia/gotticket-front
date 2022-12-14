import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { EventDetails} from './gotticket/EventDetails'
import { EventList} from './gotticket/EventList'
import { EventCreate} from './gotticket/EventCreate'
import { CreateTicket } from './gotticket/CreateTicket'
import { QRScanner } from './gotticket/QRScanner'
import { QRChecker } from './gotticket/QRChecker'
import { SendTicketsBatch } from './gotticket/SendTicketsBatch'

export function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <EventList />
        </Route>

        <Route exact path="/event/create">
          <EventCreate />
        </Route>

        <Route exact path="/event/:eventId/ticket/create">
          <CreateTicket />
        </Route>

        <Route exact path="/event/:id">
          <EventDetails />
        </Route>

        <Route exact path="/scanner">
          <QRScanner />
        </Route>

        <Route exact path="/scanner/:id">
          <QRChecker />
        </Route>

        <Route exact path="/ticket/:id/sendBatch">
          <SendTicketsBatch />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}
