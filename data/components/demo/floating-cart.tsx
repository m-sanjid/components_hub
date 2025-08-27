"use client";

import React from "react";
import { FloatingCartWidget } from "../code/floating-cart";
import { toast } from "sonner";

const initialCartItems = [
  {
    id: 1,
    name: "AirPods Max",
    price: 599.99,
    quantity: 1,
    image:
      "https://www.apple.com/v/airpods-max/i/images/overview/bento/midnight/bento_1_airpod_max_midnight__4jy1tkqh9qay_medium_2x.jpg",
  },
  {
    id: 2,
    name: "Apple Watch Series 10",
    price: 799.99,
    quantity: 2,
    image:
      "https://www.apple.com/in/apple-watch-series-10/images/overview/health/health_sleep__fzqud86z6aeu_medium_2x.jpg",
  },
  {
    id: 3,
    name: "MacBook Pro",
    price: 1599.99,
    quantity: 1,
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=904&hei=840&fmt=jpeg&qlt=90&.v=YnlWZDdpMFo0bUpJZnBpZjhKM2M3VGhTSEZFNjlmT2xUUDNBTjljV1BxWVk4UDMvOWNCVUEyZk1VN2FtQlpZWXZvdUZlR0V0VUdJSjBWaDVNVG95Yk15Y0c3T3Y4UWZwZExHUFdTUC9lN28",
  },
];

const FloatingCartDemo = () => {
  return (
    <div>
      <div>See the floating cart at the bottom right</div>
      <FloatingCartWidget
        items={initialCartItems}
        onViewCart={() => toast("View cart clicked")}
        onCheckout={() => toast("Checkout clicked")}
      />
    </div>
  );
};

export default FloatingCartDemo;
