"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = React.use(params);
  const router = useRouter();

  useEffect(() => {
    router.push("/");

    setTimeout(() => {
      router.push(`/product/${id}`);
    }, 500);
  }, [id, router]);

  return null;
};

export default ProductPage;
