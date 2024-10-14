import { ComboBox, ComboBoxProps } from "@/components/ui/combobox";
import { useItemCountries } from "@/features/item-countries/api/get";

export interface CountryComboBoxProps
  extends Omit<ComboBoxProps, "items" | "loading" | "disabled"> {}

export default function CountryComboBox(props: CountryComboBoxProps) {
  const { data, isLoading } = useItemCountries();

  const items =
    data?.countries?.map(({ code, name, emoji }) => ({
      value: code,
      label: `${emoji} ${name}`,
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
