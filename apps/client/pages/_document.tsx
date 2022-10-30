import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  const ref = React.useRef<HTMLHtmlElement>(null);

  return (
    <Html lang="en-us" className="h-full bg-white" ref={ref}>
      <Head />
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
