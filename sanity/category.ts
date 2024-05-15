import { defineType, defineField } from "sanity"

export const category = defineType({
    name: "category",
    type: "document",
    title: "Category",
    fields: [
        defineField(
        {
            name: "name",
            type: "string",
            title: "Category Name",
        })
    ]
})