
export function sendRequest(method: string, url: string): Promise<any> {
  return fetch(url, {
    method
  })
}