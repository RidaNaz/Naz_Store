import { type SchemaTypeDefinition } from 'sanity'
import { product } from "./Product"
import { category } from './category'
import { trending } from './trending'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, trending],
}
