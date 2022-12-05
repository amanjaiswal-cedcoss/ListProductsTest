import React, { useEffect, useRef, useState } from "react";
import { data } from "../data";
import style from "./Dropdown.module.css";
import Select from "./Select";

const Dropdown = () => {
  const refProdCat = useRef("No data");
  const refSelCat1 = useRef("No data");
  const refSelCat2 = useRef("No data");
  const refSelCat3 = useRef("No data");
  const [productCategory, setProductCategory] = useState([]);
  const [category_1, setCategory_1] = useState([]);
  const [category_2, setCategory_2] = useState([]);
  const [category_3, setCategory_3] = useState([]);
  const [result, setResult] = useState({});

  //  function to return items according to given conditions array
  const getCategories = (conditions,categoryName) => {
    let category=[];
    data.forEach((item) => {
      if(item[categoryName]!==undefined && item[categoryName]!==""){
      let conditionCount=true;
      conditions.forEach(element=>{if(item[element.isCompared]!==element.toBeCompared){conditionCount=false;}})
      if(conditionCount){
        category.push(item[categoryName])
      }
    }
    });
    category = [...new Set(category)];
    if(category.length===0){
      category="No data"
    }
    return category
  };

  // for rendering primary_category values on first render
  useEffect(() => {
    let category=getCategories([],"primary_category");
    setProductCategory(category);
  }, []);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("result", JSON.stringify(result));
  }, [result]);
  
  // function to set conditions for getting values of key category_1
  const getSubCategories = () => {
    let conditions=[{isCompared: "primary_category",toBeCompared: refProdCat.current.value,}]
    let category=getCategories(conditions,"category_1")
    setCategory_1(category);
    setCategory_2([]);
    setCategory_3([]);
  };

  // function to set conditions for getting values of key category_2
  const getSubSubCategories = () => {
    let conditions=[{isCompared: "primary_category",toBeCompared: refProdCat.current.value,},{isCompared: "category_1",toBeCompared: refSelCat1.current.value,}]
    let category=getCategories(conditions,"category_2")
    setCategory_2(category);
    setCategory_3([]);
  };

  // function to set conditions for getting values of key category_3
  const getSubSubSubCategories = () => {
    let conditions = [
      {isCompared: "primary_category",toBeCompared: refProdCat.current.value,},
      {isCompared: "category_1",toBeCompared: refSelCat1.current.value,},
      {isCompared: "category_2",toBeCompared: refSelCat2.current.value,},
    ];
    let category=getCategories(conditions,"category_3");
    setCategory_3(category);
  };

  const save = () => {
    let obj = {productCategory:refProdCat.current.value , category_1:refSelCat1.current.value || "No data" , category_2:refSelCat2.current.value || "No data", category_3:refSelCat3.current.value|| "No data",};
    setResult(obj);
  };

  return (
    <div className={style.container}>
      <h2 className={style.head}>Products</h2>
      <Select ref={refProdCat} categoryName="Product Category" category={productCategory} change={getSubCategories}/>
      <Select ref={refSelCat1} categoryName="Category 1" category={category_1} change={getSubSubCategories}/>
      <Select ref={refSelCat2} categoryName="Category 2" category={category_2} change={getSubSubSubCategories}/>
      <Select ref={refSelCat3} categoryName="Category 3" category={category_3}/>
      <button className={style.btnBlue} onClick={save}>Save</button>
      {Object.keys(result).length > 1 ? (
        <table className={style.tabResult}>
          <tbody>
            <tr><th>Product Category</th><th>Category 1</th><th>Category 2</th><th>Category 3</th></tr>
            <tr><td>{result.productCategory}</td><td>{result.category_1}</td><td>{result.category_2}</td><td>{result.category_3}</td></tr>
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dropdown;
