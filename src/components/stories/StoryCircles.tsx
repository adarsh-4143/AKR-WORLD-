"use client";

import React, { useState } from "react";
import Image from "next/image";
import { STORIES } from "@/data/stories";
import { Story } from "@/types";
import { StoryViewerModal } from "./StoryViewerModal";

interface StoryCirclesProps {
  onCategorySelect?: (categoryId: string) => void;
}

export const StoryCircles: React.FC<StoryCirclesProps> = ({ onCategorySelect }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (activeStoryIndex !== null) {
      setActiveStoryIndex((prev) =>
        prev !== null ? (prev + 1) % STORIES.length : null
      );
    }
  };

  const handlePrev = () => {
    if (activeStoryIndex !== null) {
      setActiveStoryIndex((prev) =>
        prev !== null ? (prev - 1 + STORIES.length) % STORIES.length : null
      );
    }
  };

  return (
    <section className="w-full my-4">
      {/* Section Header matching screenshot */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
          Global Stories
        </h2>
        <button
          onClick={() => setActiveStoryIndex(0)}
          className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          See All
        </button>
      </div>

      {/* Horizontal Scrollable Stories Container */}
      <div className="flex items-center gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar py-1 px-1 -mx-1">
        {STORIES.map((story, index) => (
          <div
            key={story.id}
            onClick={() => {
              setActiveStoryIndex(index);
              if (onCategorySelect) {
                onCategorySelect(story.categoryId);
              }
            }}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group select-none"
          >
            {/* Story Circle Avatar with Instagram/Editorial Gradient Ring */}
            <div className="relative p-[2.5px] rounded-full story-ring transition-transform duration-200 group-hover:scale-105 group-active:scale-95 shadow-sm">
              <div className="p-[2px] bg-[#F8F6F1] rounded-full">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-zinc-200">
                  <Image
                    src={story.thumbnail}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>
              </div>
            </div>

            {/* Title matching screenshot format */}
            <span className="text-[11px] sm:text-xs font-medium text-zinc-800 text-center truncate max-w-[70px] sm:max-w-[80px]">
              {story.title}
            </span>
          </div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && (
        <StoryViewerModal
          story={STORIES[activeStoryIndex]}
          onClose={() => setActiveStoryIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
};
