import React, { Component } from "react";
import { Routes, Route, Outlet } from 'react-router-dom';
import HomeComponent from "./routes/home/home.component";
import './App.css';

const App = () => {

  return  (
    <Routes>
      <Route path='/' element={<HomeComponent />}>
        <Route path='redirect' element={<HomeComponent />} />
        <Route index element={<HomeComponent />} />
        {/* <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} /> */}
      </Route>     
    </Routes>
  );
}

export default App;
