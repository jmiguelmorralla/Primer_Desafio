const queries = location.search;
const pid = new URLSearchParams(queries);

// const queries = new URL(location.href)
// const pid = queries.searchParams.get("_id"),

// // arreglar, el profesor en el after no logró hacerlo funcionaruu

fetch("/api/products/" + pid)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
