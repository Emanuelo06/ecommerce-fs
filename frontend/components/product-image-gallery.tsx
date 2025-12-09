"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
    images: string[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 h-24 md:h-[500px]">
                {images.map((image, index) => (
                    <button
                        key={index}
                        className={cn(
                            "relative w-20 h-20 flex-shrink-0 border-2 rounded-md overflow-hidden",
                            selectedImage === index ? "border-primary" : "border-transparent"
                        )}
                        onClick={() => setSelectedImage(index)}
                    >
                        <Image
                            src={image}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-square md:aspect-auto md:h-[500px] bg-muted rounded-md overflow-hidden">
                <Image
                    src={images[selectedImage]}
                    alt="Product main image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    );
}
