import MapComponent from "@/components/MapComponent";
import React, { useState, useRef, useEffect } from "react";
import { Trans } from "react-i18next";

const Information = ({ data }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [height, setHeight] = useState("300px");
  const [showToggle, setShowToggle] = useState(false); // Kiểm tra có cần hiện nút "Xem thêm"
  const contentRef = useRef(null);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  useEffect(() => {
    const actualHeight = contentRef.current.scrollHeight; // Chiều cao thực tế của nội dung
    if (actualHeight > 300) {
      setShowToggle(true); // Hiện nút "Xem thêm" nếu nội dung dài
    }
    if (showFullText) {
      setHeight(`${actualHeight}px`); // Chiều cao thực tế khi mở rộng
    } else {
      setHeight("300px"); // Giới hạn chiều cao ban đầu
    }
  }, [showFullText]);

  return (
    <div className="mt-20 xl:mt-15 lg:mt-10">
      <h2 className="text-32 xl:text-26 lg:text-24 fw-700 text-neutral-800 mb-4 lg:text-center">
        <Trans
          i18nKey="DESTINATIONS.INFORMATION"
          values={{ name: data?.name }}
        />
      </h2>
      <div className="row">
        <div className="col-lg-7 lg:mb-15 mt-20 lg:mt-15">
          <div
            ref={contentRef}
            style={{
              maxHeight: height,
              overflow: "hidden",
              transition: "height 0.5s ease-in-out",
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
            }}
            className="xl:text-15 lg:text-14"
          >
            {data?.content}
          </div>
          {showToggle && (
            <span
              className="d-inline-block text-primary-500 pointer fw-bold mt-3"
              onClick={toggleText}
            >
              {showFullText ? "Ẩn bớt" : "... Xem thêm"}
            </span>
          )}
        </div>
        <div className="col-lg-5">
          <MapComponent mapIFrame={data?.iframeMap} />
        </div>
      </div>
    </div>
  );
};

export default Information;
