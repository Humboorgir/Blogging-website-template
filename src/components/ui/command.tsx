"use client";

import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";

export const Command = CommandPrimitive;
export const CommandInput = CommandPrimitive.Input;
export const CommandList = CommandPrimitive.List;
export const CommandEmpty = CommandPrimitive.Empty;
export const CommandGroup = CommandPrimitive.Group;
export const CommandItem = CommandPrimitive.Item;
export function CommandWrapper({ className = "", ...props }: ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive className={className} {...props} />;
}
