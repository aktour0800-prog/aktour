import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";

const revealImmediately = (nodes: NodeListOf<HTMLElement>) => {
  nodes.forEach((node) => {
    node.classList.remove("reveal-init");
    node.classList.add("is-visible");
  });
};

export const useRevealOnScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nodes = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
    if (!nodes.length) {
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealImmediately(nodes);
      return;
    }

    nodes.forEach((node) => node.classList.add("reveal-init"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);
};

export default useRevealOnScroll;