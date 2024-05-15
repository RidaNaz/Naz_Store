import { defineType, defineField } from "sanity"

export const product = defineType({
    name: "product",
    type: "document",
    title: "Product",
    fields: [
        {
            name: "id",
            type: "number",
            title: "ID",
        },
        {
            name: "title",
            type: "string",
            title: "Title",
        },
        {
            name: "isNew",
            type: "boolean",
            title: "Is New",
        },
        {
            name: "oldPrice",
            type: "number",
            title: "Old Price",
        },
        {
            name: "price",
            type: "number",
            title: "Product Price",
        },
        {
            name: "description",
            type: "string",
            title: "Description",
        },
        {
            name: "image",
            type: "image",
            title: "Product Image",
        },
        defineField(
            {
                name: "category",
                type: "reference",
                title: "Product Category",
                to: [
                    {
                        type: "category"
                    },
                ]
            }),
        {
            name: "rating",
            type: "number",
            title: "Rating",
        },
        {
            name: "quantity",
            type: "number",
            title: "Quantity",
        },
    ]
})