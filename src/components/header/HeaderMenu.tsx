import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/HeaderMenu.module.css";
import { useWindowSize } from "../../hooks/useWindowSize.ts";
import { useScrollLock } from "../../hooks/useScrollLock.ts";

interface MenuProps {}

const HeaderMenu: FC<MenuProps> = ({}) => {
  const [open, setOpen] = useState(false);

  // Get window size -> Get menu icon position on resize -> Place menu on that position
  const size = useWindowSize();
  const MenuIconRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 1610, y: 24 });

  useEffect(() => {
    if (MenuIconRef.current) {
      const { x, y } = MenuIconRef.current.getBoundingClientRect();
      setMenuPosition({ x, y });
    }
  }, [size]);

  // Disable scroll if menu is open

  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    if (open) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [open]);

  // Links

  const links: { title: string; href: string }[] = [
    { title: "About me", href: "/#" },
    { title: "Experience", href: "#experience" },
    { title: "Get in touch", href: "#contact" },
  ];

  const socialLinks: { title: string; href: string }[] = [
    { title: "Email", href: "mailto:santibeta82@gmail.com" },
    { title: "Github", href: "https://github.com/sbetav" },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/santiago-betancur",
    },
  ];

  return (
    <>
      <button
        className="group flex items-center gap-3 text-2xl"
        onClick={() => setOpen(!open)}
      >
        Menu
        <div ref={MenuIconRef}>
          <svg
            className="mt-[2px] rounded-full p-[6px] transition group-hover:bg-gray-bg group-hover:text-white"
            width="38"
            height="38"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.83398 6.66699H21.7229M4.83398 13.0003H13.2784M4.83398 19.3337H21.7229"
              stroke="currentColor"
              strokeWidth="2.11111"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </button>
      {/* FULL SCREEN MENU */}
      <div
        style={{
          clipPath: `circle(0px at ${menuPosition.x + 22}px ${
            menuPosition.y + 12
          }px)`,
          transition: "clip-path 0.5s ease-out",
        }}
        className={`fixed left-0 top-0 h-screen w-full bg-gray-bg text-white ${
          open && styles.open
        }`}
      >
        {/* BACKGROUND IMAGE */}
        <img
          src="/topographic-background.svg"
          width={1000}
          height={1000}
          className="absolute left-0 top-0 h-full w-full object-cover opacity-[0.03]"
          alt="Topographic background"
        />
        <div className="mx-auto w-full max-w-screen-2xl px-8 md:px-20 relative flex h-full flex-col items-center justify-center gap-20 py-6 lg:flex-row lg:justify-between">
          <button
            onClick={() => setOpen(!open)}
            className="group absolute right-8 top-6 flex items-center gap-3 text-2xl text-white md:right-20"
          >
            Close
            <svg
              className="mt-[2px] rounded-full p-[6px] transition group-hover:bg-white group-hover:text-black"
              width={36}
              height={36}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 29L29 3M3 3L29 29"
                stroke="currentColor"
                strokeWidth="2.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <nav className="flex flex-col gap-14">
            <ul className="group/links flex flex-col gap-6 text-3xl sm:gap-8 sm:text-5xl lg:gap-10 lg:pl-20 lg:text-7xl">
              {links.map(({ title, href }, i) => (
                <li key={i}>
                  <a
                    onClick={() => setOpen(false)}
                    href={href}
                    className="group flex items-center gap-4 transition hover:!opacity-100 group-hover/links:opacity-30"
                  >
                    <span>{title}</span>
                    <svg
                      className={`hidden w-7 opacity-0 transition group-hover:opacity-100 sm:w-10 lg:mt-2 lg:block lg:w-[60px] ${styles.arrowAnimation}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            {/* MOBILE SOCIAL LINKS */}
            <ul className="flex gap-5 lg:hidden">
              <>
                <li>
                  <a href="https://github.com/sbetav" target="_blank">
                    <svg
                      className="w-7 sm:w-9"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="sr-only">Github</span>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/santiago-betancur"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 sm:w-9"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </li>
              </>
            </ul>
          </nav>

          {/* DESKTOP SOCIAL LINKS */}
          <div className="hidden flex-col gap-8 pr-20 text-2xl lg:flex">
            <>
              <h2 className=" font-semibold">Contact info</h2>
            </>

            <ul className="font group/social flex flex-col gap-4">
              {socialLinks.map(({ title, href }, i) => (
                <li key={i}>
                  <a
                    href={href}
                    className="group flex items-end gap-2 transition hover:!opacity-100 group-hover/social:opacity-30"
                    target="_blank"
                  >
                    <span>{title}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="#f8ecfe"
                      viewBox="0 0 256 256"
                      className="mb-2 transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    >
                      <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z"></path>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
