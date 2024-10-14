"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface ComboBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  items: { value: string; label: string }[];
  selectedItem?: string;
  onItemChange?: (value: string) => void;
  placeholderMessage?: string;
  loadingMessage?: string;
  emptyMessage?: string;
  disabled?: boolean;
  loading?: boolean;
}

const ComboBox = ({
  items,
  onItemChange,
  selectedItem,
  placeholderMessage = "Select...",
  loadingMessage = "Loading...",
  emptyMessage = "No matches found",
  disabled,
  loading,
}: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled || loading}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex w-full justify-between p-2 font-normal disabled:cursor-not-allowed disabled:opacity-50",
            !selectedItem && "text-muted-foreground",
          )}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <Loader2 className=" size-4 animate-spin" />
              <span>{loadingMessage}</span>
            </div>
          ) : selectedItem ? (
            items.find((item) => item.value === selectedItem)?.label
          ) : (
            placeholderMessage
          )}
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
                  value={item.label}
                  onSelect={() => {
                    setOpen(false);

                    if (!onItemChange) return;
                    if (item.value == selectedItem) {
                      onItemChange("");
                      return;
                    }

                    const searchLabel = item.label.toLowerCase();
                    const changedValue = items.find(
                      ({ label }) => label.toLowerCase() == searchLabel,
                    )?.value;

                    onItemChange(changedValue ?? "");
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
