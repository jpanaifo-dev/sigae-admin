import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { IUserAuth } from '@/types'

const APP_NAME = process.env.APP_NAME
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

import { JWTPayload } from 'jose'

export interface SessionPayload extends JWTPayload {
  data: IUserAuth
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error('Error al decodificar la sesión:', error)
  }
  return null
}

export async function createSession(
  data: IUserAuth,
  expires_at: number = 1 * 24 * 60 * 60 * 1000
) {
  const expiresAt = new Date(Date.now() + expires_at)
  const session = await encrypt({
    data,
  })
  const cookieStore = await cookies()

  cookieStore.set(`${APP_NAME}_session`, session, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const session = await cookieStore.get(`${APP_NAME}_session`)
  if (!session) return null
  const payload = await decrypt(session?.value)
  return payload as SessionPayload | null
}

export async function getUserAuth() {
  const cookieStore = await cookies()
  const session = await cookieStore.get(`${APP_NAME}_session`)
  if (!session?.value) return null

  const { payload } = await jwtVerify(session?.value, encodedKey, {
    algorithms: ['HS256'],
  })
  return payload.data as IUserAuth
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(`${APP_NAME}_session`)
}
