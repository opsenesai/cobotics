"use client"

import { Scale } from "lucide-react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

export function LegalSkill() {
  return (
    <Field orientation="horizontal" className="items-start rounded-lg border p-3">
      <Scale className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
      <FieldContent>
        <FieldTitle>Legal</FieldTitle>
        <FieldDescription>
          Speed up contract review, NDA triage, and compliance workflows for
          in-house legal teams. Draft legal briefs, organize precedent research,
          and manage institutional knowledge.
        </FieldDescription>
      </FieldContent>
      <Checkbox defaultChecked aria-label="Enable Legal" />
    </Field>
  )
}
LegalSkill.displayName = "LegalSkill"
