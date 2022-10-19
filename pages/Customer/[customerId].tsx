import React, { useEffect } from 'react'
import Customers from "src/components/Customer"
import Head from 'next/head'
import { useDispatch } from "react-redux";
import { setPageCurrent } from "src/components/Book/book-slice";
import { useRouter } from 'next/router'
function Customer() {
    const router = useRouter()
    const customerId = router.query.customerId
    const dispatch = useDispatch();
    useEffect(()=>{  dispatch(setPageCurrent(""))},[])
  return (
    <>
     <Head>
        <title>Client Info</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
  
      
    <Customers customerId = {customerId}/>
    </>
  )
}

export default Customer