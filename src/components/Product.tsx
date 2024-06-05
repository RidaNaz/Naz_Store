import { Product as IProduct } from "@/type"
import ProductsData from "./ProductData"
import Container from "./Container"
import { getProductData } from "@/helpers"

export default async function Product() {
    const data: IProduct[] = await getProductData()

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