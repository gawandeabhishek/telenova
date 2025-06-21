"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface TimePickerProps {
  onCancel?: () => void;
  onSet?: (time: { hour: number; minute: number; period: "AM" | "PM" }) => void;
  initialTime?: { hour: number; minute: number; period: "AM" | "PM" };
}

interface ScrollWheelProps {
  items: readonly (string | number)[]; // Fixed: Accept readonly arrays
  selectedIndex: number;
  onSelectionChange: (index: number) => void;
  className?: string;
}

const ScrollWheel: React.FC<ScrollWheelProps> = ({
  items,
  selectedIndex,
  onSelectionChange,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [scrollStartY, setScrollStartY] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const [lastMoveY, setLastMoveY] = useState(0);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Reduced height parameters
  const itemHeight = 40;
  const visibleItems = 3;
  const containerHeight = itemHeight * visibleItems;
  const centerOffset = Math.floor(visibleItems / 2) * itemHeight;
  const lastSelectedIndex = useRef(selectedIndex);

  const playTickSound = () => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        300,
        audioContext.currentTime + 0.03
      );
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.03
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.03);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  };

  // Initialize scroll position
  useEffect(() => {
    if (containerRef.current && !isDragging && !isScrolling) {
      containerRef.current.scrollTo({
        top: selectedIndex * itemHeight,
        behavior: "smooth",
      });
    }
  }, [selectedIndex, isDragging, isScrolling]);

  // Check if selection has changed and update
  const checkSelection = () => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const currentIndex = Math.round(scrollTop / itemHeight);

    if (currentIndex !== lastSelectedIndex.current) {
      lastSelectedIndex.current = currentIndex;
      onSelectionChange(currentIndex);
      playTickSound();
    }
  };

  const snapToNearest = () => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const targetIndex = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, targetIndex));

    containerRef.current.scrollTo({
      top: clampedIndex * itemHeight,
      behavior: "smooth",
    });

    if (clampedIndex !== selectedIndex) {
      onSelectionChange(clampedIndex);
      playTickSound();
    }
  };

  const handleMomentumScroll = () => {
    if (!containerRef.current) return;

    checkSelection(); // Check for selection changes during momentum

    if (Math.abs(momentum) < 0.5) {
      setIsScrolling(false);
      snapToNearest();
      return;
    }

    const currentScroll = containerRef.current.scrollTop;
    const newScroll = currentScroll + momentum;

    containerRef.current.scrollTop = Math.max(
      0,
      Math.min((items.length - 1) * itemHeight, newScroll)
    );

    setMomentum(momentum * 0.92);
    requestAnimationFrame(handleMomentumScroll);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsScrolling(true);
    setDragStartY(e.clientY);
    setScrollStartY(containerRef.current?.scrollTop || 0);
    setMomentum(0);
    setLastMoveY(e.clientY);
    setLastMoveTime(Date.now());

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const deltaY = e.clientY - dragStartY;
    const newScrollTop = scrollStartY - deltaY;

    containerRef.current.scrollTop = Math.max(
      0,
      Math.min((items.length - 1) * itemHeight, newScrollTop)
    );

    checkSelection(); // Check for selection changes during drag

    const now = Date.now();
    const timeDelta = now - lastMoveTime;
    if (timeDelta > 0) {
      const velocity = (e.clientY - lastMoveY) / timeDelta;
      setMomentum(-velocity * 8);
    }

    setLastMoveY(e.clientY);
    setLastMoveTime(now);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    requestAnimationFrame(handleMomentumScroll);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Selection indicator */}
      <div
        className="absolute left-0 right-0 border-t border-b border-indigo-200 bg-indigo-50/30 pointer-events-none z-10 rounded"
        style={{
          top: centerOffset,
          height: itemHeight,
        }}
      />

      <div
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        style={{
          scrollSnapType: "y mandatory",
          paddingTop: centerOffset,
          paddingBottom: centerOffset,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {items.map((item, index) => {
          const distance = Math.abs(index - selectedIndex);
          const opacity = Math.max(0.3, 1 - distance * 0.2);
          const scale = Math.max(0.85, 1 - distance * 0.1);

          return (
            <div
              key={index}
              className={`flex items-center justify-center transition-all duration-200 select-none cursor-pointer ${
                index === selectedIndex
                  ? "text-indigo-600 font-bold text-xl"
                  : "text-gray-400 text-base hover:text-gray-600"
              }`}
              style={{
                height: itemHeight,
                scrollSnapAlign: "center",
                opacity,
                transform: `scale(${scale})`,
              }}
              onClick={() => {
                onSelectionChange(index);
                playTickSound();
                containerRef.current?.scrollTo({
                  top: index * itemHeight,
                  behavior: "smooth",
                });
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function TimePicker({
  onCancel,
  onSet,
  initialTime = { hour: 12, minute: 0, period: "AM" },
}: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [isVisible, setIsVisible] = useState(true);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ["AM", "PM"] as const;

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center gap-4">
        <ScrollWheel
          items={hours}
          selectedIndex={hours.indexOf(selectedTime.hour)}
          onSelectionChange={(index) =>
            setSelectedTime((prev) => ({ ...prev, hour: hours[index] }))
          }
          className="w-14"
        />

        <ScrollWheel
          items={minutes.map((m) => m.toString().padStart(2, "0"))}
          selectedIndex={selectedTime.minute}
          onSelectionChange={(index) =>
            setSelectedTime((prev) => ({ ...prev, minute: index }))
          }
          className="w-16"
        />

        <ScrollWheel
          items={periods}
          selectedIndex={periods.indexOf(selectedTime.period)}
          onSelectionChange={(index) =>
            setSelectedTime((prev) => ({ ...prev, period: periods[index] }))
          }
          className="w-14"
        />
      </div>
    </div>
  );
}
