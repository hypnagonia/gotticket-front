import React, { useEffect, useState }  from "react";
import { Add } from 'grommet-icons';
import { Box, DataTable, Text, Spinner, Tip, Card, CardHeader, CardFooter, Button, CardBody, Meter} from "grommet";
import * as Icons from 'grommet-icons';
import {getEvents, checkTransaction, useTicket} from 'src/api/api'
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
const [ticket, setTicket] = useState({
} as any);

const getTicket = async (ticketNumber: string) => {
  const res = await checkTransaction(ticketNumber)
  if (res && res.id) {
    setTicket(res)
    setState('scanned');
  }

}

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
   <Box align='center' pad='medium' style={{height: 200}}>
     <Button size='large' label="Scan QR" primary={true} onClick={() => setState('scanning')}/>
     </Box>
   </>}

   {state === 'scanned' && <>
   <Box align='center' pad='medium' style={{height: 200}}>
      {JSON.stringify(ticket)}
      <Button size='large'  label="Use Ticket" primary onClick={() => useTicketCallBack()}/>
      <br/><br/>
     <Button size='large' label="Scan QR" primary={true} onClick={() => setState('scanning')}/>

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
