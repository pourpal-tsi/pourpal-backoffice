import { useQuery } from "@tanstack/react-query";
import { ComboBox, ComboBoxProps } from "@/components/ui/combobox";
import { getItemTypes } from "@/services/item-types";

export interface TypeComboBoxProps
  extends Omit<ComboBoxProps, "items" | "loading" | "disabled"> {}

export default function TypeComboBox(props: TypeComboBoxProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["types"],
    queryFn: getItemTypes,
  });

  const items =
    data?.map(({ type_id, type }) => ({
      value: type_id,
      label: type,
    })) ?? [];

  return (
    <ComboBox
      {...props}
      items={items}
      loading={isLoading}
      disabled={items.length == 0}
    />
  );
}
