import { SyntheticEvent, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import PausedOrders from "./PausedOrders";
import "../../../css/order.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
    return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}>
                    <Tab label="PAUSED ORDERS" value={"1"} />
                    <Tab label="PROCESS ORDERS" value={"2"} />
                    <Tab label="FINISHED ORDERS" value={"3"} />
                  </Tabs>
              </Box>
            </Box>
            <Stack className="order-main-content">
            <PausedOrders/>
            <ProcessOrders/>
            <FinishedOrders/>
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order-right">
          <Box className="order-info-box">
            <Box className="member-box">
              <div className="order-user-img">
                <img 
                src={"/icons/default-user.svg"}
                className="order-user-avatar"
                />
              <div className="order-user-icon-box">
                <img
                src="/icons/user-badge.svg" 
                className="order-user-prof-img"/>
              </div>
              </div>
              <span className="order-user-name">Martin</span>
              <span className="order-user-prof">User</span>
            </Box>
            <Box className="liner"></Box>
            <Box className="order-user-address">
              <div style={{ display: "flex"}}>
                <LocationOnIcon/>
                <span className="spec-address-txt">South Korea Busan</span>
              </div>
            </Box>
          </Box>
          <Box className="order-info-box">
            <Box className="card-input"><span className="title">Card number: 5243 4090 2002 7495</span> </Box>
            <Box className="card">
              <Box className="card-half-input"><span className="title">07/24</span></Box>
              <Box className="card-half-input"><span className="title">CVV: 010</span></Box>
            </Box>
            <Box className="card-input"><span className="title">Justin Robertson</span></Box>
            <Box className="cards-box ">
            <div>
                <img 
                src={"/icons/western-card.svg"}
                className="order-user-avatar"
                />
            </div>
            <div>
                <img 
                src={"/icons/master-card.svg"}
                className="order-user-avatar"
                />
            </div>
            <div>
                <img 
                src={"/icons/paypal-card.svg"}
                className="order-user-avatar"
                />
            </div>
            <div>
                <img 
                src={"/icons/visa-card.svg"}
                className="order-user-avatar"
                />
            </div>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>);
  }