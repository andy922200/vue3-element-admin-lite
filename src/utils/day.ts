import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import customParseFormat from "dayjs/plugin/customParseFormat"
import duration from "dayjs/plugin/duration"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import localizedFormat from "dayjs/plugin/localizedFormat"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isBetween from "dayjs/plugin/isBetween"

import "dayjs/locale/en"
import "dayjs/locale/zh-tw"
import "dayjs/locale/zh-cn"
import "dayjs/locale/ja"

dayjs.extend(utc)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)

export default dayjs

export const changeToLocaleTime = function ({
  time,
  lang,
  timezoneOffset,
  format,
}: {
  time: string
  lang: string
  timezoneOffset: number
  format: string
}): string {
  return dayjs(time)
    .add(timezoneOffset, "minute")
    .locale(`${lang}`)
    .format(`${format}`)
}

export const displayInLocalFormat = function ({
  time,
  lang,
  format,
}: {
  time: string
  lang: string
  format: string
}): string {
  return dayjs(time).locale(`${lang}`).format(`${format}`)
}

export const changeToUTCTime = function ({
  time,
}: {
  time: Date | string
}): string {
  return `${dayjs(time).utc().format("YYYY-MM-DDTHH:mm:ss")}Z`
}
