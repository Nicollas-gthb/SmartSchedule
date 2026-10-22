import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { MESES, fromISO, toISO, todayISO } from "@/utils/date";

const DIAS = ["D", "S", "T", "Q", "Q", "S", "S"];
const BLOQUEAR_FIM_DE_SEMANA = true; // agências não abrem sáb/dom

type Cell = { iso: string; day: number; current: boolean; col: number };

type Props = {
  value?: string; // ISO selecionado
  onChange: (iso: string) => void;
  minDate?: string; // ISO; dias antes ficam bloqueados
};

export function Calendar({ value, onChange, minDate = todayISO() }: Props) {
  const { foreground } = useThemeColors();
  const base = fromISO(value ?? minDate);
  const min = fromISO(minDate);
  const [year, setYear] = useState(base.getFullYear());
  const [month, setMonth] = useState(base.getMonth());

  const canGoPrev = year * 12 + month > min.getFullYear() * 12 + min.getMonth();

  function go(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }

  const weeks = useMemo(() => {
    const first = new Date(year, month, 1).getDay();
    const total = new Date(year, month + 1, 0).getDate();
    const cells: Cell[] = [];

    for (let i = first; i > 0; i--) {
      const d = new Date(year, month, 1 - i);
      cells.push({ iso: toISO(d), day: d.getDate(), current: false, col: cells.length % 7 });
    }
    for (let day = 1; day <= total; day++) {
      cells.push({ iso: toISO(new Date(year, month, day)), day, current: true, col: cells.length % 7 });
    }
    while (cells.length % 7 !== 0) {
      const d = new Date(year, month + 1, cells.length - first - total + 1);
      cells.push({ iso: toISO(d), day: d.getDate(), current: false, col: cells.length % 7 });
    }

    const rows: Cell[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [year, month]);

  return (
    <View className="rounded-2xl border border-border bg-surface p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-semibold text-foreground">
          {MESES[month]} {year}
        </Text>
        <View className="flex-row">
          <Pressable
            onPress={() => go(-1)}
            disabled={!canGoPrev}
            hitSlop={8}
            className={`h-8 w-8 items-center justify-center ${canGoPrev ? "" : "opacity-30"}`}
          >
            <ChevronLeft size={20} color={foreground} />
          </Pressable>
          <Pressable onPress={() => go(1)} hitSlop={8} className="h-8 w-8 items-center justify-center">
            <ChevronRight size={20} color={foreground} />
          </Pressable>
        </View>
      </View>

      <View className="mb-1 flex-row">
        {DIAS.map((d, i) => (
          <Text key={i} className="flex-1 text-center text-xs text-muted">
            {d}
          </Text>
        ))}
      </View>

      {weeks.map((week, wi) => (
        <View key={wi} className="flex-row">
          {week.map((c) => {
            const fimDeSemana = c.col === 0 || c.col === 6;
            const bloqueado =
              !c.current || c.iso < minDate || (BLOQUEAR_FIM_DE_SEMANA && fimDeSemana);
            const selecionado = c.current && c.iso === value;

            return (
              <Pressable
                key={c.iso + c.col}
                disabled={bloqueado}
                onPress={() => onChange(c.iso)}
                className="flex-1 items-center py-0.5"
              >
                <View
                  className={`h-9 w-9 items-center justify-center rounded-full ${
                    selecionado ? "bg-primary" : ""
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      selecionado
                        ? "font-semibold text-on-primary"
                        : bloqueado
                          ? "text-muted opacity-40"
                          : "text-foreground"
                    }`}
                  >
                    {c.day}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
