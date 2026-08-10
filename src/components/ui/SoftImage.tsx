"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

type SoftImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function SoftImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  sizes,
  priority,
}: SoftImageProps) {
  const [loaded, setLoaded] = useState(false);

  const image = (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={`transition-[opacity,filter] duration-700 ease-out ${
        loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
      } ${className}`}
      onLoad={() => setLoaded(true)}
    />
  );

  if (fill) {
    return (
      <>
        <Skeleton
          className={`absolute inset-0 transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
        {image}
      </>
    );
  }

  return (
    <span className="relative inline-block">
      <Skeleton
        className={`absolute inset-0 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      {image}
    </span>
  );
}
