import { message } from 'antd'
import React from 'react'

// Configure at 1st import
// Toast.config({top: 20});

export function createSuccessMessage (content: React.ReactNode) {
  message.success(content)
}

export function createErrorMessage (content: React.ReactNode) {
  message.error(content)
}
