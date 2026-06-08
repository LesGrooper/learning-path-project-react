import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

export default function BooksDetail() {
  const { id } = useParams()
  const location = useLocation()
  return <div>Detail for book {id} {location.state && '(has state)'}</div>
}