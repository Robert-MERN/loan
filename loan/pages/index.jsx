import React from 'react'
import HomePage from '@/components/Home_page'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import useStateContext from '@/context/ContextProvider';
import styles from "@/styles/Home.module.css";
import { getCookie } from "cookies-next"

const index = () => {
    const { handle_get_app_settings, set_footer_tab } = useStateContext();
    const [app_settings, set_app_settings] = useState(null);

    useEffect(() => {
        set_footer_tab("/")
        handle_get_app_settings(set_app_settings)
    }, [])

    return (
        <div className={`bg-emerald-400  ${styles.scrollBar}`} >
            <Head>
                <title>Home - {app_settings && app_settings.app_name}</title>
                <meta name="description" content={`${app_settings && app_settings.app_name} - `} />
                <link rel="icon" href="/images/icon_logo.png" />
            </Head>
            <HomePage app_settings={app_settings} />
        </div>
    )
}

export default index


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