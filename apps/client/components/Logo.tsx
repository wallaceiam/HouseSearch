import React from "react";

const Logo = () => (
  <>
    <img
      className="block h-8 w-auto lg:hidden"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    />
    <img
      className="hidden h-8 w-auto lg:block"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    />
  </>
);

export default Logo;
