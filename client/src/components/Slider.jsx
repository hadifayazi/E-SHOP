import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";
import items from "../assets/data";
import { useState } from "react";
import { mobile } from "../utils/responsive";
import { styled } from "styled-components";

const Containerdiv = styled.div`
  ${mobile({ $mobile: ` display: "none" ` })}
`;

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nexSlide = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const changeSlide = (itemIndex) => {
    setCurrentIndex(itemIndex);
  };

  return (
    <Containerdiv className=" bg-slate-200">
      <div className="max-w-[700px] w-full h-[500px]  py-8 m-auto relative group">
        <div
          style={{ backgroundImage: `url(${items[currentIndex].url})` }}
          className="w-full h-full rounded-2xl  bg-center bg-cover duration-500"
        ></div>
        {/*left arrow*/}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl p-2 bg-black/20 text-white rounded-full cursor-pointer  ">
          <AiOutlineArrowLeft size={20} onClick={prevSlide} />
        </div>
        {/*right arrow*/}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl p-2 bg-black/20 text-white rounded-full cursor-pointer ">
          <AiOutlineArrowRight onClick={nexSlide} size={20} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {items.map((i, itemIndex) => {
            return (
              <div
                key={itemIndex}
                onClick={() => changeSlide(itemIndex)}
                className="text-2xl cursor-pointer"
              >
                <RxDotFilled />
              </div>
            );
          })}
        </div>
      </div>
    </Containerdiv>
  );
};

export default Slider;

//absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl p-2 bg-black/20 text-xhite cursor-poinettr
