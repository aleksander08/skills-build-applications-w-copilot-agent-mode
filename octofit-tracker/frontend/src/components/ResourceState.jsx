export function ResourceState({ loading, error, children }) {
  if (loading) return <p className="state-message">Loading your OctoFit data...</p>;
  if (error) return <p className="state-message state-error">{error}</p>;
  return children;
}

export function PaginationNote({ pagination }) {
  if (!pagination) return null;
  const page = pagination.page ?? pagination.currentPage;
  const total = pagination.total ?? pagination.totalItems;
  if (!page && !total) return null;
  return <p className="pagination-note">{page ? `Page ${page}` : ''}{page && total ? ' · ' : ''}{total ? `${total} total` : ''}</p>;
}