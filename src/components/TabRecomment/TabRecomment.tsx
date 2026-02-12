import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import "./TabRecomment.styles.scss";

interface TabRecommentProps {
  handleRecommentItem: (id: number, value: any) => void;
  listTabs: any[];
  defaultActive?: number;
}

const TabRecomment = ({ handleRecommentItem, listTabs, defaultActive = 1 }: TabRecommentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemActive, setItemActive] = useState(defaultActive); // Default active item
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    setList(listTabs);
  }, [listTabs]);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current as HTMLDivElement;
      const activeIndex = list.findIndex((item: any) => item.id === itemActive);
      const activeItem = container.children[activeIndex] as HTMLElement;

      if (activeItem) {
        const containerWidth = container.offsetWidth;
        const activeItemWidth = activeItem.offsetWidth;
        const activeItemLeft = activeItem.offsetLeft;

        const scrollLeft =
          activeItemLeft - containerWidth / 2 + activeItemWidth / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [itemActive, list]);

  const handleItemClick = (id: number, value: any) => {
    setItemActive(id);

    // Reorder items to make the clicked item move to the center
    const activeItem = list.find((item: any) => item.id === id);
    const updatedList = list.filter((item: any) => item.id !== id);

    // Place the active item in the middle of the list
    const middleIndex = Math.floor(updatedList.length / 2);
    updatedList.splice(middleIndex, 0, activeItem);

    setList(updatedList);
    handleRecommentItem(id, value);
  };

  return (
    <div className="mb-40">
      <div
        className="row w-1/1 menu-container justify-content-center align-items-center m-auto"
        ref={containerRef}
      >
        {list.map((item: any) => (
          <div
            key={item.id}
            className={classNames(
              " col-xl-auto text-center px-10  menu-item xl:py-10 ",
              {
                "col-12  fade xl:order-1 ": item.id === itemActive,
                "col-6 xl:order-2 col-md-4":
                  item.id !== itemActive && (list.length - 1) % 3 === 0,
                "col-6 xl:order-2 col-md-3":
                  item.id !== itemActive && (list.length - 1) % 2 === 0, // Add fade-in animation for active item
              }
            )}
          >
            <div
              className={classNames("cursor-pointer", {
                "xl:w-1/2 mx-auto ": item.id === itemActive,
                "w-1/1 ": item.id !== itemActive,
              })}
              onClick={() => handleItemClick(item.id, item)}
            >
              <div
                className={classNames("rounded-8 py-15", {
                  "border-primary-500": item.id === itemActive,
                  "border-light": item.id !== itemActive,
                })}
              >
                {item.id === itemActive ? item.imgActive : item.img}
                <p
                  className={classNames("text-12 lg:text-11 fw-400", {
                    "text-primary-500": item.id === itemActive,
                    "text-neutral-500": item.id !== itemActive,
                  })}
                >
                  {item?.description || ""}
                </p>
              </div>
              <p
                className={classNames("fw-500 mt-8", {
                  "text-primary-500 text-16 xl:text-15 lg:text-14":
                    item.id === itemActive,
                  "text-neutral-800 text-12": item.id !== itemActive,
                })}
              >
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabRecomment;
