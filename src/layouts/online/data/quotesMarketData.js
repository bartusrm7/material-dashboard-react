import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gasOilDataThunk } from "store/features/quotesMarketData";
import { usdPlnDataThunk } from "store/features/quotesMarketData";

export default function QuotesMarketData() {
  const dispatch = useDispatch();
  const usdPlnData = useSelector((state) => state.quotesData.usdPlnData);
  const gasOilData = useSelector((state) => state.quotesData.gasOilData);

  useEffect(() => {
    dispatch(usdPlnDataThunk());
    dispatch(gasOilDataThunk());

    const interval = setInterval(() => {
      dispatch(usdPlnDataThunk());
      dispatch(gasOilDataThunk());
    }, 900000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              title="USD/PLN"
              quotes={`${usdPlnData.close?.toFixed(2)}zł`}
              date={`${usdPlnData.date?.split("-").reverse().join(".")}`}
              time={`${usdPlnData?.time}`}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              title="Gas"
              quotes={`${gasOilData.close?.toFixed(2)}zł`}
              date={`${gasOilData.date?.split("-").reverse().join(".")}`}
              time={`${gasOilData?.time}`}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="warning"
              title="USD/PLN NBP"
              quotes={`${gasOilData.close?.toFixed(2)}zł`}
              date={`${gasOilData.date?.split("-").reverse().join(".")}`}
              time={`${gasOilData?.time}`}
            />
          </MDBox>
        </Grid>
      </Grid>
    </>
  );
}
