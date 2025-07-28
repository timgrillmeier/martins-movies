import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers (simple version, can be improved for large sets)
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <nav className="pagination">
          <ul>
            {pages.map((page) => (
              <li key={page}>
                <a
                  href="#"
                  className={page === currentPage ? "current-page" : undefined}
                  style={{ cursor: "pointer" }}
                  onClick={e => {
                    e.preventDefault();
                    if (page !== currentPage) onPageChange(page);
                  }}
                >
                  {page}
                </a>
              </li>
            ))}
            {currentPage < totalPages && (
              <li>
                <a
                  href="#"
                  style={{ cursor: "pointer" }}
                  onClick={e => {
                    e.preventDefault();
                    onPageChange(currentPage + 1);
                  }}
                >
                  <i className="ti-angle-right"></i>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
