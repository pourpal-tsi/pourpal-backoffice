import { useQuery } from "@tanstack/react-query";
import { ComboBox, ComboBoxProps } from "@/components/shadcnui/combobox";
import { getCountries } from "@/services/countries";

export interface CountryComboBoxProps extends Omit<ComboBoxProps, "items"> {}

export default function CountryComboBox(props: CountryComboBoxProps) {
  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const items =
    data?.map(({ emoji, name }) => ({
      value: name,
      label: `${emoji} ${name}`,
    })) ?? [];

  return <ComboBox items={items} {...props} disabled={items.length == 0} />;
}
