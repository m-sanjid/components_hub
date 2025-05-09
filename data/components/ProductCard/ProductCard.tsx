"use client";

import { forwardRef } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../Card/Card";
import { Button } from "../Button/Button";
import { IconHeart, IconShoppingCart, IconStar } from "@tabler/icons-react";
import clsx from "clsx";

export interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onAddToCart?: () => void;
  className?: string;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      name,
      price,
      image,
      rating,
      reviews,
      description,
      isFavorite = false,
      onFavorite,
      onAddToCart,
      className,
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={clsx("group hover:shadow-lg transition-shadow", className)}
      >
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={onFavorite}
          >
            <IconHeart
              className={clsx(
                "h-5 w-5",
                isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </Button>
        </div>
        <CardHeader>
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <IconStar
                  key={i}
                  className={clsx(
                    "h-4 w-4",
                    i < rating ? "fill-primary text-primary" : "text-muted-foreground"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>
          <p className="text-2xl font-bold">${price.toFixed(2)}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            leftIcon={<IconShoppingCart className="h-4 w-4" />}
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard"; 