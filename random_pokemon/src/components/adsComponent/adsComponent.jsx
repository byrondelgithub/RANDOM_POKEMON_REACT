/**
 * @file Simple ad component with custom sizes.
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports AdsComponent
 */
import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";

/**
 * Simple ad component with custom sizes and dataAdSlot.
 * @returns {Component}
 */
const AdsComponent = ({ w = "100%", h = "100%", dataAdSlot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <>
      <Box w={w} h={h}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-6267772707113063"
          data-ad-slot={dataAdSlot.toString()}
        ></ins>
      </Box>
    </>
  );
};

export default AdsComponent;
