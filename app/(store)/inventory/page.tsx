"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Plus } from "lucide-react";

import { Input } from "@/components/shadcnui/input";
import { Button } from "@/components/shadcnui/button";
import { Textarea } from "@/components/shadcnui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcnui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcnui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/shadcnui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcnui/alert-dialog";

import CountryComboBox from "@/components/form/country-combobox";
import BrandComboBox from "@/components/form/brand-combobox";
import TypeComboBox from "@/components/form/type-combobox";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createItem, deleteItem, getItems, updateItem } from "@/services/items";
import { useToast } from "@/hooks/use-toast";

const itemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Required"),
  imageUrl: z.string().min(1, "Required").url({ message: "Invalid URL" }),
  country: z.string().min(1, "Required"),
  type: z.string().min(1, "Required"),
  brand: z.string().min(1, "Required"),
  price: z
    .number({ invalid_type_error: "Must be a number" })
    .positive("Must be positive"),
  volume: z
    .number({ invalid_type_error: "Must be a number" })
    .positive("Must be positive"),
  alcoholVolume: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Must be at least 0%")
    .max(100, "Must be at most 100%"),
  quantity: z
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be a whole number")
    .nonnegative("Must be non-negative"),
  description: z.string(),
});

type ItemSchema = z.infer<typeof itemSchema>;

export default function Page() {
  const { toast } = useToast();

  const { data: items } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const createMutation = useMutation({
    mutationKey: ["items"],
    mutationFn: createItem,
  });

  const updateMutation = useMutation({
    mutationKey: ["items"],
    mutationFn: updateItem,
  });

  const deleteMutation = useMutation({
    mutationKey: ["items"],
    mutationFn: deleteItem,
  });

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<ItemSchema | null>(null);

  const form = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: "",
      imageUrl: "",
      name: "",
      description: "",
      type: "",
      price: 0,
      volume: 0,
      alcoholVolume: 0,
      quantity: 0,
      country: "",
      brand: "",
    },
  });

  const handleSubmit = (item: ItemSchema) => {
    setIsDetailOpen(false);

    if (selectedItem) {
      updateMutation.mutate(item);
      toast({
        title: "Updated 🍷",
        description: `Item '${item.id}' has been updated successfully.`,
      });
    } else {
      createMutation.mutate(item);
      toast({
        title: "Created 🥳",
        description: `Item '${item.name}' has been created successfully.`,
      });
    }
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    setIsDetailOpen(false);
    setIsDeleteDialogOpen(false);
    deleteMutation.mutate(selectedItem.id);
    toast({
      title: "Deleted 🗿",
      description: `Item '${selectedItem.id}' has been deleted successfully.`,
    });
  };

  const searchTerm = search.toLowerCase();
  const filteredItems =
    items?.filter(({ id, name }) => {
      const matchesById = id.toLowerCase().includes(searchTerm);
      const matchesByName = name.toLowerCase().includes(searchTerm);
      return matchesById || matchesByName;
    }) ?? [];

  return (
    <>
      <div className="flex h-full flex-col">
        {/* TOOLBAR */}
        <div className="mb-4 flex">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mr-2"
          />
          <Button
            onClick={() => {
              setSelectedItem(null);
              form.reset();
              setIsDetailOpen(true);
            }}
          >
            <Plus className="mr-2 size-4" /> Add Item
          </Button>
        </div>

        {/* INVENTORY TABLE */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Identifier</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  form.reset(item, { keepDefaultValues: true });
                  setIsDetailOpen(true);
                }}
                className="cursor-pointer"
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ITEM SIDEBAR */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full overflow-auto sm:min-w-[500px]">
          <SheetHeader>
            <SheetTitle>{selectedItem ? "Edit Item" : "Add Item"}</SheetTitle>
            <SheetDescription>
              {selectedItem
                ? "Update the details of the selected item."
                : "Enter the details for a new item."}
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="mt-4 space-y-4"
              noValidate
            >
              {selectedItem && (
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identifier</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <TypeComboBox
                          selectedItem={field.value}
                          onItemChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <CountryComboBox
                          selectedItem={field.value}
                          onItemChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (€ / pcs.)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register(field.name, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          step="0.01"
                          min="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <BrandComboBox
                          selectedItem={field.value}
                          onItemChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="volume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volume (L)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register(field.name, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          step="0.01"
                          min="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alcoholVolume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alcohol Volume (%)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register(field.name, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          step="0.1"
                          min="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register(field.name, { valueAsNumber: true })}
                        type="number"
                        min="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-2">
                <Button type="submit" className="w-full">
                  {selectedItem ? "Update" : "Save"}
                </Button>
                {selectedItem && (
                  <AlertDialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this item?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the item from the inventory.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
