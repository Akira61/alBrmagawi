export default function Content() {
  return (
    <>
      <div className="wrapper container py-20">
        <h1
          style={{ fontSize: "48px", fontWeight: 600 }}
          className="items-center text-center pb-10"
        >
          Albrmagawi provides
        </h1>
        <ul className="md:flex lg:md:flex items-center justify-between mx-auto mt-auto py-6 gap-4">
          <li className="flex-1">
            <div className="w-full items-center text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-[#1a2332] dark:border-gray-700">
              <div className="flex justify-center">
                <img
                  className="rounded-t-lg"
                  src="https://hackthebox.com/images/landingv3/home/why-1.svg"
                  alt="product image"
                />
              </div>
              <div className="px-7 pb-10">
                <h5 className="text-xl pb-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                  Courses
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Anyone can learn, from zero to hero
                </p>
              </div>
            </div>
          </li>
          <li className="flex-1">
            <div className="w-full items-center text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-[#1a2332] dark:border-gray-700 py-4">
              <div className="flex justify-center">
                <img
                  className="rounded-t-lg"
                  src="https://hackthebox.com/images/landingv3/home/why-2.svg"
                  alt="product image"
                />
              </div>
              <div className="px-7 pb-10">
                <h5 className="text-xl pb-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                  CTFs
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  There are always mountains to claimed, Chalange your self
                </p>
              </div>
            </div>
          </li>
          <li className="flex-1">
            <div className="w-full items-center text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-[#1a2332] dark:border-gray-700">
              <div className="flex justify-center">
                <img
                  className="rounded-t-lg"
                  src="https://hackthebox.com/images/landingv3/home/why-3.svg"
                  alt="product image"
                />
              </div>
              <div className="px-7 pb-10">
                <h5 className="text-xl pb-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                  Comunity
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Comunity to support you and help you
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
