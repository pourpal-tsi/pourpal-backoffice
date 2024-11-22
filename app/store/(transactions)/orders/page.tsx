"use client";

import { useEffect, useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";

import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { parseAsInteger, parseAsNumberLiteral, useQueryState } from "nuqs";
import { useOrders } from "@/features/orders/api/get";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { type Order, type OrderItem } from "@/features/orders/types/order";
import { useItem } from "@/features/items/api/get";

const pageSizeOptions = [10, 20, 30, 40, 50] as const;

export default function Page() {
  const [pageSize, setPageSize] = useQueryState(
    "page_size",
    parseAsNumberLiteral(pageSizeOptions).withDefault(20),
  );
  const [pageNumber, setPageNumber] = useQueryState(
    "page_number",
    parseAsInteger.withDefault(1),
  );

  useEffect(() => {
    void setPageNumber(1);
  }, [setPageNumber, pageSize]);

  const {
    data: content,
    isLoading,
    isError,
  } = useOrders({
    pageSize,
    pageNumber,
    queryConfig: {
      placeholderData: keepPreviousData,
    },
  });

  const orders = content?.orders ?? [];
  const paging = content?.paging;
  const hasPages = paging && paging.total_pages > 0;

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <div className="flex h-full flex-col">
        {/* ORDER TABLE */}
        <div className="overflow-auto rounded-md border">
          <Table className="table-fixed bg-background">
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Placed at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(10)].map((_, key) => (
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
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    Couldn&apos;t fetch orders, please try again later. ☕
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    There aren&apos;t any orders to show here... yet. 😉
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order.order_id}
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsDetailOpen(true);
                    }}
                    className="cursor-pointer"
                  >
                    <TableCell className="truncate">
                      {order.order_number}
                    </TableCell>
                    <TableCell className="truncate">
                      {order.total_price.amount}&euro;
                    </TableCell>
                    <TableCell className="truncate">
                      {order.status.toUpperCase()}
                    </TableCell>
                    <TableCell className="truncate">
                      {new Date(order.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {hasPages && (
          <div className="flex w-full flex-col-reverse items-center justify-end gap-4 py-3 sm:flex-row sm:gap-10">
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
              <div className="flex items-center space-x-2">
                <p className="whitespace-nowrap text-sm">Rows per page</p>
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) =>
                    setPageSize(
                      parseInt(value) as (typeof pageSizeOptions)[number],
                    )
                  }
                >
                  <SelectTrigger className="h-8 w-[4.5rem]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {pageSizeOptions.map((pageSize) => (
                      <SelectItem key={pageSize} value={pageSize.toString()}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-center text-sm">
              Page {paging?.page_number} of {paging?.total_pages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                disabled={paging?.first_page}
                onClick={() => setPageNumber(1)}
              >
                <ChevronFirstIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                disabled={paging?.first_page}
                onClick={() => setPageNumber((it) => it - 1)}
              >
                <ChevronLeftIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                disabled={paging?.last_page}
                onClick={() => setPageNumber((it) => it + 1)}
              >
                <ChevronRightIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => setPageNumber(paging?.total_pages ?? 1)}
                disabled={paging?.last_page}
              >
                <ChevronLastIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ORDER SIDEBAR */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full overflow-auto sm:min-w-[500px]">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
            <SheetDescription>
              View delivery details of the selected item.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-5 pt-5">
            <div>
              <p className="pb-1 text-sm font-semibold text-muted-foreground">
                Recipient Name
              </p>
              <p>{selectedOrder?.delivery_information.recipient_name}</p>
            </div>
            <div>
              <p className="pb-1 text-sm font-semibold text-muted-foreground">
                Recipient City
              </p>
              <p>{selectedOrder?.delivery_information.recipient_city}</p>
            </div>
            <div>
              <p className="pb-1 text-sm font-semibold text-muted-foreground">
                Recipient Phone
              </p>
              <p>{selectedOrder?.delivery_information.recipient_phone}</p>
            </div>
            <div>
              <p className="pb-1 text-sm font-semibold text-muted-foreground">
                Recipient Street Address
              </p>
              <p>
                {selectedOrder?.delivery_information.recipient_street_address}
              </p>
            </div>
            <div>
              <p className="pb-1 text-sm font-semibold text-muted-foreground">
                Items
              </p>
              <ul>
                {selectedOrder?.order_items.map((item) => (
                  <OrderItem key={item.item_id} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function OrderItem({ item }: { item: OrderItem }) {
  const { data } = useItem({ id: item.item_id });
  return (
    <li>
      &bull; {data?.item?.title} (x{item.quantity})
    </li>
  );
}
