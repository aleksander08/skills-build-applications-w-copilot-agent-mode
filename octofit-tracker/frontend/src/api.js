const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiOrigin = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : '';

export const apiBaseUrl = `${apiOrigin}/api`;

export function getItems(payload) {
  if (Array.isArray(payload)) return { items: payload, pagination: null };
  const items = payload?.data ?? payload?.results ?? payload?.items ?? [];
  return { items: Array.isArray(items) ? items : [], pagination: payload?.pagination ?? payload?.meta ?? null };
}

export async function fetchCollection(resource, endpoint = `${apiBaseUrl}/${resource}/`) {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Unable to load ${resource}`);
  return getItems(await response.json());
}