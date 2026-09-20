"use client"

import { useMemo, useState } from "react"
import {
  Database,
  Code2,
  Settings2,
  Scale,
  Palette,
  type LucideIcon,
} from "lucide-react"

import { SkillSearch } from "./skill-search"
import { SkillGrid } from "./skill-grid"
import { SkillCard } from "./skill-card"

interface SkillItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

const SKILLS: SkillItem[] = [
  {
    id: "data",
    title: "Data",
    icon: Database,
    description:
      "Write SQL, explore datasets, and generate insights faster. Build visualizations and dashboards, and turn raw data into clear stories for stakeholders.",
  },
  {
    id: "engineering",
    title: "Engineering",
    icon: Code2,
    description:
      "Streamline engineering workflows — standups, code review, architecture decisions, incident response, and technical documentation. Works with your existing tools or standalone.",
  },
  {
    id: "operations",
    title: "Operations",
    icon: Settings2,
    description:
      "Optimize business operations — vendor management, process documentation, change management, capacity planning, and compliance tracking. Keep your organization running efficiently.",
  },
  {
    id: "legal",
    title: "Legal",
    icon: Scale,
    description:
      "Speed up contract review, NDA triage, and compliance workflows for in-house legal teams. Draft legal briefs, organize precedent research, and manage institutional knowledge.",
  },
  {
    id: "design",
    title: "Design",
    icon: Palette,
    description:
      "Accelerate design workflows — critique, design system management, UX writing, accessibility audits, research synthesis, and dev handoff. From exploration to pixel-perfect specs.",
  },
]

export function Skills() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SKILLS
    return SKILLS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="flex flex-col gap-4">
      <SkillSearch value={query} onValueChange={setQuery} />

      {filtered.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No skills match “{query}”.
        </p>
      ) : (
        <SkillGrid>
          {filtered.map((skill) => (
            <SkillCard
              key={skill.id}
              title={skill.title}
              icon={skill.icon}
            />
          ))}
        </SkillGrid>
      )}
    </div>
  )
}
Skills.displayName = "Skills"
