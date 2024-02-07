import React from 'react'
import Head from 'next/head'
import Borrow from '@/components/Borrow'
import { useEffect, useState } from 'react';
import useStateContext from '@/context/ContextProvider';

const borrow = () => {
    const { handle_get_app_settings } = useStateContext();
    const [app_settings, set_app_settings] = useState(null);

    useEffect(() => {
        handle_get_app_settings(set_app_settings)
    }, [])

    return (
        <div>
            <Head>
                <title>{app_settings && app_settings.app_name} - Borrow</title>
                <meta name="description" content={`${app_settings && app_settings.app_name} - Borrow`} />
                <link rel="icon" href="/images/icon_logo.png" />
            </Head>
            <Borrow app_settings={app_settings} />
        </div>
    )
}

export default borrow








