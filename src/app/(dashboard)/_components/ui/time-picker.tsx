"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TimePickerProps {
  value?: { hour: number; minute: number; period: "AM" | "PM" };
  onValueChange?: (time: {
    hour: number;
    minute: number;
    period: "AM" | "PM";
  }) => void;
  className?: string;
}

interface ScrollWheelProps {
  items: readonly (string | number)[];
  selectedIndex: number;
  onSelectionChange: (index: number) => void;
  className?: string;
  ariaLabel?: string;
}

interface TouchData {
  startY: number;
  startTime: number;
  lastY: number;
  lastTime: number;
}

const ScrollWheel: React.FC<ScrollWheelProps> = ({
  items,
  selectedIndex,
  onSelectionChange,
  className = "",
  ariaLabel = "Time picker wheel",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [scrollStartY, setScrollStartY] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const [lastMoveY, setLastMoveY] = useState(0);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchData, setTouchData] = useState<TouchData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const itemHeight = 40;
  const visibleItems = 3;
  const containerHeight = itemHeight * visibleItems;
  const centerOffset = Math.floor(visibleItems / 2) * itemHeight;
  const lastSelectedIndex = useRef(selectedIndex);
  const animationFrameRef = useRef<number | null>(null);
  const isExternalUpdate = useRef(false);
  const selectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMouseOutside = useRef(false);

  const playTickSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext)();
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
      console.debug("Audio context not available:", error);
    }
  }, []);

  const clampScrollPosition = useCallback(
    (position: number): number => {
      return Math.max(0, Math.min((items.length - 1) * itemHeight, position));
    },
    [items.length, itemHeight]
  );

  const updateSelection = useCallback(() => {
    if (!containerRef.current || isExternalUpdate.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const currentIndex = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, currentIndex));

    if (clampedIndex !== lastSelectedIndex.current) {
      lastSelectedIndex.current = clampedIndex;
      onSelectionChange(clampedIndex);
      playTickSound();
    }
  }, [itemHeight, items.length, onSelectionChange, playTickSound]);

  const debouncedUpdateSelection = useCallback(() => {
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current);
    }

    selectionTimeoutRef.current = setTimeout(() => {
      updateSelection();
    }, 50);
  }, [updateSelection]);

  const snapToNearest = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const targetIndex = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, targetIndex));
    const targetScrollTop = clampedIndex * itemHeight;

    // Only snap if we're not already at the target position
    if (Math.abs(scrollTop - targetScrollTop) > 1) {
      containerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }

    // Update selection after snapping
    setTimeout(() => {
      updateSelection();
    }, 100);
  }, [itemHeight, items.length, updateSelection]);

  const handleMomentumScroll = useCallback(() => {
    if (!containerRef.current) {
      setIsScrolling(false);
      return;
    }

    if (Math.abs(momentum) < 0.5) {
      setIsScrolling(false);
      snapToNearest();
      return;
    }

    const currentScroll = containerRef.current.scrollTop;
    const newScroll = clampScrollPosition(currentScroll + momentum);

    containerRef.current.scrollTop = newScroll;
    setMomentum(momentum * 0.92);

    // Only update selection occasionally during momentum scroll
    if (Math.abs(momentum) < 2) {
      debouncedUpdateSelection();
    }

    animationFrameRef.current = requestAnimationFrame(handleMomentumScroll);
  }, [momentum, snapToNearest, clampScrollPosition, debouncedUpdateSelection]);

  // Initialize and sync scroll position with selectedIndex
  useEffect(() => {
    if (!containerRef.current) return;

    const targetScrollTop = selectedIndex * itemHeight;
    const currentScrollTop = containerRef.current.scrollTop;

    // Only update if there's a significant difference and we're not currently dragging/scrolling
    if (
      Math.abs(targetScrollTop - currentScrollTop) > 5 &&
      !isDragging &&
      !isScrolling
    ) {
      isExternalUpdate.current = true;

      if (!isInitialized) {
        // Initial positioning without animation
        containerRef.current.scrollTop = targetScrollTop;
        setIsInitialized(true);
      } else {
        // Smooth scroll for subsequent updates
        containerRef.current.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }

      // Reset the flag after a short delay
      setTimeout(() => {
        isExternalUpdate.current = false;
      }, 200);
    }

    lastSelectedIndex.current = selectedIndex;
  }, [selectedIndex, isDragging, isScrolling, itemHeight, isInitialized]);

  // Cleanup timeouts and animation frames
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
      }
    };
  }, []);

  // Global mouse events for handling drag outside the component
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      e.preventDefault();
      const deltaY = e.clientY - dragStartY;
      const newScrollTop = clampScrollPosition(scrollStartY - deltaY);

      containerRef.current.scrollTop = newScrollTop;

      const now = Date.now();
      const timeDelta = now - lastMoveTime;
      if (timeDelta > 0) {
        const velocity = (e.clientY - lastMoveY) / timeDelta;
        setMomentum(-velocity * 8);
      }

      setLastMoveY(e.clientY);
      setLastMoveTime(now);
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;

      setIsDragging(false);
      isMouseOutside.current = false;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Start momentum scroll or snap to nearest
      if (Math.abs(momentum) > 0.5) {
        animationFrameRef.current = requestAnimationFrame(handleMomentumScroll);
      } else {
        setIsScrolling(false);
        snapToNearest();
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [
    isDragging,
    dragStartY,
    scrollStartY,
    lastMoveTime,
    lastMoveY,
    momentum,
    clampScrollPosition,
    handleMomentumScroll,
    snapToNearest,
  ]);

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
    isExternalUpdate.current = false;
    isMouseOutside.current = false;

    // Clear any pending selection updates
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const deltaY = e.clientY - dragStartY;
    const newScrollTop = clampScrollPosition(scrollStartY - deltaY);

    containerRef.current.scrollTop = newScrollTop;

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
    if (!isDragging) return;

    setIsDragging(false);
    isMouseOutside.current = false;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Start momentum scroll or snap to nearest
    if (Math.abs(momentum) > 0.5) {
      animationFrameRef.current = requestAnimationFrame(handleMomentumScroll);
    } else {
      setIsScrolling(false);
      snapToNearest();
    }
  };

  const handleMouseLeave = () => {
    // Only mark as outside, don't end the drag
    isMouseOutside.current = true;
  };

  const handleMouseEnter = () => {
    isMouseOutside.current = false;
  };

  // Touch events for mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;

    setIsDragging(true);
    setIsScrolling(true);
    setTouchData({
      startY: touch.clientY,
      startTime: Date.now(),
      lastY: touch.clientY,
      lastTime: Date.now(),
    });
    setScrollStartY(containerRef.current?.scrollTop || 0);
    setMomentum(0);
    isExternalUpdate.current = false;

    // Clear any pending selection updates
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || !touchData) return;

    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;

    const deltaY = touch.clientY - touchData.startY;
    const newScrollTop = clampScrollPosition(scrollStartY - deltaY);

    containerRef.current.scrollTop = newScrollTop;

    const now = Date.now();
    const timeDelta = now - touchData.lastTime;
    if (timeDelta > 0) {
      const velocity = (touch.clientY - touchData.lastY) / timeDelta;
      setMomentum(-velocity * 8);
    }

    setTouchData({
      ...touchData,
      lastY: touch.clientY,
      lastTime: now,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchData(null);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Start momentum scroll or snap to nearest
    if (Math.abs(momentum) > 0.5) {
      animationFrameRef.current = requestAnimationFrame(handleMomentumScroll);
    } else {
      setIsScrolling(false);
      snapToNearest();
    }
  };

  // Handle scroll events (mouse wheel, etc.)
  const handleScroll = useCallback(() => {
    if (!isDragging && !isScrolling) {
      debouncedUpdateSelection();
    }
  }, [isDragging, isScrolling, debouncedUpdateSelection]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.max(0, selectedIndex - 1);
      onSelectionChange(newIndex);
      playTickSound();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.min(items.length - 1, selectedIndex + 1);
      onSelectionChange(newIndex);
      playTickSound();
    }
  };

  // Handle item click
  const handleItemClick = (index: number) => {
    if (index === selectedIndex) return;

    onSelectionChange(index);
    playTickSound();

    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height: containerHeight }}
      role="listbox"
      aria-label={ariaLabel}
      aria-activedescendant={`item-${selectedIndex}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Selection indicator */}
      <div
        className="absolute left-0 right-0 border-t border-b border-indigo-200 bg-indigo-50/30 pointer-events-none z-10 rounded"
        style={{
          top: centerOffset,
          height: itemHeight,
        }}
        aria-hidden="true"
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
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onScroll={handleScroll}
      >
        {items.map((item, index) => {
          const distance = Math.abs(index - selectedIndex);
          const opacity = Math.max(0.3, 1 - distance * 0.2);
          const scale = Math.max(0.85, 1 - distance * 0.1);
          const isSelected = index === selectedIndex;

          return (
            <div
              key={index}
              id={`item-${index}`}
              role="option"
              aria-selected={isSelected}
              className={`flex items-center justify-center transition-all duration-200 select-none cursor-pointer ${
                isSelected
                  ? "text-indigo-600 font-bold text-xl"
                  : "text-gray-400 text-base hover:text-gray-600"
              }`}
              style={{
                height: itemHeight,
                scrollSnapAlign: "center",
                opacity,
                transform: `scale(${scale})`,
              }}
              onClick={() => handleItemClick(index)}
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
  value = { hour: 1, minute: 0, period: "AM" },
  onValueChange,
  className = "",
}: TimePickerProps) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ["AM", "PM"] as const;

  const handleTimeChange = useCallback(
    (type: "hour" | "minute" | "period", index: number) => {
      if (!onValueChange) return;

      const newTime = { ...value };

      switch (type) {
        case "hour":
          newTime.hour = hours[index];
          break;
        case "minute":
          newTime.minute = index;
          break;
        case "period":
          newTime.period = periods[index];
          break;
      }

      onValueChange(newTime);
    },
    [value, onValueChange, hours, periods]
  );

  // Ensure we have valid indices
  const hourIndex = Math.max(0, hours.indexOf(value.hour));
  const minuteIndex = Math.max(0, Math.min(59, value.minute));
  const periodIndex = Math.max(0, periods.indexOf(value.period));

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="text-center">
        <ScrollWheel
          items={hours}
          selectedIndex={hourIndex}
          onSelectionChange={(index) => handleTimeChange("hour", index)}
          className="w-14"
          ariaLabel="Select hour"
        />
      </div>

      <div className="text-center">
        <ScrollWheel
          items={minutes.map((m) => m.toString().padStart(2, "0"))}
          selectedIndex={minuteIndex}
          onSelectionChange={(index) => handleTimeChange("minute", index)}
          className="w-16"
          ariaLabel="Select minute"
        />
      </div>

      <div className="text-center">
        <ScrollWheel
          items={periods}
          selectedIndex={periodIndex}
          onSelectionChange={(index) => handleTimeChange("period", index)}
          className="w-14"
          ariaLabel="Select AM or PM"
        />
      </div>
    </div>
  );
}

// Export types for external use
export type { TimePickerProps };
