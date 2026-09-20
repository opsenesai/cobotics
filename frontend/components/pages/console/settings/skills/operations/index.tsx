"use client"

import { Settings2 } from "lucide-react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

export function OperationsSkill() {
  return (
    <Field orientation="horizontal" className="items-start rounded-lg border p-3">
      <Settings2 className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
      <FieldContent>
        <FieldTitle>Operations</FieldTitle>
        <FieldDescription>
          Optimize business operations — vendor management, process
          documentation, change management, capacity planning, and compliance
          tracking. Keep your organization running efficiently.
        </FieldDescription>
      </FieldContent>
      <Checkbox defaultChecked aria-label="Enable Operations" />
    </Field>
  )
}
OperationsSkill.displayName = "OperationsSkill"
