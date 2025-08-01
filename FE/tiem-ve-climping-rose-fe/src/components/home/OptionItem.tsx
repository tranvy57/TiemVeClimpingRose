import React from "react";
import Image from "next/image";

interface OptionItemProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  image_url: string;
}

export const OptionItem = React.forwardRef<HTMLDivElement, OptionItemProps>(
  ({ name, image_url, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`group w-[120px] md:w-[160px] flex-shrink-0 lg:mx-2 md:mx-2 cursor-pointer ${
        rest.className || ""
      }`}
      tabIndex={0}
      role="button"
    >
      <div className="relative aspect-square w-full min-w-[100px] flex flex-col justify-between">
        <Image
          src={image_url}
          fill
          alt="Kích thước"
          className="object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="font-bold text-red-500 text-center text-sm md:text-md p-4">
        {name}
      </p>
    </div>
  )
);

OptionItem.displayName = "OptionItem";
