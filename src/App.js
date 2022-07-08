import React, { Component } from "react";
import { Routes, Route, Outlet } from 'react-router-dom';
import HomeComponent from "./routes/home/home.component";
import './App.css';
import MyLibraryComponent from "./routes/MyLibrary/my-library.component";

const App = () => {

  return  (
    <Routes>
      <Route path='/' element={<HomeComponent />}>
        <Route path='redirect' element={<HomeComponent />} />
        <Route index element={<HomeComponent />} />
        <Route path='my-library' element={<MyLibraryComponent />}/>
      </Route>     
    </Routes>
  );
}

export default App;
