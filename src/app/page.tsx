// Main page - redirect to weeks
import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/weeks')
}
