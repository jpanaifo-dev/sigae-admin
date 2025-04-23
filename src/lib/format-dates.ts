import { format, addDays } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatDate(date: string) {
  try {
    const newDate = addDays(new Date(date), 1)
    return format(newDate, 'dd/MM/yy', { locale: es })
  } catch (error) {
    console.error('Invalid date format:', error)
    return ''
  }
}

export function formatDateWithTime(date: string) {
  try {
    const newDate = addDays(new Date(date), 1)
    return format(newDate, 'dd/MM/yy HH:mm', { locale: es })
  } catch (error) {
    console.error('Invalid date format:', error)
    return ''
  }
}

export function daysUntil(date: string): number {
  try {
    const targetDate = new Date(date)
    const today = new Date()
    const difference = targetDate.getTime() - today.getTime()
    return Math.ceil(difference / (1000 * 60 * 60 * 24))
  } catch (error) {
    console.error('Invalid date format:', error)
    return -1
  }
}
