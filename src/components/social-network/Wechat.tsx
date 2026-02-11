import { useRef } from "react";
import WechatModal from "./WechatModal";

const Wechat = () => {
  const wechatRef = useRef(null);
  return (
    <div>
      <div
        className="wechat-chat"
        onClick={() => wechatRef?.current.setIsVisible(true)}
      >
        <img
          src="/img/social-network/wechat.svg"
          width={50}
          height={50}
          alt="Wechat"
          className="object-cover rounded-full"
          loading="eager"
        />
      </div>
      <WechatModal ref={wechatRef} />
    </div>
  );
};

export default Wechat;
