import { stringify as qsStringify } from "qs"

export const paramsSerializer = (
  params: unknown,
  index: "noIndices" | "indices" | "brackets" | "repeat" | undefined
) => {
  const mode = {
    noIndices: { indices: false },
    indices: { arrayFormat: "indices" } as { arrayFormat: "indices" },
    brackets: { arrayFormat: "brackets" } as { arrayFormat: "brackets" },
    repeat: { arrayFormat: "repeat" } as { arrayFormat: "repeat" },
  }
  return qsStringify(params, mode[index || "brackets"])
}
