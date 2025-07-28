import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Helper to generate smart pagination with truncation
  function getPaginationPages(current: number, total: number): (number | string)[] {
    const maxPages = 500;
    const cappedTotal = Math.min(total, maxPages);
    if (cappedTotal <= 7) {
      return Array.from({ length: cappedTotal }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    // Always show first 2
    pages.push(1);
    pages.push(2);
    // Show left ellipsis if needed
    if (current > 5) {
      pages.push('...');
    }
    // Show window around current page
    const windowStart = Math.max(3, current - 2);
    const windowEnd = Math.min(cappedTotal - 2, current + 2);
    for (let i = windowStart; i <= windowEnd; i++) {
      pages.push(i);
    }
    // Show right ellipsis if needed
    if (current < (cappedTotal - 4)) {
      pages.push('...');
    }
    // Always show last 2
    pages.push(cappedTotal - 1);
    pages.push(cappedTotal);
    // Remove duplicates while preserving order
    return pages.filter((item, idx, arr) => {
        if (typeof item === 'number' && (item < 1 || item > cappedTotal)) return false;
        // Only filter duplicates for numbers, not for '...'
        if (item === '...') return true;
        return arr.indexOf(item) === idx;
    });
  }
  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <nav className="pagination">
          <ul>
            {currentPage > 1 && (
              <li>
                <a
                  href="#"
                  style={{ cursor: "pointer" }}
                  onClick={e => {
                    e.preventDefault();
                    onPageChange(currentPage - 1);
                  }}
                >
                  <i className="ti-angle-left"></i>
                </a>
              </li>
            )}
            {pages.map((page, idx) => (
              <li key={idx}>
                {page === '...' ? (
                  <span style={{ padding: '0 8px' }}>...</span>
                ) : (
                  <a
                    href="#"
                    className={page === currentPage ? "current-page" : undefined}
                    style={{ cursor: "pointer" }}
                    onClick={e => {
                      e.preventDefault();
                      if (typeof page === 'number' && page !== currentPage) onPageChange(page);
                    }}
                  >
                    {page}
                  </a>
                )}
              </li>
            ))}
            {currentPage < totalPages && currentPage < 500 && (
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
