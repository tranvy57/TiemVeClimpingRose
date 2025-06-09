"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { getTours } from "../api/tours/get";
import Home from "../containers/home/page";

export default function Page() {
  const [name, setName] = useState("vyt");
  const [tours, setTours] = useState([]);

  const fetch = async () => {
    try {
      const response = await getTours();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <Home />
    </div>
  );
}
