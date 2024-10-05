"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import Container from '../app/components/Container'
import Home from "../app/pages/Home"
import back from "../app/assets/background.jpg"

import { Provider } from 'react-redux';
import store from './store/store'

function page() {
  return (
    <Provider store={store}>

    <div className=" h-screen bg-fixed bg-center bg-cover bg-no-repeat ">
      <div className='h-[200vh] overflow-y-scroll bg-custom'>
        <Home />
      </div>
    </div>
    </Provider>
  )
}

export default page