import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './env/components/containers/default/DefaultLayout';
import CategoryListPage from './env/components/category/list/CategoryListPage';
import CategoryCreatePage from './env/components/category/create/CategoryCreatePage';

function App() {
  return (
    <>
       <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<CategoryListPage/>} />
          <Route path ="categories/create" element={<CategoryCreatePage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
