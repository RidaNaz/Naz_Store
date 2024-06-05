import { cartTable, db } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm"

export async function GET(req: NextRequest) {
    let url = req.nextUrl.searchParams;
    console.log ("...url",url)
    
    try {
        if (url.has("user_id")) {
            let allCartData = await db.select().from(cartTable).where(eq(cartTable.user_id, (url.get("user_id") as string)));
            return NextResponse.json({ allCartData })
        }
        
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    };
};

export async function POST(request: NextRequest) {
    const req = await request.json()

    try {
        // Check if the product already exists in the cart for the user
        const existingCartItem = await db.select()
        .from(cartTable)
        .where(and(
            eq(cartTable.user_id, req.user_id),
            eq(cartTable.product_id, req.product_id)
        ))
        .then(result => result[0]); // Get the first item from the result array

        let res;
        if (existingCartItem) {
            // Update the quantity if the product already exists
            res = await db.update(cartTable)
                .set({ quantity: existingCartItem.quantity + (req.quantity || 1) })
                .where(and(
                    eq(cartTable.user_id, req.user_id),
                    eq(cartTable.product_id, req.product_id)
                ))
                .returning();
        } else {
            // Insert a new entry if the product doesn't exist
            res = await db.insert(cartTable).values({
                product_id: req.product_id,
                quantity: req.quantity || 1,
                user_id: req.user_id,
            }).returning();
        }

        return NextResponse.json({ res });

    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    }
}

export async function DELETE(request: NextRequest) {
    // let url = req.nextUrl.searchParams;

    try {
        const req = await request.json();
        console.log("DELETE Request received with data:", req);

        let response;
        if (req.product_id) {
            // Delete a specific product for the user
            response = await db.delete(cartTable)
                .where(and(
                    eq(cartTable.product_id, req.product_id),
                    eq(cartTable.user_id, req.user_id)
                ))
                .returning();
        } else {
            // Delete all products for the user
            response = await db.delete(cartTable)
                .where(eq(cartTable.user_id, req.user_id))
                .returning();
        }

        console.log("Delete response:", response);
        return NextResponse.json({ response });
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error: (error as { message: string }).message }, { status: 500 });
    }
} 

export async function PUT(request: NextRequest) {
    try {
      const req = await request.json();
      console.log("PUT Request received with data:", req);
  
      // Update the quantity of the specific product for the user
      const response = await db.update(cartTable)
        .set({ quantity: req.quantity })
        .where(and(
          eq(cartTable.user_id, req.user_id),
          eq(cartTable.product_id, req.product_id)
        ))
        .returning();
      
      console.log("Update response:", response);
      return NextResponse.json({ response });
  
    } catch (error) {
      console.log("Error during PUT operation:", (error as { message: string }).message);
      return NextResponse.json({ error: (error as { message: string }).message }, { status: 500 });
    }
  }