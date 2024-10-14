import { ComboBox, ComboBoxProps } from "@/components/ui/combobox";
import { useItemTypes } from "@/features/item-types/api/get";

export interface TypeComboBoxProps
  extends Omit<ComboBoxProps, "items" | "loading" | "disabled"> {}

export default function TypeComboBox(props: TypeComboBoxProps) {
  const { data, isLoading } = useItemTypes();

  const items =
    data?.types?.map(({ type_id, type }) => ({
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
