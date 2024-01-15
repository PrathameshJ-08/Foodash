import { useEffect, useState } from "react";
import { MENU_API } from "../constants";
import { useParams } from "react-router-dom";

const useMenuList = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId);
    const toJson = await data.json();
    setResInfo(toJson);
    console.log(resInfo);
  };
  {
  }
  return resInfo;
};
export default useMenuList;

//fetches restaurant menu items from swiggys api

//used in restaurant menu
