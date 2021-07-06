import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { BrowserRouter } from "react-router-dom";
import { Typography, AppBar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { SnackbarProvider } from "notistack";
import { LoaderComponent } from "./components/Loader";
import { ArticleList } from "./components/article/ArticleList";
import { ProductList } from "./components/product/ProductList";
import { SalesInfoList } from "./components/sales-info/SalesInfoList";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ): any => {
    setValue(newValue);
  };
  return (
    <BrowserRouter>
      <LoaderComponent></LoaderComponent>
      <SnackbarProvider maxSnack={3}>
        <Typography align="center">WAREHOUSE SYSTEM</Typography>
        <Paper>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
          >
            <Tab label="Product" {...a11yProps(0)} />
            <Tab label="Article" {...a11yProps(1)} />
            <Tab label="Sales Info" {...a11yProps(2)} />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <ProductList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ArticleList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SalesInfoList />
        </TabPanel>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
