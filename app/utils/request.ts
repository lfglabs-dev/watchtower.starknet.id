const request = async (
  url: string,
  body: any,
  advanced = {
    method: "POST",
  }
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: advanced?.method ? advanced?.method : "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const data = await res.json();
    if (data.status === "error") {
      if (
        data.error_code === "invalid_token" &&
        window.location.pathname !== "/"
      )
        window.location.href = "/";
    }
    return data;
  } catch (err) {
    return res;
  }
};

export default request;
