export type JSON_PTR<T, V> = T extends string | number | boolean
    ? ""
    : T extends []
    ? ""
    : T extends [...infer SRest, infer S]
    ?
          | JSON_PTR<SRest, V>
          | (V extends ""
                ? "/" | `/${SRest["length"]}${JSON_PTR<S, "/">}`
                : V extends `/${infer FR extends SRest["length"]}/${infer RR}`
                ? `/${FR}${JSON_PTR<S, `/${RR}`>}`
                : V extends `/${infer FR extends SRest["length"]}`
                ? `/${FR}` | `/${FR}${JSON_PTR<S, "">}`
                : `/${SRest["length"]}` | `/${SRest["length"]}${JSON_PTR<S, "">}`)
    : T extends (infer S)[]
    ? V extends ""
        ? "/" | `/${number}${JSON_PTR<S, "/">}`
        : V extends `/${infer FR extends number}/${infer RR}`
        ? `/${FR}${JSON_PTR<S, `/${RR}`>}/`
        : V extends `/${infer FR extends number}`
        ? `/${FR}` | `/${FR}${JSON_PTR<S, "">}`
        : "/0" | `/0${JSON_PTR<S, "">}`
    : V extends `/${infer First extends keyof T & string}/${infer Rest}`
    ? `/${First}${JSON_PTR<T[First], `/${Rest}`>}`
    : V extends `/${infer First extends keyof T & string}`
    ? `/${First}` | `/${First}${JSON_PTR<T[First], "">}`
    : {
          [K in keyof T & string]: `/${K}` | `/${K}${JSON_PTR<T[K], "">}`;
      }[keyof T & string];

type JSON_PTR_F<T, V> = JSON_PTR<T, V> extends V ? V : JSON_PTR<T, V>;
export const make = <T>() => <V extends string>(v: JSON_PTR_F<T, V>) => v;