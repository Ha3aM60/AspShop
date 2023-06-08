import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './env/components/containers/default/DefaultLayout';
import CategoryListPage from './env/components/category/list/CategoryListPage';
import CategoryCreatePage from './env/components/category/create/CategoryCreatePage';
import RegisterPage from './env/components/Auth/RegisterPage';
import LoginPage from './env/components/Auth/Login/LoginPage';

function App() {
  return (
    <>
       <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<CategoryListPage/>} />
          <Route path ="categories/create" element={<CategoryCreatePage/>}/>
          <Route path ="/Auth/register" element={<RegisterPage/>}/>
          <Route path ="/Auth/login" element={<LoginPage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
