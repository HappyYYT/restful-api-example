export async function getApi(url) {
  const res = await fetch(url);
  return res.json();
}

export async function postApi(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function deleteApi(url) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function putApi(url, data) {
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
