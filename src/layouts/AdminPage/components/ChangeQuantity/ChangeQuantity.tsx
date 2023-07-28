import { useEffect, useState } from "react";
import "./ChangeQuantity.css";
import { ShirtModel } from "../../../../model/ShirtModel";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading/SpinnerLoading";
import { ChangeQuantityShirt } from "../ChangeQuantityShirt/ChangeQuantityShirt";
import { Pagination } from "../../../Utils/Pagination/Pagination";

export const ChangeQuantity = () => {
  const [shirts, setShirts] = useState<ShirtModel[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  const shirtsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalShirts, setTotalShirts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isQuantityChanged, setIsQuantityChanged] = useState(false);

  useEffect(() => {
    const fetchShirts = async () => {
      const url = `${process.env.REACT_APP_API}/shirts?page=${currentPage-1}&size=${shirtsPerPage}`;
      try {
        const response = await fetch(url);
        const responseJson = await response.json();
        setShirts(responseJson._embedded.shirts);
        setTotalShirts(responseJson.page.totalElements);
        setTotalPages(responseJson.page.totalPages);
      }
      catch (err: any) {
        setHttpError("Something went wrong");
      }
      setIsLoading(false);

      window.scrollTo(0, 0);
    };
    fetchShirts();
  }, [currentPage, isQuantityChanged]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  
  const indexOfFirstShirt: number = (currentPage === 1 ? 0 : (currentPage - 1) * shirtsPerPage);
  const lastShirt = shirtsPerPage * currentPage <= totalShirts ? shirtsPerPage * currentPage : totalShirts;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber); 

  return (
    <div className="change-quantity">
      <h1 style={{ marginTop: "1rem" }}>Number of results</h1>
      <p>{indexOfFirstShirt+1} to {lastShirt} of {totalShirts}</p>
      {shirts?.map(shirt => <ChangeQuantityShirt shirt={shirt} setIsQuantityChanged={setIsQuantityChanged} setIsLoading={setIsLoading} 
      key={shirt.id} />)}
      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </div>
  );
};
