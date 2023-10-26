"use client";

import Box from "@/app/(components)/ctf/Box";
import { useRouter } from "next/navigation";

export default function RegisterPanel() {
  const router = useRouter();

  return (
    <>
      <div className="px-4 py-8 flex items-center flex-col gap-4">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Join As
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Choose registeration option
        </p>
        <Box>
          <button
            onClick={() => router.push("/register?type=student")}
            className="p-8 flex items-center justify-center gap-4 flex-col"
          >
            <img
              src="/student.svg"
              alt=""
              className="md:h-32 sm:h-auto max-w-full rounded-lg"
            />
            <p className="md:mt-8 text-base text-gray-500 sm:text-lg dark:text-gray-400">
              Student
            </p>
          </button>
        </Box>
      </div>
    </>
  );
}
