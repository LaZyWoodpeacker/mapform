import "./styles.css";
import React, { useState, useRef } from "react";
import Layout from "./components/layout";
import LeftRow from "./components/leftrow";
import RightRow from "./components/rightrow";

const Divider = () => <div className="divider"></div>;

export default ({ data }) => {
  const isMoved = useRef(false);
  const [widthLeft, setWidthLeft] = useState(276);
  const [positionFrom, setPositionFrom] = useState();
  const [positionTo, setPositionTo] = useState();

  return (
    <Layout
      mouseMove={(event, div) => {
        if (isMoved.current) {
          setWidthLeft(event.clientX - div.offsetLeft);
        }
      }}
      mouseUp={() => {
        isMoved.current = false;
      }}
      mouseDown={(event) => {
        if (event.target.className === "divider") {
          isMoved.current = true;
        }
      }}
    >
      <LeftRow
        width={widthLeft}
        list={data.delivery}
        places={data.places}
        changeCords={(from, to) => {
          setPositionFrom([from.lat, from.lng]);
          setPositionTo([to.lat, to.lng]);
        }}
      />
      <Divider />
      <RightRow positionTo={positionTo} positionFrom={positionFrom} />
    </Layout>
  );
};
