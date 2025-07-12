
'use client'

import { auth } from './firebase'

// Helper function to make authenticated API calls
export const makeAuthenticatedRequest = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const user = auth.currentUser
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  // Get the Firebase Auth token
  const token = await user.getIdToken()

  // Add Authorization header
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  }

  // Make the request with the token
  return fetch(url, {
    ...options,
    headers,
  })
}

// Convenience functions for common HTTP methods
export const authenticatedGet = (url: string, options: RequestInit = {}) => {
  return makeAuthenticatedRequest(url, {
    method: 'GET',
    ...options,
  })
}

export const authenticatedPost = (url: string, body?: any, options: RequestInit = {}) => {
  return makeAuthenticatedRequest(url, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  })
}

export const authenticatedPut = (url: string, body?: any, options: RequestInit = {}) => {
  return makeAuthenticatedRequest(url, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  })
}

export const authenticatedDelete = (url: string, options: RequestInit = {}) => {
  return makeAuthenticatedRequest(url, {
    method: 'DELETE',
    ...options,
  })
}
