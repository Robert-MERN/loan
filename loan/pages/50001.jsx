import React from 'react'
import Head from 'next/head'
import Admin from '@/components/Admin'
import { useEffect, useState } from 'react';
import useStateContext from '@/context/ContextProvider';
import requestIp from 'request-ip';
import UAParser from 'ua-parser-js';



function cleanObject(obj) {
    const cleanedObj = {};
    for (const key in obj) {
        if (obj[key] === undefined) {
            cleanedObj[key] = null;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            cleanedObj[key] = cleanObject(obj[key]); // Recursively clean nested objects
        } else {
            cleanedObj[key] = obj[key];
        }
    }
    return cleanedObj;
}


const admin = ({ ip, userAgent }) => {
    const { handle_get_app_settings, handle_user_device_info } = useStateContext();
    const [app_settings, set_app_settings] = useState(null);
    useEffect(() => {
        if (ip && userAgent)
            handle_user_device_info({ ip_address: ip, device: userAgent });
    }, [])
    console.log(ip, userAgent);

    useEffect(() => {
        handle_get_app_settings(set_app_settings)
    }, [])
    return (
        <div>
            <Head>
                <title>{app_settings && app_settings.app_name} - 501 Error</title>
                <meta name="description" content={`${app_settings && app_settings.app_name} - 501 Error`} />
                <link rel="icon" href="/images/icon_logo.png" />
            </Head>
            <Admin app_settings={app_settings} />
        </div>
    )
}


export async function getServerSideProps(context) {
    // Extract the client's IP address from the request
    const clientIp = requestIp.getClientIp(context.req);

    // Extract the User-Agent from the request headers
    const userAgent = context.req.headers['user-agent'];
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();

    // Clean the uaResult object
    const cleanedUaResult = cleanObject(uaResult);

    // Pass the IP address to the component as a prop
    return {
        props: {
            ip: clientIp || null,
            userAgent: cleanedUaResult.ua || null,
        },
    };
}


export default admin








