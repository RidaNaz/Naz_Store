import { Product as IProduct, StateProps } from "@/type"
import ProductsData from "./ProductData"
import Container from "./Container"
import { getProductData, getSingleProduct } from "@/helpers"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCartData } from "@/redux/shoppingSlice"

export default async function Product() {
    const dispatch = useDispatch();
    const { userInfo }: any = useSelector(
      (state: StateProps) => state.shopping
    );

    const data: IProduct[] = await getProductData()

    useEffect(() => {
        const fetchCartData = async () => {
          try {
            const response = await fetch(`/api/postgres?user_id=${userInfo ? userInfo.unique_id : "Anonymous"}`);
            if (!response.ok) {
              throw new Error("Failed to fetch cart data");
            }
            const data = await response.json();
            const cartProduct = await data.allCartData.map(async (item: any) => await getSingleProduct(Number(item.product_id)));
    
            const cartProducts = await Promise.all(cartProduct);
            
            const combinedData = data.allCartData.map((cartItem: any, index: number) => ({
              ...cartProducts[index],
              quantity: cartItem.quantity
            }));
            dispatch(setCartData(combinedData));
          } catch (error) {
            console.error("Error fetching cart data:", error);
          }
        };
    
        if (userInfo) {
          fetchCartData();
        }
      }, [userInfo, dispatch]);

    return (
        <div id="products" >
        <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 -mt-8">
            {data.map((item) => (
                <ProductsData item={item} key={item.id} />
            ))}
        </Container>
        </div>
    )
}