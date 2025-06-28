export default function pricesTable({ priceProp, dateProp }) {
  return {
    columns: [
      { Header: "cena(m³)", accessor: "cena(m³)", align: "center" },
      { Header: "data", accessor: "data", align: "center" },
    ],
    rows: priceProp.map((price, index) => ({
      cena: price,
      data: dateProp[index],
    })),
  };
}
