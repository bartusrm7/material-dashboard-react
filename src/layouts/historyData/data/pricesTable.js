export default function pricesTable({ priceProp, dateProp }) {
  return {
    columns: [
      { Header: "cena", accessor: "cena", align: "center" },
      { Header: "data", accessor: "data", align: "center" },
    ],
    rows: priceProp.map((price, index) => ({
      cena: price,
      data: dateProp[index],
    })),
  };
}
