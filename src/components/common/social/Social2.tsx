import { FacebookShareButton, TwitterShareButton } from "react-share";

const Social2 = () => {
  const socialContent = [
    {
      id: 1,
      icon: "icon-facebook",
      link: "http://facebok.com/",
      btn: FacebookShareButton,
    },
    {
      id: 2,
      icon: "icon-twitter",
      link: "http://twitter.com/",
      btn: TwitterShareButton,
    },
  ];

  // eslint-disable-next-line no-undef
  const currentURL = window.location.href;
  return (
    <>
      {socialContent.map((item) => (
        <div key={item.id}>
          <item.btn url={currentURL}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-center size-40 rounded-full"
              key={item.id}
            >
              <i className={`${item.icon} text-14`} />
            </a>
          </item.btn>
        </div>
      ))}
    </>
  );
};

export default Social2;
