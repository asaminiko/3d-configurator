import { NextResponse } from 'next/server'
import { supabase } from '@/src/lib/supabaseClient'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('keyboard_options')
      .select('*')
      .eq('in_stock', true)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
