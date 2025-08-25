import { TestimonialCarousel } from "../code/testimonial-carousel";

export const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Product Designer",
    text: "This library has completely transformed the way we build UI.",
  },
  {
    id: 2,
    name: "David Kim",
    role: "Full Stack Developer",
    text: "I love how reusable and consistent the components are.",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "UX Researcher",
    text: "The attention to detail is simply top-notch.",
  },
];

export default function Page() {
  return <TestimonialCarousel testimonials={testimonials} />;
}
