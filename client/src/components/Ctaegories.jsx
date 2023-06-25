import CategoryItem from "./CategoryItem";
import { categories } from "../assets/data";
import { nanoid } from "nanoid";
import { styled } from "styled-components";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  ${mobile({ display: "flex", flexDirection: "column", padding: "10px" })}
`;
const Ctaegories = () => {
  const renderedCategories = categories.map((category) => {
    const key = nanoid();
    return <CategoryItem key={key} category={category} />;
  });
  return (
    <Container className="flex flex-1 justify-between ">
      {renderedCategories}
    </Container>
  );
};

export default Ctaegories;
