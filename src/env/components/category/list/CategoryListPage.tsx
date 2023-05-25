
import { useEffect, useState } from "react";
import http from "../../../../http";
import { ICategoryItem } from "./types";
import { APP_ENV } from "../../..";
import { Link } from "react-router-dom";

const CategoryListPage = () => {
  const [list, setList] = useState<ICategoryItem[]>([]);

  useEffect(() => {
    http.get("api/Categories/list")
        .then(resp => {
            const data= resp.data;
            setList(data);
        });
  }, []);
  
  const mapList = list.map(category => (
    <tr key={category.id}>
        <td>
        <img src={`${APP_ENV.BASE_URL}images/${category.image}`} alt="фото" width={50}/></td>
        <td>{category.name}</td>
        <td>{category.parentId}</td>
        <td>{category.description}</td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-center">Category List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Parent</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
            {mapList}
        </tbody>
      </table>
    </>
  );
};
export default CategoryListPage;