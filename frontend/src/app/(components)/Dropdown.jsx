"use client";
import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Dropdown({ title, items }) {
  return (
    <div>
      <Menu>
        <Menu.Button>{title}</Menu.Button>
        <Menu.Items
          className={`focus:outline-none absolute origin-top-left w-fit divide-y p-4 text-black divide-gray-100 rounded-md bg-white shadow-lg`}
        >
          {items.map((item, index) => (
            <div key={index} className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active && "text-gray-500"} w-full`}
                    href={item.link}
                  >
                    {item.title}
                  </a>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}
