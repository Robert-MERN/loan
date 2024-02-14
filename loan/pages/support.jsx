import React from 'react'
import Head from 'next/head'
import Support from '@/components/Support'
import { useEffect, useState } from 'react';
import useStateContext from '@/context/ContextProvider';
import { getCookie } from 'cookies-next';

const support = () => {
    const { handle_get_app_settings } = useStateContext();
    const [app_settings, set_app_settings] = useState(null);

    useEffect(() => {
        handle_get_app_settings(set_app_settings)
    }, [])
    return (
        <div>
            <Head>
                <title>{app_settings && app_settings.app_name} - Support</title>
                <meta name="description" content={`${app_settings && app_settings.app_name} - Support`} />
                <link rel="icon" href="/images/icon_logo.png" />
            </Head>
            <Support app_settings={app_settings} />
        </div>
    )
}

export default support


export const getServerSideProps = async function ({ req, res }) {
    const user = getCookie("user_account", { req, res });
    if (!user) {
        return {
            redirect: {
                destination: '/login?redirect_url=' + req.url,
                permanent: true,
            },
        }
    }
    return { props: { message: "logged in!" } }
}








