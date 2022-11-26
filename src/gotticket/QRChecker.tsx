import React, { useEffect, useState }  from "react";
import { Add } from 'grommet-icons';
import { Box, DataTable, Text, Spinner, Tip, Card, CardHeader, CardFooter, Button, CardBody, Meter} from "grommet";
import * as Icons from 'grommet-icons';
import {getEvents, checkTransaction} from 'src/api/api'

import {useHistory} from "react-router-dom";

import { useHtml5QrCodeScanner, useAvailableDevices } from 'react-html5-qrcode-reader';
import { QrReader } from 'react-qr-reader';

const html5QrCodeScannerFile = process.env.PUBLIC_URL + '/html5-qrcode.min.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";


export function QRChecker(props: any) {
const [data, setData] = useState('No result');
const {id}: any = useParams();

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await checkTransaction(id);
            console.log(response)
            if (response.id) {
              setData(response.number);
            }

        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
}, []);

 return (
   <>
    {data}
   </>
 );
}
