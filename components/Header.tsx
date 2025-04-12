import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="w-full rounded-t-xl bg-white justify-between pl-4 py-3">
      <Link href="/" className="flex flex-row items-center gap-0">
        <Image src="/mix_logo.png" alt="logo" width={70} height={5} />
        <h1 className="font-aquino text-4xl text-primary pb-1">Mix Burger</h1>
      </Link>
    </div>
  );
};

export default Header;
