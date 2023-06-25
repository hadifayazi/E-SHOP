import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  console.log(email);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className="w-full h-[150px] bg-black flex flex-col  text-white justify-center items-center  ">
      <h1 className="text-md sm:text-2xl font-bold">Newsletter</h1>
      <h2 className="text-sm sm:text-2xl ">
        Subscribe to recive our latest products:
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex text-sm sm:text-2xl  gap-2 mt-4">
          <input
            className="focus:outline-none px-6 py-1 rounded-full text-black "
            type="email"
            name="email"
            placeholder="youremail@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="bg-custRed px-2 rounded-md">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default Footer;
