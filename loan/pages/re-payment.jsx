import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Repayment from "@/components/Repayment";
import { useEffect, useState } from 'react';
import useStateContext from '@/context/ContextProvider';






const repayment = () => {

    const { handle_get_app_settings, selected_loan } = useStateContext();
    const [app_settings, set_app_settings] = useState(null);

    useEffect(() => {
        handle_get_app_settings(set_app_settings);
    }, [])


    return (
        <div className={`bg-white ${styles.container}`} >
            <Head>
                <title>Re-Payment Link</title>
                <meta name="description" content={`${app_settings && app_settings.app_name} - Re-Payment Link`} />
                <link rel="icon" href="/images/icon_logo.png" />
            </Head>
            <Repayment app_settings={{ ...app_settings, ...selected_loan }} />
        </div>
    )
}




export default repayment



