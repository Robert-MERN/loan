import React from 'react'
import Head from 'next/head'
import Admin from '@/components/Admin'
import { useEffect, useState } from 'react';
import useStateContext from '@/context/ContextProvider';

const admin = () => {
    const { handle_get_app_settings } = useStateContext();
    const [app_settings, set_app_settings] = useState(null);

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

export default admin








