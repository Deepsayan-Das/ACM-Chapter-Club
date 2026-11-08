"use client";

import Link from "next/link";
import { useState } from "react";
import { TechUrl, NonTechUrl } from "@/data/recruitmentData";

function NavLinkListItem({ link, text }: { link: string; text: string }) {
    return (
        <li>
            <Link
                href={link}
                className="p-4 block text-sm font-medium hover:text-[#005a83]"
            >
                {text}
            </Link>
        </li>
    );
}

function NavDropdown({
    text,
    items,
}: {
    text: string;
    items: { link: string; text: string }[];
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="p-4 block text-sm font-medium hover:text-[#005a83]">
                {text}
            </button>
            {isOpen && (
                <ul className="absolute left-0 mt-0 bg-white shadow-lg rounded-md min-w-[150px] z-50">
                    {items.map((item) => {
                        const isExternal =
                            item.link.startsWith("http://") ||
                            item.link.startsWith("https://");

                        return (
                            <li key={item.link}>
                                {isExternal ? (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#005a83]"
                                    >
                                        {item.text}
                                    </a>
                                ) : (
                                    <Link
                                        href={item.link}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#005a83]"
                                    >
                                        {item.text}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}

export default function Navbar() {
    const recruitmentItems = [
        { link: TechUrl, text: "Tech" },
        { link: NonTechUrl, text: "Non Tech" },
    ];

    return (
        <header>
            <nav className="flex flex-wrap items-center justify-between w-full px-4 py-3 text-lg text-gray-700 md:py-0 bg-white">
                <Link href="/" className="flex items-center cursor-pointer p-3">
                    <img
                        className="h-12 mr-3"
                        alt="jadavpur university acm student chapter logo"
                        src="/ju-acm.svg"
                    />
                    <h2 className="font-semibold text-sm leading-2 text-sky-800">
                        JU ACM
                        <br />
                        Student Chapter
                    </h2>
                </Link>
                <img
                    className="block w-6 h-6 cursor-pointer md:hidden"
                    alt="hamburger menu button"
                    src="/hamburger.png"
                />

                <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0 hidden w-full md:items-center md:w-auto">
                    <NavLinkListItem link="/" text="Home" />
                    <NavLinkListItem link="/contact" text="Contact" />
                    <NavLinkListItem link="/events" text="Events" />
                    <NavDropdown text="Recruitment" items={recruitmentItems} />
                    <NavLinkListItem link="/register" text="Register" />
                </ul>
            </nav>
        </header>
    );
}
