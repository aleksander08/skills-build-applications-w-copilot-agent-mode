import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import { PaginationNote, ResourceState } from './ResourceState.jsx';

export function CollectionView({ resource, endpoint, title, description, renderItem }) {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    let active = true;
    fetchCollection(resource, endpoint).then(({ items: nextItems, pagination: nextPagination }) => {
      if (active) { setItems(nextItems); setPagination(nextPagination); setStatus({ loading: false, error: '' }); }
    }).catch((error) => { if (active) setStatus({ loading: false, error: error.message }); });
    return () => { active = false; };
  }, [resource, endpoint]);

  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">OctoFit / {resource}</p><h1>{title}</h1><p>{description}</p></div><span className="count-badge">{items.length} records</span></div><ResourceState loading={status.loading} error={status.error}><div className="resource-grid">{items.map((item, index) => renderItem(item, index))}</div>{!items.length && <p className="state-message">No records yet.</p>}<PaginationNote pagination={pagination} /></ResourceState></section>;
}