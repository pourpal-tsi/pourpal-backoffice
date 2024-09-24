"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/shadcn";
import { Button } from "@/components/shadcnui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcnui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcnui/command";

export interface ComboBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  items: { value: string; label: string }[];
  selectedItem?: string;
  onItemChange?: (item: string) => void;
  placeholderMessage?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

const ComboBox = ({
  items,
  onItemChange,
  selectedItem,
  placeholderMessage = "Select...",
  emptyMessage = "No matches found",
  disabled,
}: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex w-full justify-between p-2 font-normal placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {selectedItem
            ? items.find((item) => item.value === selectedItem)?.label
            : placeholderMessage}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder={placeholderMessage} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    const changedValue =
                      currentValue === selectedItem ? "" : currentValue;

                    if (onItemChange) onItemChange(changedValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItem === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

ComboBox.displayName = "ComboBox";
export { ComboBox };
