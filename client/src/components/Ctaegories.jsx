import CategoryItem from "./CategoryItem";
import { categories } from "../assets/data";
import { nanoid } from "nanoid";

const Ctaegories = () => {
  const renderedCategories = categories.map((category) => {
    const key = nanoid();
    return <CategoryItem key={key} category={category} />;
  });
  return <div className="flex ">{renderedCategories}</div>;
};

export default Ctaegories;
