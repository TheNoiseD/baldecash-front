"use client";
import React from 'react';
import NavComponent from './auth/__components/NavComponent';
import ContentComponent from './auth/__components/ContentComponent';
import TableComponent from './auth/__components/TableComponent';
import axios from './auth/Axios';
import { useState } from 'react';
import { useEffect } from 'react';

function Home({ userData }) {

    return (
        <>
           <NavComponent userData={userData} />
           <ContentComponent title='Usuarios'>
                <TableComponent userData={userData}  />
           </ContentComponent>
        </>
    );
}
export default Home;