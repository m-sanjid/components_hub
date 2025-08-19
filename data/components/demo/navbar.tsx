"use client";

import { Navbar } from "../code/navbar";
import React, { useEffect, useRef, useState } from "react";

const NavbarDemo = () => {
  const [demo, setDemo] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleDemo = () => {
    setDemo(!demo);
  };

  // Close on Escape or outside click
  useEffect(() => {
    if (!demo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDemo(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setDemo(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [demo]);

  return (
    <div>
      <button
        className="rounded border px-4 py-2 font-bold"
        onClick={toggleDemo}
      >
        View Navbar
      </button>

      {demo && (
        <div className="bg-primary/50 fixed inset-0 z-[200]">
          {/* Fullscreen container for the demo */}
          <div
            ref={modalRef}
            className="bg-background flex h-full w-full flex-col"
          >
            <Navbar />

            {/* Example content to show scroll + layout */}
            <div className="mx-auto flex-1 overflow-y-auto p-6">
              <h1 className="mb-4 text-2xl font-bold">Navbar Demo</h1>
              <p className="mb-2">
                This is a fullscreen preview of the Navbar. You can scroll and
                interact with it just like in a real app.
              </p>
              <p className="mb-2">Add more demo content here...</p>
              <button
                onClick={() => setDemo(false)}
                className="bg-destructive mt-6 rounded px-4 py-2 text-white"
              >
                Close Demo
              </button>
              <div className="" id="projects"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarDemo;
