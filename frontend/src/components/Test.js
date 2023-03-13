import { useEffect } from "react";
import { useGetAllTweetsQuery } from "../store/mainApi";

function Test() {
  const { data: tweets } = useGetAllTweetsQuery();

  return <div>{`${process.env.REACT_APP_BASE_URL}`}</div>;
}

export default Test;
