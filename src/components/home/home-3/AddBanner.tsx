import { Link } from "react-router-dom";

const AddBanner = () => {
  const addContent = [
    {
      id: 1,
      img: "/img/backgrounds/bg-1.png",
      title: (
        <>
          {" "}
          Things To Do On
          <br /> Your Trip
        </>
      ),
      meta: "",
      routerPath: "/",
      delayAnimation: "100",
    },
    {
      id: 3,
      img: "/img/backgrounds/bg-2.png",
      title: "Up to 70% Discount!",
      meta: "Enjoy Summer Deals",
      routerPath: "/",
      delayAnimation: "300",
    },
    {
      id: 2,
      img: "/img/backgrounds/bg-3.png",
      title: (
        <>
          Let Your Curiosity
          <br />
          Do The Booking
        </>
      ),
      meta: "",
      routerPath: "/",
      delayAnimation: "200",
    },
  ];

  return (
    <>
      {addContent.map((item) => (
        <div
          className="col-lg-4 col-sm-6"
          data-aos="fade"
          data-aos-delay={item.delayAnimation}
          key={item.id}
        >
          <div className="ctaCard -type-1 rounded-22 ">
            <div className="ctaCard__image-200 ratio ratio-41:45">
              <img className="js-lazy img-ratio" src={item.img} alt="image" />
            </div>
            <div className="ctaCard__content py-30 px-30 lg:py-15 lg:px-15">
              {item.meta ? (
                <>
                  <div className="text-15 fw-500 text-white mb-10">
                    Enjoy Summer Deals
                  </div>
                </>
              ) : (
                ""
              )}

              <h4 className="text-24 lg:text-18 text-white">{item.title}</h4>
              <div className="d-inline-block mt-30">
                <Link
                  to={item.routerPath}
                  className="button px-48 py-10 -blue-1 -min-180 bg-white text-dark-1"
                >
                  Khám phá
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AddBanner;
