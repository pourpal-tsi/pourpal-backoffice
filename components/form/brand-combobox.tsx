import { useQuery } from "@tanstack/react-query";
import { ComboBox, ComboBoxProps } from "@/components/shadcnui/combobox";
import { getBrands } from "@/services/brands";

export interface BrandComboBoxProps extends Omit<ComboBoxProps, "items"> {}

export default function BrandComboBox(props: BrandComboBoxProps) {
  const { data } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const items = data?.map((it) => ({ value: it, label: it })) ?? [];
  return <ComboBox items={items} {...props} disabled={items.length == 0} />;
}
