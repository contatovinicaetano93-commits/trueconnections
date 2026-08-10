"use client";

import { useEffect, useState } from "react";

type SectionId =
  | "topo"
  | "manifesto"
  | "associados"
  | "encontros"
  | "eventos"
  | "impacto"
  | "loja"
  | "contato";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "topo", label: "Início" },
  { id: "manifesto", label: "Quem Somos" },
  { id: "associados", label: "Clube & Rede" },
  { id: "encontros", label: "Encontros" },
  { id: "eventos", label: "Eventos" },
  { id: "impacto", label: "Impacto" },
  { id: "loja", label: "Loja" },
  { id: "contato", label: "Fale Conosco" },
];

function isSectionId(id: string): id is SectionId {
  return SECTIONS.some((section) => section.id === id);
}

export function SideGuide() {
  const [activeId, setActiveId] = useState<SectionId>("topo");

  useEffect(() => {
    const elements = SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const pickActive = () => {
      const midpoint = window.innerHeight * 0.35;
      let current: SectionId = "topo";
      for (const el of elements) {
        if (el.getBoundingClientRect().top - midpoint <= 0 && isSectionId(el.id)) {
          current = el.id;
        }
      }
      setActiveId(current);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const id = visible[0]?.target.id;
        if (id && isSectionId(id)) {
          setActiveId(id);
          return;
        }

        pickActive();
      },
      {
        threshold: [0.15, 0.35, 0.55],
        rootMargin: "-20% 0px -45% 0px",
      },
    );

    for (const el of elements) observer.observe(el);

    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
    };
  }, []);

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <nav className="side-guide" aria-label="Navegação da página">
      <ul className="side-guide__list">
        {SECTIONS.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                type="button"
                className={`side-guide__item${active ? " is-active" : ""}`}
                aria-current={active ? "true" : undefined}
                onClick={() => scrollTo(section.id)}
              >
                <span className="side-guide__label">{section.label}</span>
                <span className="side-guide__dot" aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
