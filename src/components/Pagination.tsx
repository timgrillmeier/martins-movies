import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Helper to generate smart pagination with truncation
  function getPaginationPages(current: number, total: number): (number | string)[] {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
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
    const windowEnd = Math.min(total - 2, current + 2);
    for (let i = windowStart; i <= windowEnd; i++) {
      pages.push(i);
    }
    // Show right ellipsis if needed
    if (current < (total - 4)) {
      pages.push('...');
    }
    // Always show last 2
    pages.push(total - 1);
    pages.push(total);
    // Remove duplicates while preserving order
    return pages.filter((item, idx, arr) => {
        if (typeof item === 'number' && (item < 1 || item > total)) return false;
        // Only filter duplicates for numbers, not for '...'
        if (item === '...') return true;
        return arr.indexOf(item) === idx;
    });
  }
  const pages = getPaginationPages(currentPage, totalPages);
  console.log(pages);

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
