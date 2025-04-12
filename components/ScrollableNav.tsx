"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function ScrollableNav({ categories }: { categories: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth / 2;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white rounded-b-xl shadow-lg py-2 px-2 flex flex-row justify-between max-sm:justify-center items-center sticky top-0 z-10">
      <button
        onClick={() => scroll("left")}
        className="z-10 bg-white rounded-full shadow p-2 max-sm:hidden"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        className="rounded-full bg-[#EDE9F2] overflow-x-scroll max-sm:w-full max-w-[90%] scroll-hide"
      >
        <div className="flex flex-row items-center whitespace-nowrap w-max py-[2px]">
          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`#${category.id}`}
              className="whitespace-nowrap my-[3px] bg-white hover:shadow-md opacity-50 rounded-full mx-[5px] px-4 py-2 inline-block font-semibold text-black"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={() => scroll("right")}
        className="z-10 bg-white rounded-full shadow p-2 max-sm:hidden"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
