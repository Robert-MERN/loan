import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Repayment_tab from "@/components/Repayment_tab";
import { useEffect, useState } from 'react';
import useStateContext from '@/context/ContextProvider';
import { getCookie } from 'cookies-next';



export default function repayment_tab() {

    const { handle_get_app_settings } = useStateContext();
    const [app_settings, set_app_settings] = useState(null);

    useEffect(() => {
        handle_get_app_settings(set_app_settings)
    }, [])


    return (
        <div className={`bg-white ${styles.container}`} >
            <Head>
                <title>{app_settings && app_settings.app_name} - Repayment</title>
                <meta name="description" content={`${app_settings && app_settings.app_name} - Repayment`} />
                <link rel="icon" href="/images/icon_logo.png" />
            </Head>
            <Repayment_tab app_settings={app_settings} />
        </div>
    )
}


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



