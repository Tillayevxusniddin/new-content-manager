import { NextResponse } from 'next/server'

export default function proxy() {
	// Explicitly continue to app routes.
	return NextResponse.next()
}
