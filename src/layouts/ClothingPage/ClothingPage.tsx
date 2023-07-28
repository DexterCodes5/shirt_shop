import { useEffect, useState } from "react";
import "./ClothingPage.css";
import { ClothingShirt } from "./components/ClothingShirt";
import { BACKEND_URL } from "../../util/urls";
import { ShirtModel } from "../../model/ShirtModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading/SpinnerLoading";
import { Pagination } from "../Utils/Pagination/Pagination";

export const ClothingPage = () => {
  const [shirts, setShirts] = useState<ShirtModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [shirtColor, setShirtColor] = useState("Shirt Color");

  const shirtsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalShirts, setTotalShirts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  useEffect(() => {
    const fetchShirts = async () => {
      let fetchUrl = `${BACKEND_URL}/shirts`;
      if (searchUrl === "") {
        fetchUrl += "?";
      }
      else {
        fetchUrl += searchUrl;
      }
      fetchUrl += `page=${currentPage-1}&size=${shirtsPerPage}`;

      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();
      setTotalShirts(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);
      const responseData = await responseJson._embedded.shirts;
      setShirts(responseData);
      setIsLoading(false);
    };

    fetchShirts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  if (httpError) {
    return (
      <div className="http-error-container mobile-container">
        <p>{httpError}</p>
      </div>
    );
  }

  const handleSearch = () => {
    if (search === "") {
      setSearchUrl("");
    }
    else {
      setSearchUrl(`/search/findByTitleContaining?search=${search}&`);
    }
  }

  const selectColor = (value: string) => {
    if (value === "Shirt Color") {
      setSearchUrl("");
    }
    else {
      setSearchUrl(`/search/findByColor?color=${value.toUpperCase()}&`);
    }
    setShirtColor(value);
    setCurrentPage(1);
    setShowDropdown(false);
  }

  const indexOfFirstShirt: number = (currentPage === 1 ? 0 : (currentPage - 1) * shirtsPerPage);
  const lastShirt = shirtsPerPage * currentPage <= totalShirts ? shirtsPerPage * currentPage : totalShirts;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber); 

  return (
    <div className="container mobile-container">
      <div className="cloting-page-search">
        <div className="cloting-page-search-col">
          <input className="clothing-page-input" type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
        <div className="shirt-color-dropdown">
          <button className="shirt-color-dropdown-btn" 
          onClick={() => setShowDropdown(prevShowDropdown => !prevShowDropdown)}>
            {shirtColor}
          </button>
          {showDropdown && 
            <ul className="shirt-color-dropdown-menu">
              <li>
                <a className="shirt-color-dropdown-item" href="#" onClick={() => selectColor("Black")}>
                  <div className="color-square color-square-black"></div>
                  Black
                </a>
              </li>
              <li>
                <a className="shirt-color-dropdown-item" href="#" onClick={() => selectColor("White")}>
                  <div className="color-square color-square-white"></div>
                  White
                </a>
              </li>
              <li>
                <a className="shirt-color-dropdown-item" href="#" onClick={() => selectColor("Blue")}>
                  <div className="color-square color-square-blue"></div>
                  Blue
                </a>
              </li>
              <li>
                <a className="shirt-color-dropdown-item" href="#" onClick={() => selectColor("Red")}>
                  <div className="color-square color-square-red"></div>
                  Red
                </a>
              </li>
              <li>
                <a className="shirt-color-dropdown-item" href="#" onClick={() => selectColor("Green")}>
                  <div className="color-square color-square-green"></div>
                  Green
                </a>
              </li>
              <li>
                <a className="shirt-color-dropdown-item" href="#" onClick={() => selectColor("Beige")}>
                  <div className="color-square color-square-beige"></div>
                  Beige
                </a>
              </li>
              <li>
                <a className="shirt-color-dropdown-item" href="#" onClick={() => selectColor("Gray")}>
                  <div className="color-square color-square-gray"></div>
                  Gray
                </a>
              </li>
              <li>
                <a className="shirt-color-dropdown-item" href="#" onClick={() => selectColor("Black and White")}>
                  <div className="color-square color-square-black-and-white"></div>
                  Black and White
                </a>
              </li>
              <li>
                <a className="shirt-color-dropdown-item" href="#" onClick={() => selectColor("Many")}>
                  <div className="color-square">
                    <div className="color-square-many-top"></div>
                    <div className="color-square-many-bottom"></div>
                  </div>
                  Many
                </a>
              </li>
              <li>
                <a className="shirt-color-dropdown-item" href="#" onClick={() => selectColor("Shirt Color")}>
                  Clear
                </a>
              </li>
            </ul>
          }
        </div>
      </div>
      {totalShirts > 0 ? 
        <>
          <div>
            <h3 className="number-results">Number of results: {totalShirts}</h3>
            <p className="items-per-page">{indexOfFirstShirt+1} to {lastShirt} of {totalShirts} items</p>
          </div>
          {shirts.map(shirt => <ClothingShirt shirt={shirt} key={shirt.id} />)}
        </>
        :
        <div>
          <h3>No results for search: "{search}"</h3>
          <a className="btn">Customer Service</a>
        </div>
      }
      {totalPages > 1 &&
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      }
    </div>
  );
}