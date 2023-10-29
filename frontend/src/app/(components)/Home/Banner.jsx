import Head from "next/head";
import React from "react";

export default function Banner() {
  return (
    <div>
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.0.0/flowbite.min.css"
          rel="stylesheet"
        />
      </Head>
      <div
        id="custom-controls-gallery"
        className="relative w-full"
        data-carousel="slide"
      >
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {/* Item 1 */}
          <div
            className="hidden duration-700 ease-in-out"
            data-carousel-item=""
          >
            <img
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
              className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt=""
            />
          </div>
          {/* Item 2 */}
          <div
            className="hidden duration-700 ease-in-out"
            data-carousel-item="active"
          >
            <img
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
              className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt=""
            />
          </div>
          {/* Item 3 */}
          <div
            className="hidden duration-700 ease-in-out"
            data-carousel-item=""
          >
            <img
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt=""
            />
          </div>
          {/* Item 4 */}
          <div
            className="hidden duration-700 ease-in-out"
            data-carousel-item=""
          >
            <img
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
              className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt=""
            />
          </div>
          {/* Item 5 */}
          <div
            className="hidden duration-700 ease-in-out"
            data-carousel-item=""
          >
            <img
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
              className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt=""
            />
          </div>
        </div>
        <div className="flex justify-center items-center pt-4">
          <button
            type="button"
            className="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none"
            data-carousel-prev=""
          >
            <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
            data-carousel-next=""
          >
            <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.0.0/flowbite.min.js"></script>
    </div>
  );
}
