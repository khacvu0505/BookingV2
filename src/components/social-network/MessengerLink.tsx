import React from "react";

const MessengerLink = () => {
  const pageUsername = "okdimalltravel";

  return (
    <div className="messenger-chat">
      <a
        href={`https://m.me/${pageUsername}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
          width={50}
          height={50}
          alt="Messenger"
          className="object-cover"
          loading="eager"
        />
      </a>
    </div>
  );
};

export default MessengerLink;
