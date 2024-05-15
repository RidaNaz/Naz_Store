export const trending = {
    name: "trending",
    type: "document",
    title: "Trending",
    fields: [
        {
            name: "id",
            type: "number",
            title: "ID",
        }, {
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
            name: "desciption",
            type: "string",
            title: "Description",
        },
        {
            name: "image",
            type: "image",
            title: "Product Image",
        },
        {
            name: "category",
            type: "reference",
            title: "Product Category",
            to: [
                {
                    type: "category"
                },
            ]
        },
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
}