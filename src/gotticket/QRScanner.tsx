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
  ['Ticket Number', ticket.number],
  ['Ticket Status', <Box pad='small'
  style={{color: 'white', background: ticket.status==='issued' ? 'lightgreen' : 'lightred'}}>{ticket.status}</Box>],
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
     <p></p>
   </>
 );
}

/*
export function QRScanner(props: any) {


  const [isScanned, setIsScanned] = useState(false);
  const history = useHistory();

  const { Html5QrcodeScanner } = useHtml5QrCodeScanner(
    html5QrCodeScannerFile
  );
  const { devices, error } = useAvailableDevices(
    html5QrCodeScannerFile
  );

  useEffect(() => {
    if (Html5QrcodeScanner) {
      // Creates anew instance of `HtmlQrcodeScanner` and renders the block.
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: {width: 600, height: 600} }, false);

      html5QrcodeScanner.render(
        async (data: any) => {
          if (isScanned) {
            return
          }
          const res = await checkTransaction(data)

          if (res && res.id) {
            alert(`Found Ticket N${data}`)
          }
          setIsScanned(true)
          console.log({res})
        }
        // (err: any) => console.log('err ->', err)
      );
    }
  }, [Html5QrcodeScanner]);


  return (
    <Box style={{height: '100%'}}>
        <h2>QR Scanner</h2>

        <div id="reader" style={{width: '100%', height: '100%'}}></div>

    </Box>
  );

}
*/
