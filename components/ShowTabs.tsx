import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/data/components/code/tabs";
import { TestimonialCarousel } from "@/data/components/code/testimonial-carousel";
import { testimonials } from "@/data/components/demo/testimonial-carousel";

import React from "react";
import GithubStarButton from "@/data/components/code/github-star-button";
import EmailForm from "./NewsLetter";

const ShowTabs = () => {
  return (
    <Tabs defaultValue="testimonials" id="tabs">
      <TabsList>
        <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        <TabsTrigger value="email-form">Email Form</TabsTrigger>
        <TabsTrigger value="star-button">Star Button</TabsTrigger>
      </TabsList>
      <TabsContent value="testimonials" className="md:p-4">
        <TestimonialCarousel testimonials={testimonials} />
      </TabsContent>
      <TabsContent value="email-form" className="md:p-4">
        <EmailForm id={"tabs-form-email"} />
      </TabsContent>
      <TabsContent value="star-button" className="md:p-4 lg:p-12">
        <GithubStarButton owner="m-sanjid" repo="components_hub" />
      </TabsContent>
    </Tabs>
  );
};

export default ShowTabs;
