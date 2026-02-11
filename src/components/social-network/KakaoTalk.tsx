import { useRef } from "react";
import KakaoTalkModal from "./KakaoTalkModal";

const KakaoTalk = () => {
  const kakaoTalkRef = useRef(null);
  return (
    <div>
      <div
        className="kakaoTalk-chat"
        onClick={() => kakaoTalkRef?.current.setIsVisible(true)}
      >
        <img
          src="/img/social-network/KakaoTalk_logo.svg"
          width={50}
          height={50}
          alt="KakaoTalk"
          className="object-cover rounded-full"
          loading="eager"
        />
      </div>
      <KakaoTalkModal ref={kakaoTalkRef} />
    </div>
  );
};

export default KakaoTalk;
