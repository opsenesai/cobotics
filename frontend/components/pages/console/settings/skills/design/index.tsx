"use client"

import { Palette } from "lucide-react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

export function DesignSkill() {
  return (
    <Field orientation="horizontal" className="items-start rounded-lg border p-3">
      <Palette className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
      <FieldContent>
        <FieldTitle>Design</FieldTitle>
        <FieldDescription>
          Accelerate design workflows — critique, design system management, UX
          writing, accessibility audits, research synthesis, and dev handoff.
          From exploration to pixel-perfect specs.
        </FieldDescription>
      </FieldContent>
      <Checkbox defaultChecked aria-label="Enable Design" />
    </Field>
  )
}
DesignSkill.displayName = "DesignSkill"
