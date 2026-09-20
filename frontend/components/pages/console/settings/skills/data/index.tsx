"use client"

import { Database } from "lucide-react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

export function DataSkill() {
  return (
    <Field orientation="horizontal" className="items-start rounded-lg border p-3">
      <Database className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
      <FieldContent>
        <FieldTitle>Data</FieldTitle>
        <FieldDescription>
          Write SQL, explore datasets, and generate insights faster. Build
          visualizations and dashboards, and turn raw data into clear stories
          for stakeholders.
        </FieldDescription>
      </FieldContent>
      <Checkbox defaultChecked aria-label="Enable Data" />
    </Field>
  )
}
DataSkill.displayName = "DataSkill"
