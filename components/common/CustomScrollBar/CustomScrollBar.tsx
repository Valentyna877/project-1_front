'use client';

import { useEffect, useState } from "react";

export default function CustomScrollbar() {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      if (docHeight <= winHeight) {
        setVisible(false);
        return;
      }

      setVisible(true);

      const rawThumbH = (winHeight / docHeight) * winHeight;
      const thumbH = Math.max(Math.min(rawThumbH, winHeight * 0.5), 40);
      setThumbHeight(thumbH);

      const trackHeight = winHeight - thumbH;
      const thumbT = (scrollTop / (docHeight - winHeight)) * trackHeight;
      setThumbTop(thumbT);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="scrollbar">
      <div
        className="scrollThumb"
        style={{ height: thumbHeight, top: thumbTop }}
      />
    </div>
  );
}
