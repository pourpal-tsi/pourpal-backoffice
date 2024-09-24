import { useQuery } from "@tanstack/react-query";
import { ComboBox, ComboBoxProps } from "@/components/shadcnui/combobox";
import { getTypes } from "@/services/types";

export interface TypeComboBoxProps extends Omit<ComboBoxProps, "items"> {}

export default function TypeComboBox(props: TypeComboBoxProps) {
  const { data } = useQuery({
    queryKey: ["types"],
    queryFn: getTypes,
  });

  const items = data?.map((it) => ({ value: it, label: it })) ?? [];
  return <ComboBox items={items} {...props} disabled={items.length == 0} />;
}
