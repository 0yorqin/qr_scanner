"use client";

import { useCategoryStore } from "@/store/category";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ScrollableNav({ categories }: { categories: any[] }) {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth / 2;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const activeBtn = buttonRefs.current[categoryActiveId];
    const scrollContainer = scrollRef.current;

    if (activeBtn && scrollContainer) {
      const scrollLeft =
        activeBtn.offsetLeft -
        scrollContainer.offsetWidth / 1 +
        activeBtn.offsetWidth / 1;

      scrollContainer.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [categoryActiveId]);
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
        className="rounded-full bg-[#EDE9F2] overflow-x-scroll max-sm:w-full md:max-w-[90%] scroll-hide"
      >
        <div className="flex flex-row items-center whitespace-nowrap w-max py-[2px]">
          {categories.map((category: any) => (
            <Link
              ref={(el) => (buttonRefs.current[category.id] = el)}
              key={category.id}
              href={`#${category.id}`}
              onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById(category.id);
                if (section) {
                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className={`whitespace-nowrap my-[3px] bg-white hover:shadow-md rounded-full mx-[5px] px-4 py-2 inline-block font-semibold transition ${
                categoryActiveId === category.id
                  ? "opacity-100 shadow-md text-secondary"
                  : "text-black opacity-50"
              }`}
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
