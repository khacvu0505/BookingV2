import ScrollToTop from "@/components/common/ScrollTop";
import KakaoTalkModal from "@/components/social-network/KakaoTalkModal";
import WechatModal from "@/components/social-network/WechatModal";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

const SocialWrap = () => {
  const kakaoTalkRef = useRef(null);
  const wechatRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeToogle, setActiveToogle] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setActiveToogle(false);
      // eslint-disable-next-line no-undef
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // eslint-disable-next-line no-undef
    window.addEventListener("scroll", toggleVisibility);

    // eslint-disable-next-line no-undef
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [isVisible]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    ZaloSocialSDK.reload();
  }, []);

  return (
    <>
      <div className="social-icon-chat">
        <div
          className={classNames("menu-social-icon", {
            active: activeToogle,
          })}
        >
          <div
            className={classNames("toogle")}
            onClick={() => {
              setActiveToogle(!activeToogle);
            }}
          >
            <i className="ri-message-3-line text-blue-1"></i>
          </div>
          <li className="social-icon-1">
            <img
              src="/img/social-network/icon-kakaotalk.png"
              alt="KakaoTalk"
              className="object-cover"
              loading="eager"
              onClick={() => {
                kakaoTalkRef?.current.setIsVisible(true);
                setActiveToogle(false);
              }}
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </li>
          <li className="social-icon-2">
            <a
              href={`https://m.me/okdimalltravel`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setActiveToogle(false);
              }}
            >
              <img
                src="/img/social-network/icon-messenger.png"
                alt="Messenger"
                className="object-cover"
                loading="eager"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </a>
          </li>
          <li className="social-icon-3">
            <div
              onClick={() => {
                wechatRef?.current.setIsVisible(true);
                setActiveToogle(false);
              }}
            >
              <img
                src="/img/social-network/icon-wechat.png"
                alt="Wechat"
                className="object-cover rounded-full"
                loading="eager"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
          </li>
          <li className="social-icon-4">
            <a
              href={`https://zalo.me/1015963757505537528`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setActiveToogle(false);
              }}
            >
              <img
                src="/img/social-network/icon-zalo.png"
                alt="zalo"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </a>
          </li>
        </div>
      </div>
      {!activeToogle && <ScrollToTop />}
      <KakaoTalkModal ref={kakaoTalkRef} />
      <WechatModal ref={wechatRef} />
    </>
  );
};

export default SocialWrap;
