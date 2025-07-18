import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel"
import moment from "moment";

import {  useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";


/** REDUX SLICE & SELECTOR */
  const processOrdersRetriever = createSelector(
    retrieveProcessOrders,
    (processOrders) => ({ processOrders })
  );

  interface ProcessdOrdersProps {
    setValue: (input: string) => void;
  }

export default function ProcessOrders(props: ProcessdOrdersProps) {
    const {setValue} = props;
    const { authMember, setOrderBuilder} = useGlobals();
    const { processOrders } = useSelector(processOrdersRetriever);

/** HANDLERS */
    
const fineshOrderHandler = async (e: T) => {
    try {
        if(!authMember) throw new Error(Messages.error2);


        const orderId = e.target.value;
        const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.FINISH,
        };

        const confirmation = window.confirm("Have you receive your order?");
        if(confirmation) {
            const order = new OrderService();
            await order.updateOrder(input);
            setValue("3");
            setOrderBuilder(new Date());
        }

    }catch (err) {
        console.log(err);
        sweetErrorHandling(err).then();
    }
};

  return (
    <TabPanel value={"2"}>
        <Stack>
        {processOrders?.map((order: Order) => {
                return(
                    <Box key={order._id} className={"order-main-box"}>
                        <Box className="order-box-scroll">
                        {order?.orderItems?.map((item: OrderItem) => {
                                    const product: Product = order.productData.filter((ele: Product) => item.productId === ele._id)[0];
                                    const imagePath = `${serverApi}/${product.productImages[0]}`
                                return(
                                    <Box key={item._id} className="orders-name-price">
                                        <img 
                                          src={imagePath}
                                          className="order-dish-img"
                                         />
                                         <p className="title-dish">{product.productName}</p>
                                         <Box className="price-box">
                                            <p>${item.itemPrice}</p>
                                            <img src={"/icons/close.svg"}/>
                                            <p>{item.itemQuantity}</p>
                                            <img src={"/icons/pause.svg"}/>
                                            <p style={{marginLeft: "15px"}}>${item.itemQuantity*item.itemPrice}</p>
                                         </Box>
                                    </Box>
                                );
                            })}
                        </Box>

                        <Box className="total-price-box">
                            <Box className="box-total">
                                <p>Product price</p>
                                <p>${order.orderTotal - order.orderDelivery}</p>
                                <img
                                 src="/icons/plus.svg" 
                                style={{ marginLeft: "20px" }}/>
                                <p>Delivery cost</p>
                                <p>${order.orderDelivery}</p>
                                <img
                                   src="/icons/pause.svg" 
                                   style={{ marginLeft: "20px"}}/>
                                   <p>Total</p>
                                   <p>${order.orderTotal}</p>
                            </Box>
                            <p className="data-compl">
                              {moment().format("YY-MM-DD HH:mm")}
                            </p>
                       
                            <Button 
                            value={order._id}
                            variant="contained" className="verify-button"
                            onClick={fineshOrderHandler}
                            >
                                VERIFY TO FULFIL
                            </Button>
                        </Box>
                    </Box>
                );
            })}

            {!processOrders  || (processOrders.length === 0 && (
                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                    <img
                      src="/icons/noimage-list.svg"
                      style={{ width: 300, height: 300 }}
                     />
                </Box>
            ))}
        </Stack>
    </TabPanel>
);
  }