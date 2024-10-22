"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RestClientError } from "@/lib/api";

import { useItemTypes } from "@/features/item-types/api/get";
import { useCreateItemType } from "@/features/item-types/api/create";
import { useUpdateItemType } from "@/features/item-types/api/update";
import { useDeleteItemType } from "@/features/item-types/api/delete";
import { ItemType } from "@/features/item-types/types/model";

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
  const { data, isLoading, isError } = useItemTypes();
  return (
    <div className="flex flex-col gap-4">
      <TypeField />
      <TypeTable
        types={data?.types ?? []}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

function TypeField() {
  const [value, setValue] = useState("");

  const type = value.trim();
  const typeIsEmpty = type.length === 0;
  const isAllowed = !typeIsEmpty;

  const { toast } = useToast();
  const { mutateAsync: createItemType, isPending } = useCreateItemType();

  const handleCreate = async () => {
    if (!isAllowed || isPending) return;

    try {
      await createItemType({ type });
      toast({
        title: "Created 🥳",
        description: `Type '${type}' has been added successfully.`,
      });

      setValue("");
    } catch (e) {
      if (e instanceof RestClientError && e.response.status == 409) {
        toast({
          title: "Duplicate 💀",
          description: `Type '${type}' already exists, please use another name.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed 💀",
          description: `Something went wrong. Please, try again later.`,
          variant: "destructive",
        });
      }
    }
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
        placeholder="Enter a new type..."
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

function TypeTable({
  types,
  isLoading,
  isError,
}: {
  types: ItemType[];
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <div className="overflow-auto rounded-md border">
      <Table className="bg-background">
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
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
                Couldn&apos;t fetch types, please try again later. ☕
              </TableCell>
            </TableRow>
          ) : types.length == 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                There aren&apos;t any types to show here... yet. 😉
              </TableCell>
            </TableRow>
          ) : (
            types.map((it) => <Type key={it.type_id} type={it} />)
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function Type({ type: { type_id, type } }: { type: ItemType }) {
  const [value, setValue] = useState(type);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { toast } = useToast();
  const { mutateAsync: deleteItemType } = useDeleteItemType();
  const { mutateAsync: updateItemType } = useUpdateItemType();

  const handleDelete = async () => {
    await deleteItemType(type_id);
    toast({
      title: "Deleted 🗿",
      description: `Type '${type}' has been deleted successfully.`,
    });
  };

  const handleUpdate = async () => {
    const newType = value.trim();
    const newTypeIsEmpty = newType.length == 0;
    if (newTypeIsEmpty) {
      setIsDeleteOpen(true);
      return;
    }

    if (type == newType) return;

    try {
      await updateItemType({ id: type_id, body: { type: newType } });
      toast({
        title: "Updated 🍷",
        description: `Type '${type}' has been updated successfully.`,
      });
    } catch (e) {
      if (e instanceof RestClientError && e.response.status == 409) {
        toast({
          title: "Duplicate 💀",
          description: `Type '${newType}' already exists, please use another name.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed 💀",
          description: `Something went wrong. Please, try again later.`,
          variant: "destructive",
        });
      }
    }
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
          <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="link" size="icon">
                <Trash2Icon className="size-5 text-red-700" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this type?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  type &apos;{type}&apos; from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setValue(type)}>
                  Cancel
                </AlertDialogCancel>
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
