import Head from 'next/head'
import React, { useEffect } from 'react'
import  Client from 'src/components/Client'
import { useDispatch } from "react-redux";
import { setPageCurrent } from "src/components/Book/book-slice";


function client() {
  const dispatch = useDispatch();
  useEffect(()=>{  dispatch(setPageCurrent(""))},[])
  return (
    <>
    <Head>
        <title>Client</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Client/>
    </>
  )
}

export default client