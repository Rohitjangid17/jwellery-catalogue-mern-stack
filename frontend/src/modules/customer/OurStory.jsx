import CommonBanner from "../../shared/components/customer/banner/CommonBanner";

const OurStory = () => {
  return (
    <>
      <CommonBanner title="Our Story" />

      <div className="mx-auto grid lg:grid-cols-2 items-center lg:py-14 md:py-10">
        <div></div>

        <div
          className="background-image w-full md:h-[400px] h-auto lg:h-[500px] lg:relative"
          style={{
            backgroundImage: "url('/assets/images/our-story/banner1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white lg:p-10 p-7 lg:absolute lg:top-10 lg:bottom-10 lg:-left-3/4 lg:w-full lg:m-auto m-10">
            <h4 className="md:text-[40px] text-3xl font-light uppercase">
              Our Story
            </h4>
            <h2 className="font-extralight text-base md:pt-6 pt-4 leading-relaxed">
              My Jewellery Shop is an independent, family-owned jewellery
              store with over 40 years of experience and expertise in the world
              of fine jewellery. We are dedicated to providing the highest
              quality service, ensuring that both you and your treasured pieces
              receive exceptional care. Specialising in exquisite jewellery
              repairs, remodelling, and custom designs, we offer a personalised,
              one-on-one design service that blends superior craftsmanship with
              meticulous attention to detail. Let us guide you through a
              seamless and informative journey toward creating your perfect
              engagement ring, turning your vision into reality from start to
              finish.
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto grid lg:grid-cols-2 items-center lg:py-14 md:py-10">
        <div
          className="background-image w-full md:h-[400px] h-auto lg:h-[500px] lg:relative"
          style={{
            backgroundImage: "url('/assets/images/our-story/banner2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white lg:p-10 p-7 lg:absolute lg:top-10 lg:bottom-10 lg:-right-3/4 lg:w-full lg:m-auto m-10">
            <h4 className="md:text-[40px] text-3xl font-light uppercase">
              About Us
            </h4>
            <h2 className="font-extralight text-base md:pt-6 pt-4 leading-relaxed">
              My Jewellery Shop is an independent, family-owned jewellery
              store with over 40 years of experience and expertise in the world
              of fine jewellery. We are dedicated to providing the highest
              quality service, ensuring that both you and your treasured pieces
              receive exceptional care. Specialising in exquisite jewellery
              repairs, remodelling, and custom designs, we offer a personalised,
              one-on-one design service that blends superior craftsmanship with
              meticulous attention to detail. Let us guide you through a
              seamless and informative journey toward creating your perfect
              engagement ring, turning your vision into reality from start to
              finish.
            </h2>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default OurStory;