export function getRelativeDate(date: Date): string {
  const now = new Date()
  const diffInMilliseconds = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))

  if (diffInMinutes < 1) {
    return "just now"
  } else if (diffInMinutes === 1) {
    return "1 minute ago"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInMinutes < 1440) {
    const diffInHours = Math.floor(diffInMinutes / 60)
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
  } else {
    const diffInDays = Math.floor(diffInMinutes / 1440)
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
  }
}
