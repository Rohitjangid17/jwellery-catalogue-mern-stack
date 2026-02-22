import CommonBanner from "../../shared/components/customer/banner/CommonBanner";

const About = () => {
  return (
    <>
      <CommonBanner title="About Us" />

      <section class="md:p-6 p-4">
        <div className="mx-auto grid lg:grid-cols-2 lg:gap-20 md:gap-15 sm:gap-8 gap-5 items-center lg:py-14 md:py-10 py-8">
          <p class="md:text-base text-sm text-right order-2 md:order-1">
            At RJS Fine Jewels, we bring you thoughtfully curated collections that blend
            contemporary designs with timeless elegance. With over 15 years of
            experience, we cater to fashion enthusiasts who appreciate quality,
            style, and versatility.
          </p>
          <div className="text-right order-1 md:order-2">
            <h4 class="md:text-[40px] text-3xl font-medium">
              Welcome to RJS Fine Jewels
            </h4>
            <h2 class="md:text-xl text-base md:pt-6 pt-3">
              The Ultimate Fashion Destination
            </h2>
          </div>
        </div>

        <div className="sm:h-auto h-[300px]">
          <img
            src="/assets/images/about/about.jpg"
            alt="RJS Fine Jewels Fashion"
            class="w-full h-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section class="md:p-6 p-4">
        <div class="">
          <div class="text-center flex flex-col items-center mx-auto py-5">
            <h2 class="text-3xl font-medium text-gray-900 mb-4">
              Why Choose RJS Fine Jewels
            </h2>
            <p class="text-gray-600 text-base md:px-[20%] px-10">
              Our products are crafted with innovation and an eye for the latest
              trends. We push the boundaries of traditional fashion, delivering
              bold, fresh designs that inspire confidence and individuality.
            </p>
          </div>

          <div class="grid md:grid-cols-2 md:gap-10 gap-5 md:py-10 py-3">
            <div className="lg:pr-28 order-2 md:order-1">
              <img
                src="/assets/images/about/about-2.jpg"
                alt="about-image"
                className="size-full object-cover rounded-xl"
              />
            </div>

            <div className="text-right flex flex-col justify-center order-1 md:order-2">
              <div class="border-b-[1px] md:py-8 py-5 border-gray-200">
                <h4 class="md:text-2xl text-xl font-medium">
                  Ethics & Responsibility
                </h4>
                <p class="text-gray-600 md:text-base text-sm md:pt-5 pt-3">
                  At RJS Fine Jewels, we are dedicated to upholding the highest ethical
                  standards in production. We ensure mindful manufacturing
                  through regular audits, training, and responsible sourcing.
                </p>
              </div>

              <div class="border-b-[1px] md:py-8 py-5 border-gray-200">
                <h4 class="md:text-2xl text-xl font-medium">
                  Style Meets Durability
                </h4>
                <p class="text-gray-600 md:text-base text-sm md:pt-5 pt-3">
                  From classic tailoring to casual staples, our collections
                  embrace the latest trends while prioritizing comfort and
                  long-lasting quality.
                </p>
              </div>

              <div class="md:py-8 py-5">
                <h4 class="md:text-2xl text-xl font-medium">
                  Express Yourself
                </h4>
                <p class="text-gray-600 md:text-base text-sm md:pt-5 pt-3">
                  Designed for modern, style-conscious individuals, our fashion
                  allows freedom of expression and confident individuality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="md:p-6 p-4">
        <div className="mx-auto grid lg:grid-cols-2 lg:gap-20 md:gap-15 sm:gap-8 gap-5 items-center md:py-10 sm:py-8 py-5">
          <p class="md:text-base text-sm text-right order-2 md:order-1">
            Our skilled stylists have thoughtfully assembled seasonal outfits
            that are both trendy and timeless. With a variety of looks, they’re
            here to inspire your nextfashion-forward ensemble.
          </p>
          <div className="text-right order-1 md:order-2">
            <h4 class="md:text-[40px] text-3xl font-medium">
              Style Curated Just for You
            </h4>
            <h2 class="md:text-xl text-base md:pt-6 pt-3">
              Curated Fashion to Match Your Vibe
            </h2>
          </div>
        </div>
      </section>

      <section class="md:p-6 p-4">
        <div class="grid lg:grid-cols-3 sm:grid-cols-2 md:gap-12 gap-6 items-center">
          <div className="border-[1px] flex flex-col justify-center align-center p-8 text-center border-gray-200 rounded-lg">
            <div className="flex justify-center">
              <div className="border-[1px] rounded-full flex justify-center items-center border-gray-200 h-16 w-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                  />
                </svg>
              </div>
            </div>

            <h4 class="md:text-2xl text-xl font-medium pb-4 pt-6">
              Precision in Every Stitch
            </h4>
            <p class="text-gray-600 text-sm leading-relaxed">
              We use premium materials to ensure superior comfort and
              durability. Every piece is crafted with care and attention to
              detail.
            </p>
          </div>
          <div className="border-[1px] flex flex-col justify-center align-center p-8 text-center border-gray-200 rounded-lg">
            <div className="flex justify-center">
              <div className="border-[1px] rounded-full flex justify-center items-center border-gray-200 h-16 w-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </div>
            </div>

            <h4 class="md:text-2xl text-xl font-medium pb-4 pt-6">
              Effortless Elegance
            </h4>
            <p class="text-gray-600 text-sm leading-relaxed">
              Our designs embrace simplicity at its finest. RJS Fine Jewels understated
              yet refined style captures the essence of modern fashion, making a
              statement.
            </p>
          </div>
          <div className="border-[1px] flex flex-col justify-center align-center p-8 text-center border-gray-200 rounded-lg">
            <div className="flex justify-center">
              <div className="border-[1px] rounded-full flex justify-center items-center border-gray-200 h-16 w-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </div>
            </div>

            <h4 class="md:text-2xl text-xl font-medium pb-4 pt-6">
              Fashion for Every Body
            </h4>
            <p class="text-gray-600 text-sm leading-relaxed">
              We celebrate individuality with a diverse range of sizes, offering
              clothing that fits and flatters every body type. At RJS Fine Jewels,
              fashion is for everyone.
            </p>
          </div>
        </div>
      </section>

      <section class="md:py-20 py-12 md:px-6 px-4 text-white">
        <div class="md:py-20 sm:py-10 py-6 bg-[#eeffde] rounded-2xl flex flex-col justify-center items-center">
          <div className="flex ju items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#98ab23"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#98ab23"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#98ab23"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#98ab23"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#98ab23"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="md:text-xl sm:text-lg text-base text-center md:py-12 sm:py-8 py-6 text-black lg:px-[20%] px-8">
            I've ordered from many places, but I have to say, this shop offers
            the best shipping experience ever. Thank you so much for the
            outstanding service!
          </p>
          <div className="flex justify-center items-center gap-3">
            <h5 class="font-medium text-base tracking-wide text-black">
              RJS Fine Jewels P
            </h5>
            <div className="w-8 h-8">
              <img
                src="/assets/images/about/tes-about.jpg"
                alt=""
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
