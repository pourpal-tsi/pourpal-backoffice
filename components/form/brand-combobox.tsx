import { ComboBox, ComboBoxProps } from "@/components/ui/combobox";
import { useItemBrands } from "@/features/item-brands/api/get";

export interface BrandComboBoxProps
  extends Omit<ComboBoxProps, "items" | "loading" | "disabled"> {}

export default function BrandComboBox(props: BrandComboBoxProps) {
  const { data, isLoading } = useItemBrands();

  const items =
    data?.brands?.map(({ brand_id, brand }) => ({
      value: brand_id,
      label: brand,
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
