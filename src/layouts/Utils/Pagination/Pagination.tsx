import "./Pagination.css";

export const Pagination: React.FC<{
  currentPage: number, totalPages: number, paginate: any
}> = (props) => {

  const firstPageNumbers = [];
  let showFirstPageGap = false;
  let showSecondPageGap = false;
  const secondPageNumbers: number[] = [];

  if (props.currentPage <= 2) {
    firstPageNumbers.push(1);
    if (props.totalPages >= 2) {
      firstPageNumbers.push(2);
    }
    if (props.totalPages >= 3) {
      firstPageNumbers.push(3);
      showSecondPageGap = true;
      secondPageNumbers.push(props.totalPages);
    }
  }
  else if (props.currentPage >= props.totalPages-1) {
    if (props.totalPages >= 3) {
      showSecondPageGap = true;
    }
    secondPageNumbers.push(props.currentPage-1);
    secondPageNumbers.push(props.currentPage);
    if (props.currentPage === props.totalPages-1) {
      secondPageNumbers.push(props.currentPage+1);
    }
  }
  else {
    showFirstPageGap = true;
    firstPageNumbers.push(props.currentPage-1);
    firstPageNumbers.push(props.currentPage);
    firstPageNumbers.push(props.currentPage+1);
    showSecondPageGap = true;
    secondPageNumbers.push(props.totalPages);
  }
  
  return (
    <nav aria-label="...">
      <ul className="pagination">
        {props.currentPage > 1 &&
          <li className="page-item">
            <button className="page-link" onClick={() => props.paginate(props.currentPage - 1)}>
              &#9666;
            </button>
          </li>
        }
        {showFirstPageGap && 
          <li className="pages-gap">
            ...
          </li>
        }
        {firstPageNumbers.map(pageNumber => 
          <li className="page-item" key={pageNumber}>
            <button className={"page-link" + (pageNumber === props.currentPage ? " page-link-active" : "")}
              onClick={() => props.paginate(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        )}
        {showSecondPageGap && 
          <li className="pages-gap">
            ...
          </li>
        }
        {secondPageNumbers.map(pageNumber => 
          <li className="page-item" key={pageNumber}>
            <button className={"page-link" + (pageNumber === props.currentPage ? " page-link-active" : "")}
              onClick={() => props.paginate(pageNumber)}>
              {pageNumber}
            </button>
        </li>
        )}
        {props.currentPage < props.totalPages &&
          <li className="page-item">
            <button className="page-link" onClick={() => props.paginate(props.currentPage + 1)}>
              &#9656;
            </button>
          </li>
        }
      </ul>
    </nav>
  );
}