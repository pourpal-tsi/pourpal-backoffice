"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { useItemBrands } from "@/features/item-brands/api/get";
import { useCreateItemBrand } from "@/features/item-brands/api/create";
import { useUpdateItemBrand } from "@/features/item-brands/api/update";
import { useDeleteItemBrand } from "@/features/item-brands/api/delete";
import { ItemBrand } from "@/features/item-brands/types/model";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
} from "@/components/ui/alert-dialog";

export default function Page() {
  const { data, isLoading, isError } = useItemBrands();
  return (
    <div className="flex flex-col gap-4">
      <BrandField />
      <BrandTable
        brands={data?.brands ?? []}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

function BrandField() {
  const [value, setValue] = useState("");

  const brand = value.trim();
  const brandIsEmpty = brand.length === 0;
  const isAllowed = !brandIsEmpty;

  const { toast } = useToast();
  const { mutateAsync: createItemBrand, isPending } = useCreateItemBrand();

  const handleCreate = async () => {
    if (!isAllowed || isPending) return;

    await createItemBrand({ brand });
    toast({
      title: "Created 🥳",
      description: `Brand '${brand}' has been added successfully.`,
    });

    setValue("");
  };

  return (
    <div className="relative mr-2 w-full">
      <Button
        size="icon"
        variant="link"
        disabled={isPending || !isAllowed}
        className="absolute inset-y-0 left-0 flex items-center"
        onClick={handleCreate}
      >
        {isPending ? (
          <Loader2Icon className="size-5 animate-spin" />
        ) : (
          <PlusIcon className="size-5" />
        )}
      </Button>

      <Input
        type="text"
        disabled={isPending}
        placeholder="Enter a new brand..."
        className="pl-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={async ({ key }) => {
          if (key === "Enter") {
            await handleCreate();
          }
        }}
      />
    </div>
  );
}

function BrandTable({
  brands,
  isLoading,
  isError,
}: {
  brands: ItemBrand[];
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <div className="overflow-auto rounded-md border">
      <Table className="bg-background">
        <TableHeader>
          <TableRow>
            <TableHead>Brand</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            [...Array(10)].map((_, key) => (
              <TableRow key={key}>
                <TableCell>
                  <Skeleton className="h-5 max-w-[200px] bg-zinc-200 dark:bg-zinc-700" />
                </TableCell>
              </TableRow>
            ))
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                Couldn&apos;t fetch brands, please try again later. ☕
              </TableCell>
            </TableRow>
          ) : brands.length == 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                There aren&apos;t any brands to show here... yet. 😉
              </TableCell>
            </TableRow>
          ) : (
            brands.map((it) => <Brand key={it.brand_id} brand={it} />)
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function Brand({ brand: { brand_id, brand } }: { brand: ItemBrand }) {
  const [value, setValue] = useState(brand);

  const { toast } = useToast();
  const { mutateAsync: deleteItemBrand } = useDeleteItemBrand();
  const { mutateAsync: updateItemBrand } = useUpdateItemBrand();

  const handleDelete = async () => {
    await deleteItemBrand(brand_id);
    toast({
      title: "Deleted 🗿",
      description: `Brand '${brand}' has been deleted successfully.`,
    });
  };

  const handleUpdate = async () => {
    const newBrand = value.trim();
    const newBrandIsEmpty = newBrand.length == 0;
    if (brand == newBrand || newBrandIsEmpty) return;

    await updateItemBrand({ id: brand_id, body: { brand: newBrand } });
    toast({
      title: "Updated 🍷",
      description: `Brand '${brand}' has been updated successfully.`,
    });
  };

  return (
    <TableRow>
      <TableCell className="relative w-full">
        <input
          className="w-full bg-transparent focus-visible:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => handleUpdate()}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await handleUpdate();
            }
          }}
        />
        <div className="absolute inset-y-0 right-0 mr-2 flex items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" size="icon">
                <Trash2Icon className="size-5 text-red-700" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this brand?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  brand &apos;{brand}&apos; from the system.
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
        </div>
      </TableCell>
    </TableRow>
  );
}
