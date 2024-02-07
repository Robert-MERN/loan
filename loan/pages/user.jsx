import React from 'react'
import Head from 'next/head'
import User from '@/components/User'
import { useEffect, useState } from 'react';
import useStateContext from '@/context/ContextProvider';

const user = () => {
  const { handle_get_app_settings, set_footer_tab } = useStateContext();
  const [app_settings, set_app_settings] = useState(null);

  useEffect(() => {
    set_footer_tab("/user")
    handle_get_app_settings(set_app_settings)
  }, [])

  return (
    <div>
      <Head>
        <title>{app_settings && app_settings.app_name} - My Loans</title>
        <meta name="description" content={`${app_settings && app_settings.app_name} - My Loans`} />
        <link rel="icon" href="/images/icon_logo.png" />
      </Head>
      <User app_settings={app_settings} />
    </div>
  )
}

export default user








