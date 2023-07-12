export default function getEnv(name: string) {
  return window?.configs?.[name] || import.meta.env?.[name]
}
