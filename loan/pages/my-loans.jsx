import React from 'react'
import Head from 'next/head'
import My_loans from '@/components/My_loans'
import { useEffect, useState } from 'react';
import useStateContext from '@/context/ContextProvider';
import styles from "@/styles/Home.module.css";
import { getCookie } from 'cookies-next';

const my_loan = () => {
    const { handle_get_app_settings, set_footer_tab } = useStateContext();
    const [app_settings, set_app_settings] = useState(null);

    useEffect(() => {
        set_footer_tab("/my-loans")
        handle_get_app_settings(set_app_settings)
    }, []);
    return (
        <div className={`${styles.scrollBar}`} >
            <Head>
                <title>{app_settings && app_settings.app_name} - My Loans</title>
                <meta name="description" content={`${app_settings && app_settings.app_name} - My Loans`} />
                <link rel="icon" href="/images/icon_logo.png" />
            </Head>
            <My_loans app_settings={app_settings} />
        </div>
    )
}

export default my_loan

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








