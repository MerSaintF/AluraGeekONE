export const api = axios.create({
  baseURL: "https://fakepi-nu.vercel.app/",
});

export const getData = async (url) => {
  const res = await api.get(url);
  const data = res.data;
  return data;
};

export const deleteData = async (url) => {
  const res = await api.delete(url);
  const data = res.data;
  return data;
};

export const postData = async (url, obj) => {
  const res = await api.post(url, obj);
  const data = res.data;
  return data;
};
