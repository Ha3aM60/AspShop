import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './env/components/containers/default/DefaultLayout';
import CategoryListPage from './env/components/category/list/CategoryListPage';
import CategoryCreatePage from './env/components/category/create/CategoryCreatePage';
import RegisterPage from './env/components/Auth/RegisterPage';
import LoginPage from './env/components/Auth/Login/LoginPage';
import HomePage from './env/components/home/HomePage';
import AdminLayout from './env/components/containers/admin/container/AdminLayout';
import AdminHomePage from './env/components/containers/admin/home/AdminHomePage';
import ForbiddenPage from './env/components/containers/admin/pages/ForbiddenPage';
import ProductListPage from './env/components/containers/admin/products/list/ProductListPage';
import ProductCreatePage from './env/components/containers/admin/products/create/ProductCreatePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/Auth/register" element={<RegisterPage />} />
          <Route path="/Auth/login" element={<LoginPage />} />
        </Route>

        <Route path={"/pages"}>
          <Route path={"403"} element={<ForbiddenPage />} />
        </Route>

        <Route path={"/admin"} element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path={"categories"}>
            <Route index element={<CategoryListPage />} />
            <Route path="categories/create" element={<CategoryCreatePage />} />
          </Route>
          <Route path={"products"}>
            <Route index element={<ProductListPage />} />
            <Route path='create' element={<ProductCreatePage/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
