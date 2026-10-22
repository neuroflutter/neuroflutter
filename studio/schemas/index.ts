import { article } from "./article";
import { author } from "./author";
import { artwork } from "./artwork";
import { category } from "./category";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [article, author, artwork, category, siteSettings];
export { article, author, artwork, category, siteSettings };
export { CATEGORY_TITLES } from "./category";
