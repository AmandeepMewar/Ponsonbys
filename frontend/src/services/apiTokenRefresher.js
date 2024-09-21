const { fetch } = window;

async function refreshAccessToken() {
  const response = await fetch('/api/auth/refresh-tokens', {
    method: 'POST',
  });

  if (!response.ok) return false;

  return true;
}

export async function handleInterceptor(url, options = {}, retryCount = 0) {
  const response = await fetch(url, {
    ...options,
  });

  if (response.status === 401 && retryCount < 1) {
    const refreshSuccess = await refreshAccessToken();

    if (refreshSuccess) {
      return handleInterceptor(url, options, retryCount + 1);
    }
  }
  return response;
}

window.fetch = handleInterceptor;
