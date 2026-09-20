"use client"

import { Code2 } from "lucide-react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

export function EngineeringSkill() {
  return (
    <Field orientation="horizontal" className="items-start rounded-lg border p-3">
      <Code2 className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
      <FieldContent>
        <FieldTitle>Engineering</FieldTitle>
        <FieldDescription>
          Streamline engineering workflows — standups, code review, architecture
          decisions, incident response, and technical documentation. Works with
          your existing tools or standalone.
        </FieldDescription>
      </FieldContent>
      <Checkbox defaultChecked aria-label="Enable Engineering" />
    </Field>
  )
}
EngineeringSkill.displayName = "EngineeringSkill"
