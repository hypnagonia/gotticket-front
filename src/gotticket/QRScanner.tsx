import React, { useEffect, useState }  from "react";
import { Add } from 'grommet-icons';
import { Box, DataTable, Text, Spinner, Tip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Card, CardHeader, CardFooter, Button, CardBody, Meter} from "grommet";
import * as Icons from 'grommet-icons';
import {getEvents, checkTransaction, useTicket, getEventByID} from 'src/api/api'
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";

import { useHtml5QrCodeScanner, useAvailableDevices } from 'react-html5-qrcode-reader';
import { QrReader } from 'react-qr-reader';

const html5QrCodeScannerFile = process.env.PUBLIC_URL + '/html5-qrcode.min.js';

let isMobile = true
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  isMobile = true
}else{
  isMobile = false
}

type stateOptions = 'scanning' | 'scanned' | 'ready'


// todo ticket counter
export function QRScanner(props: any) {
const [state, setState] = useState('ready' as stateOptions);

const defaultEventState = {}
const defaultTicketState = {}

const [ticket, setTicket] = useState(defaultTicketState as any);
const [event, setEvent] = useState(defaultEventState as any);

const getTicket = async (ticketNumber: string) => {
  const res = await checkTransaction(ticketNumber)

  if (res && res.id) {
    //@ts-ignore
    console.log({res})
    const e = await getEventByID(res.ticket.eventId)
    setTicket(res)
    setEvent(e)

    setState('scanned');
  }
}

const ticketDetails = event.id && ticket.id ?
[
  ['Event', event.name + ' ' + event.venue.name + ', ' + event.venue.address],
  ['Date', event.eventDate],
  ['Number', ticket.number],
  ['Type', ticket.ticket.name],
  ['Status', <Box pad='small'
  style={{color: 'white', background: ticket.status==='issued' ? 'lightgreen' : 'red'}}>{ticket.status}</Box>],
] : null

const useTicketCallBack = async () => {
  //@ts-ignore
  const res = await useTicket(ticket.id)
  if (res && res.id) {
    alert(`Ticket ${ticket.number} has been used!`)
    setState('ready');
  }
}

 return (
   <>
   {state === 'ready' && <>
   <Box align='center'>
      <Box align='center' style={{fontSize: 30, fontWeight: 'bold',
      width: '100%', height: '100%', color: 'white', background: 'lightblue', paddingTop: 100, paddingBottom: 100}}
      pad='medium' onClick={() => setState('scanning')}>
      Scan QR
      </Box>
     </Box>
   </>}

   {state === 'scanned' && <>
   {ticketDetails && <>
     <Box style={{ overflow: "auto", background: 'white'}} pad='medium'>

     <Table style={{maxWidth: 600, fontSize: 16}}>
         <TableBody>
             {ticketDetails.map(datum => <TableRow>
               <TableCell>{datum[0]}</TableCell>
               <TableCell style={{textTransform: 'capitalize'}}><b>{datum[1]}</b></TableCell>
             </TableRow>)}
         </TableBody>
       </Table>
     </Box>
      <br/>
      <br/>
     </>}


   <Box align='center'>

      {ticket.status === 'issued' && <><Box align='center' style={{fontSize: 30, fontWeight: 'bold',
      width: '100%', height: '100%', color: 'white', background: 'lightgreen', paddingTop: 100, paddingBottom: 100}}
      pad='medium' onClick={() => useTicketCallBack()}>
      Accept Ticket
      </Box>
      <br/><br/></>
      }

      <Box align='center' style={{fontSize: 30, fontWeight: 'bold',
      width: '100%', height: '100%', color: 'white', background: 'lightblue', paddingTop: 100, paddingBottom: 100}}
      pad='medium' onClick={() => setState('scanning')}>
      Scan QR
      </Box>

     </Box>

   </>}

   {(state === 'scanning') &&
     <QrReader
        constraints={isMobile ? {facingMode: { exact: "environment" }} : {}}
        onResult={async (result, error) => {
         if (!!result) {

           // @ts-ignore
           await getTicket(result.text)
         }

         if (!!error) {
           console.info(error);
         }
       }}

     />
   }

   </>
 );
}
