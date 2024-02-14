import React from 'react'
import Head from 'next/head'
import Borrow_history from '@/components/Borrow_history'
import { useEffect, useState } from 'react';
import useStateContext from '@/context/ContextProvider';
import styles from "@/styles/Home.module.css";
import { getCookie } from 'cookies-next';

const borrow = () => {
    const { handle_get_app_settings } = useStateContext();
    const [app_settings, set_app_settings] = useState(null);

    useEffect(() => {
        handle_get_app_settings(set_app_settings)
    }, [])

    return (
        <div className={`${styles.scrollBar}`} >
            <Head>
                <title>{app_settings && app_settings.app_name} - Borrow History</title>
                <meta name="description" content={`${app_settings && app_settings.app_name} - Borrow History`} />
                <link rel="icon" href="/images/icon_logo.png" />
            </Head>
            <Borrow_history app_settings={app_settings} />
        </div>
    )
}

export default borrow


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







