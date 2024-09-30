"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Plus,
} from "lucide-react";

import { Input } from "@/components/shadcnui/input";
import { Button } from "@/components/shadcnui/button";
import { Textarea } from "@/components/shadcnui/textarea";
import { Skeleton } from "@/components/shadcnui/skeleton";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcnui/select";

import CountryComboBox from "@/components/form/country-combobox";
import BrandComboBox from "@/components/form/brand-combobox";
import TypeComboBox from "@/components/form/type-combobox";

import { ItemSchema, itemSchema } from "@/schemes/items";
import { createQueryString } from "@/lib/utils";

import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
  type Item,
} from "@/services/items";

const pageSizeOptions = ["10", "20", "30", "40", "50"];

const searchParamsSchema = z.object({
  search: z.string().optional(),
  page_size: z.enum(pageSizeOptions).transform((it) => parseInt(it)),
  page_number: z.coerce.number().optional(),
});

export default function Page() {
  const { toast } = useToast();

  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const searchProps = searchParamsSchema.safeParse(
    Object.fromEntries(searchParams),
  ).data;

  const [_search, setSearch] = useState(searchProps?.search ?? "");
  const [search] = useDebouncedValue(_search, 500);

  const [pageSize, setPageSize] = useState(searchProps?.page_size ?? 10);
  const [pageNumber, setPageNumber] = useState(searchProps?.page_number ?? 1);

  useEffect(() => {
    const url = `${pathname}?${createQueryString({
      search: search,
      page_size: pageSize,
      page_number: pageNumber,
    })}`;

    router.push(url);
  }, [pathname, router, pageSize, pageNumber, search]);

  const {
    data: content,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["items", searchProps],
    queryFn: () => getItems(searchProps ?? {}),
    placeholderData: keepPreviousData,
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

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const form = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: "",
      sku: "",
      title: "",
      type_id: "",
      brand_id: "",
      image_url: "",
      description: "",
      origin_country_code: "",
      quantity: 0,
      alcohol_volume: "0",
      volume: "0",
      volume_unit: "ml",
      price: "0",
    },
  });

  const handleServiceError = (err: unknown) => {
    console.error(err);
    toast({
      title: "Failed 💀",
      description: `Something went wrong. Please, try again later.`,
      variant: "destructive",
    });
  };

  const handleSubmit = async (item: ItemSchema) => {
    setIsDetailOpen(false);

    if (selectedItem) {
      try {
        await updateMutation.mutateAsync(item);
        toast({
          title: "Updated 🍷",
          description: `Item '${item.title}' has been updated successfully.`,
        });
      } catch (err) {
        handleServiceError(err);
      }
    } else {
      try {
        await createMutation.mutateAsync(item);
        toast({
          title: "Created 🥳",
          description: `Item '${item.title}' has been created successfully.`,
        });
      } catch (err) {
        handleServiceError(err);
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setIsDetailOpen(false);
    setIsDeleteDialogOpen(false);
    try {
      await deleteMutation.mutateAsync(selectedItem.id);
      toast({
        title: "Deleted 🗿",
        description: `Item '${selectedItem.title}' has been deleted successfully.`,
      });
    } catch (err) {
      handleServiceError(err);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col">
        {/* TOOLBAR */}
        <div className="mb-4 flex">
          <Input
            type="text"
            placeholder="Search..."
            value={_search}
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
        <div className="overflow-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                [...Array(5)].map((_, key) => (
                  <TableRow key={key}>
                    <TableCell>
                      <Skeleton className="h-5 max-w-[200px] bg-zinc-200 dark:bg-zinc-700" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 max-w-[200px] bg-zinc-200 dark:bg-zinc-700" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 max-w-[200px] bg-zinc-200 dark:bg-zinc-700" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 max-w-[200px] bg-zinc-200 dark:bg-zinc-700" />
                    </TableCell>
                  </TableRow>
                ))}
              {isError && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    Couldn&apos;t fetch items, please try again later. ☕
                  </TableCell>
                </TableRow>
              )}
              {isSuccess &&
                content?.items?.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      form.reset(item, { keepDefaultValues: true });
                      setIsDetailOpen(true);
                    }}
                    className="cursor-pointer"
                  >
                    <TableCell className="truncate">{item.sku}</TableCell>
                    <TableCell className="truncate">{item.title}</TableCell>
                    <TableCell className="truncate">
                      {item.brand_name}
                    </TableCell>
                    <TableCell className="truncate">{item.quantity}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex w-full flex-col-reverse items-center justify-end gap-4 py-3 sm:flex-row sm:gap-10">
          <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">
                Rows per page
              </p>
              <Select
                value={String(pageSize)}
                onValueChange={(value) => setPageSize(parseInt(value))}
              >
                <SelectTrigger className="h-8 w-[4.5rem]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-center text-sm font-medium">
            Page {content?.paging?.page_number} of{" "}
            {content?.paging?.total_pages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={content?.paging?.first_page}
              onClick={() => setPageNumber(1)}
            >
              <ChevronsLeftIcon className="size-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={content?.paging?.first_page}
              onClick={() => setPageNumber((it) => it - 1)}
            >
              <ChevronLeftIcon className="size-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={content?.paging?.last_page}
              onClick={() => setPageNumber((it) => it + 1)}
            >
              <ChevronRightIcon className="size-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPageNumber(content?.paging?.total_pages ?? 1)}
              disabled={content?.paging?.last_page}
            >
              <ChevronsRightIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
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
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
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
                name="title"
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
                name="image_url"
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
              <div className="grid gap-2 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="type_id"
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
                  name="origin_country_code"
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
                        <Input {...field} type="number" min="0" step="0.01" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand_id"
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
              </div>
              <div className="flex flex-row gap-2">
                <FormField
                  control={form.control}
                  name="volume"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Volume</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" step="0.1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="volume_unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[70px]">
                            <SelectValue defaultValue="ml" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ml">ml</SelectItem>
                            <SelectItem value="cl">cl</SelectItem>
                            <SelectItem value="dl">dl</SelectItem>
                            <SelectItem value="l">l</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="alcohol_volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alcohol Volume (%)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" step="0.1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
