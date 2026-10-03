import { createServerFn } from '@tanstack/react-start'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import type { Database } from '@/integrations/supabase/types'

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional(),
  projectType: z.enum(['Yacht new build', 'Yacht refit', 'Residence', 'Furniture', 'Other']),
  projectName: z.string().trim().max(160).optional(),
  message: z.string().trim().min(20).max(4000),
  website: z.string().max(100).optional(),
})

export const submitInquiry = createServerFn({ method: 'POST' })
  .inputValidator((input) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    // Quietly drop automated submissions from the hidden honeypot.
    if (data.website) return { ok: true }
    const url = process.env['SUPABASE_URL']
    const key = process.env['SUPABASE_PUBLISHABLE_KEY']
    if (!url || !key) throw new Error('The inquiry service is temporarily unavailable. Please call or email us directly.')
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers)
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization')
        headers.set('apikey', key)
        return fetch(input, { ...init, headers })
      } },
    })
    const { error } = await client.from('project_inquiries').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      project_type: data.projectType,
      project_name: data.projectName || null,
      message: data.message,
    })
    if (error) {
      console.error('Inquiry submission failed:', error.message)
      throw new Error('Your inquiry could not be sent. Please call or email us directly.')
    }
    return { ok: true }
  })
