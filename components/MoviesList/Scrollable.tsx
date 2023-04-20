import { useState, useRef, useEffect, ReactNode } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

type ScrollableProps = {
  children: ReactNode;
  rowID: string;
};

function Scrollable({ children, rowID }: ScrollableProps) {
  const [scrollPos, setScrollPos] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    setScrollPos(e.clientX);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!mouseDown || !containerRef.current) return;
    const diff = e.clientX - scrollPos;
    containerRef.current.scrollLeft -= diff;
    setScrollPos(e.clientX);
  };

  useEffect(() => {
    const handleMouseUpOutside = () => {
      if (mouseDown) {
        setMouseDown(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUpOutside);
      }
    };

    if (mouseDown) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUpOutside);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUpOutside);
    };
  }, [mouseDown, handleMouseMove]);

  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowID);
    if (slider) slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById('slider' + rowID);
    if (slider) slider.scrollLeft = slider.scrollLeft + 500;
  };

  const handleMouseLeave = () => {
    setMouseDown(false);
  };

  return (
    <>
      <MdChevronLeft
        onClick={slideLeft}
        className='bg-white hover:bg-neutral-300 left-0 md:-left-5 rounded-full w-8 h-8 md:w-10 md:h-10 absolute opacity-100 cursor-pointer z-10'
        size={40}
      />
      <div
        className='overflow-x-scroll overflow-y-hidden w-full h-full scrollbar-hide'
        ref={containerRef}
        id={`slider${rowID}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className='whitespace-nowrap relative mb-20 -mt-10'>
          {children}
        </div>
      </div>

      <MdChevronRight
        onClick={slideRight}
        className='bg-white hover:bg-neutral-300 right-0 md:-right-5 w-8 h-8 md:w-10 md:h-10 rounded-full absolute opacity-100 cursor-pointer z-10'
        size={40}
      />
    </>
  );
}

export default Scrollable;
