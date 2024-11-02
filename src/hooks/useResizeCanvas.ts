import { useEffect, useState, useRef } from "react";

const useResizeCanvas = (horizontalPadding = 24, verticalPadding = 24, titleHeight = 48) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          const newWidth = width - horizontalPadding * 2;
          const newHeight = height - titleHeight - verticalPadding;

          // 仅在宽度或高度实际发生变化时更新状态
          if (
            Math.abs(newWidth - canvasSize.width) > 1 || // 增加容差，避免浮点数问题
            Math.abs(newHeight - canvasSize.height) > 1
          ) {
            setCanvasSize({
              width: newWidth,
              height: newHeight,
            });
          }
        }
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return { containerRef, canvasSize };
};

export default useResizeCanvas;
