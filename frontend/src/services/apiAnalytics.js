export async function getAnalyticsData() {
  const response = await fetch('/api/analytics/');

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data.result;
}
