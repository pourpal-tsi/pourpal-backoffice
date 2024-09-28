import { useQuery } from "@tanstack/react-query";
import { ComboBox, ComboBoxProps } from "@/components/shadcnui/combobox";
import { getItemBrands } from "@/services/item-brands";

export interface BrandComboBoxProps
  extends Omit<ComboBoxProps, "items" | "loading" | "disabled"> {}

export default function BrandComboBox(props: BrandComboBoxProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getItemBrands,
  });

  const items =
    data?.map(({ brand_id, brand }) => ({
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
