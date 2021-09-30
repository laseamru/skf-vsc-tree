import fetch from "node-fetch";

export const fetchItems = async (url: string): Promise<any> => {
  const response = await fetch(`http://localhost/api/${url}`, {
    method: 'GET',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: { 'Connection': 'keep-alive' }
  });

  if (response.status === 200) {
    const data = await response.json();
    return data.items;
  } else {
    throw new Error(`${url} - ${response.status}\n.Unable to fetch data from SKF`);
  }
};

