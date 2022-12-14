import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import User from 'src/components/User'
import { Title } from 'src/components/common'
import Layout from 'src/components/Layout'

const UserPage: NextPage = () => {
  const { t } = useTranslation()
   // Fetch the user client-side
  //  const { user } = useUser({ redirectTo: '/login' })

   // Server-render loading state
  //  if (!user || user.isLoggedIn === false) {
  //    return <Layout>Loading...</Layout>
  //  }
  return (
    <div>
      <Title>{t('user.title')}</Title>
      <User />
    </div>
  )
}
export default UserPage
