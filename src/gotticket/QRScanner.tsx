import React, { useEffect, useState }  from "react";
import { Add } from 'grommet-icons';
import { Box, DataTable, Text, Spinner, Tip, Card, CardHeader, CardFooter, Button, CardBody, Meter} from "grommet";
import * as Icons from 'grommet-icons';
import {getEvents, checkTransaction} from 'src/api/api'
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";

import { useHtml5QrCodeScanner, useAvailableDevices } from 'react-html5-qrcode-reader';

const html5QrCodeScannerFile = process.env.PUBLIC_URL + '/html5-qrcode.min.js';

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
        { fps: 10, qrbox: {width: 600, height: 600} },
        /* verbose= */ false);

      html5QrcodeScanner.render(
        async (data: any) => {
          if (isScanned) {
            return
          }
          console.log('success ->', data)

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
